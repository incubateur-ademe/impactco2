// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = [
  {
    name: 'if1',
    mode: 'production',
    entry: './iframe/index.js',
    output: {
      filename: 'iframe.js',
      path: path.resolve(__dirname, 'public'),
    },
  },
  {
    name: 'if2',
    mode: 'production',
    entry: './iframe/livraison.js',
    output: {
      filename: 'iframelivraison.js',
      path: path.resolve(__dirname, 'public'),
    },
  },
]
