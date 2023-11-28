/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

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
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_SITE_URL: `'${process.env.NEXT_PUBLIC_URL}'`,
      }),
    ],
  },
]
