const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "85nfws", // David Ingraham - Free Account
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Cosmetic, non-secret theme config lives under `expose` (Cypress 15.10+).
  expose: {
    theme: "dark", // "dark" | "fall" | "light"
    colorblind: false, // layer the colorblind modifier on top of the base theme
    // customTheme: "cypress/my-theme.css", // optional: path to your own CSS
  },
  env: {
    // The API key is intentionally NOT stored here. Provide it via the
    // CYPRESS_API_NINJA_API_KEY environment variable, which Cypress maps to
    // Cypress.env("API_NINJA_API_KEY").
  },
});
