const path = require('path')

module.exports = {
  entry: './iframe/index.js',
  output: {
    filename: 'iframe.js',
    path: path.resolve(__dirname, 'build'),
  },
}
