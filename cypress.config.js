const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: '[name].html',
    overwrite: true,
    html: true,
    json: false,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
