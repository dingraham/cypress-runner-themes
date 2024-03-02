import { join } from 'path';
import postcss from 'postcss';
import cssVariables from 'postcss-css-variables';

const convertCssVariables = (mycss) => postcss([cssVariables()]).process(mycss).css;

const getHead = () => Cypress.$(parent.window.document.head);

const isThemeLoaded = ($head) => $head.find('#cypress-custom-mode').length > 0;

const getSourceFolder = () => 'node_modules/@dispatchhealth/cypress-shared/dist/themes';

/**
 * returns a function that a `before` callback can call to load desired theme
 * @example before(loadTheme())
 */
const CURRENT_THEMES = ['dark', 'halloween', 'christmas'];

const loadTheme = () => {
  return () => {
    // Check if theme is loaded already
    const $head = getHead();
    if (isThemeLoaded($head)) {
      return;
    }

    // Load theme if exists and supported
    const currentTheme = Cypress.env('theme');
    if (currentTheme && CURRENT_THEMES.includes(currentTheme.toLowerCase())) {
      const themeFilename = join(getSourceFolder(), `${currentTheme.toLowerCase()}.css`);

      cy.readFile(themeFilename, { log: false })
        .then(convertCssVariables)
        .then((css) => {
          $head.append(`<style type="text/css" id="cypress-custom-mode">\n${css}</style>`);
        });
    } else {
      cy.log("Env Theme either not provided or doesn't match list of known themes");
      cy.log('Provided theme', currentTheme, 'and known list:', CURRENT_THEMES);
    }
  };
};

before(loadTheme());
