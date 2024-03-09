const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "85nfws", // David Ingraham - Free Acount
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:{
    theme: "dark", // [dark/light/colorblind]
    API_NINJA_API_KEY: "no8IA/8VjG09kcDmXVBiAA==zbtNeVLImXzUbJHQ",
  },
});
