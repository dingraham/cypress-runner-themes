import { join } from "path";
import postcss from "postcss";
import cssVariables from "postcss-css-variables";

const convertCssVariables = (mycss) =>
  postcss([cssVariables()]).process(mycss).css;
const getWindowHead = () => Cypress.$(parent.window.document.head);
const isThemeLoaded = ($head) => $head.find("#cypress-runner-themes").length > 0;
const getThemesFolder = () => "node_modules/cypress-runner-themes/src/themes";
// const getThemesFolder = () => "src/themes"; // Enable for local development

const CURRENT_THEMES = ["colorblind", "dark", "light"];

const loadTheme = () => {
  return () => {
    // Check if theme is loaded already
    const $head = getWindowHead();
    if (isThemeLoaded($head)) {
      return;
    }

    const currentTheme = Cypress.env("theme");

    // Support alternative spellings
    if (currentTheme === "colourblind") {
      currentTheme = "colorblind";
    }
    // Load theme if exists and supported value
    if (currentTheme && CURRENT_THEMES.includes(currentTheme.toLowerCase())) {
      const themeFilename = join(
        getThemesFolder(),
        `${currentTheme.toLowerCase()}.css`
      );

      // Append css
      cy.readFile(themeFilename, { log: false })
        .then(convertCssVariables)
        .then((css) => {
          $head.append(
            `<style type="text/css" id="cypress-runner-themes">\n${css}</style>`
          );
        });
    } else {
      cy.log(
        "Env Theme either not provided or doesn't match list of known themes"
      );
      cy.log("Provided theme", currentTheme, "and known list:", CURRENT_THEMES);
    }
  };
};

export default loadTheme;
