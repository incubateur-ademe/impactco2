const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'jw5m6q',
  e2e: {
    env: {
      // https://github.com/bahmutov/cypress-slow-down
      commandDelay: 500,
    },
    experimentalRunAllSpecs: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
