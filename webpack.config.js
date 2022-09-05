const path = require('path')

module.exports = {
  mode: 'production',
  entry: './iframe/index.js',
  output: {
    filename: 'iframe.js',
    path: path.resolve(__dirname, 'public'),
  },
}
