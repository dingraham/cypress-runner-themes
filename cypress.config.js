const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "85nfws",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: 
  {
    theme: 'light'
  }
})
