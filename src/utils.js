import { colorblind, dark, fall, light } from "./themes/index.js";

// Base themes set backgrounds/text/borders. Modifiers (currently just
// colorblind) only override result colors, so they can be layered on top of
// any base theme.
const BASE_THEMES = {
  dark,
  fall,
  light,
};

const MODIFIERS = {
  colorblind,
};

const BASE_STYLE_ID = "cypress-runner-themes";
const MODIFIER_STYLE_ID = "cypress-runner-themes-modifier";

// Cypress.expose() (Cypress 15.10+) is the modern home for cosmetic, non-secret
// config. Fall back to the now-deprecated Cypress.env() so existing setups keep
// working. See https://github.com/dingraham/cypress-runner-themes/issues/5
const readConfig = (key) => {
  const exposed =
    typeof Cypress.expose === "function" ? Cypress.expose(key) : undefined;
  return exposed ?? Cypress.env(key);
};

const getRunnerHead = () => {
  try {
    return Cypress.$(parent.window.document.head);
  } catch {
    return null;
  }
};

// Resolve the requested `theme` value to a known base theme name.
// "colorblind"/"colourblind" alone is legacy usage: no base theme, just the
// colorblind modifier over the default runner (its gold palette is tuned for
// the default dark reporter and lacks contrast on light backgrounds).
const resolveBaseName = (theme) => {
  if (!theme) return null;
  let name = String(theme).toLowerCase();
  if (name === "colourblind") name = "colorblind";
  if (name === "colorblind") return null;
  return name;
};

const isColorblindEnabled = (theme) => {
  const flag = readConfig("colorblind");
  if (flag === true || String(flag).toLowerCase() === "true") return true;
  const name = String(theme ?? "").toLowerCase();
  return name === "colorblind" || name === "colourblind";
};

const injectStyle = ($head, id, css) => {
  $head.find(`#${id}`).remove();
  $head.append(`<style type="text/css" id="${id}">\n${css}\n</style>`);
};

const removeStyle = ($head, id) => {
  $head.find(`#${id}`).remove();
};

// Applies the built-in base theme + optional colorblind modifier. Pure DOM work
// with no Cypress commands, so it can run at spec-load time (before any test) as
// well as being re-applied on demand. Idempotent — safe to call repeatedly.
export const applyBuiltInTheme = () => {
  const $head = getRunnerHead();
  if (!$head) return;

  const theme = readConfig("theme");

  // A custom theme owns the base layer; applyCustomTheme handles it separately.
  if (!readConfig("customTheme")) {
    const baseName = resolveBaseName(theme);
    const baseCss = baseName ? BASE_THEMES[baseName] : undefined;

    if (baseCss) {
      injectStyle($head, BASE_STYLE_ID, baseCss);
    } else if (baseName) {
      // console.warn (not cy.log) so this is safe at module-load time, before
      // any test is running.
      console.warn(
        `cypress-runner-themes: unknown theme "${theme}". Known themes: ${Object.keys(
          BASE_THEMES,
        ).join(", ")}, colorblind (legacy).`,
      );
    }
  }

  if (isColorblindEnabled(theme)) {
    injectStyle($head, MODIFIER_STYLE_ID, MODIFIERS.colorblind);
  } else {
    removeStyle($head, MODIFIER_STYLE_ID);
  }
};

// Loads a user-supplied CSS file as the base layer. Requires cy.readFile, so it
// must run inside a test hook rather than at module load.
export const applyCustomTheme = () => {
  const customTheme = readConfig("customTheme");
  if (!customTheme) return;

  cy.readFile(customTheme, { log: false }).then((css) => {
    const $head = getRunnerHead();
    if (!$head || !css) return;
    injectStyle($head, BASE_STYLE_ID, css);
    applyBuiltInTheme(); // re-layer the colorblind modifier on top if enabled
  });
};
