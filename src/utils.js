import { join } from 'path';
import postcss from 'postcss';
import cssVariables from 'postcss-css-variables';

const convertCssVariables = (mycss) => postcss([cssVariables()]).process(mycss).css;

const getHead = () => Cypress.$(parent.window.document.head);

const isThemeLoaded = ($head) => $head.find('#cypress-themes').length > 0;

// const getSourceFolder = () => 'node_modules/cypress-themes/dist/themes';
const getSourceFolder = () => 'src/themes';

const CURRENT_THEMES = ['colorblind', 'dark', 'light'];

const loadTheme = () => {
  return () => {
    // Check if theme is loaded already
    const $head = getHead();
    if (isThemeLoaded($head)) {
      return;
    }

    // Load theme if exists and supported
    const currentTheme = Cypress.env('theme');
    // Support different spellings
    if (currentTheme === 'colourblind') {
        currentTheme ='colorblind'
    }
    if (currentTheme && CURRENT_THEMES.includes(currentTheme.toLowerCase())) {
      const themeFilename = join(getSourceFolder(), `${currentTheme.toLowerCase()}.css`);

      cy.readFile(themeFilename, { log: false })
        .then(convertCssVariables)
        .then((css) => {
          $head.append(`<style type="text/css" id="cypress-themes">\n${css}</style>`);
        });
    } else {
      cy.log("Env Theme either not provided or doesn't match list of known themes");
      cy.log('Provided theme', currentTheme, 'and known list:', CURRENT_THEMES);
    }
  };
};

export default loadTheme
