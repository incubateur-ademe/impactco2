/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = [
  {
    name: 'iframe',
    mode: 'production',
    entry: './iframe/index.js',
    output: {
      filename: 'iframe.js',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_SITE_URL: `'${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}'`,
      }),
    ],
  },
  {
    name: 'scripts',
    mode: 'production',
    entry: {
      detection: {
        import: './detection/index.ts',
        filename: '../public/scripts/detection.js',
      },
      detectionDarkMode: {
        import: './detection/index-darkmode.ts',
        filename: '../public/scripts/detection-darkmode.js',
      },
      detectionAsync: {
        import: './detection/index-async.ts',
        filename: '../public/scripts/detection-async.js',
      },
      detectionDarkModeAsync: {
        import: './detection/index-darkmode-async.ts',
        filename: '../public/scripts/detection-darkmode-async.js',
      },
      shopify: {
        import: './shopify/index.tsx',
        filename: '../shopify/extensions/equivalent-carbone/assets/shopify.js',
      },
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        data: path.resolve(__dirname, 'src/data/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        MATOMO_SITE_URL: `'${process.env.NEXT_PUBLIC_MATOMO_SITE_URL || ''}'`,
        MATOMO_SITE_ID: `'${process.env.NEXT_PUBLIC_MATOMO_SITE_ID || ''}'`,
      }),
    ],
  },
  {
    name: 'npm',
    mode: 'production',
    entry: './src/npm/react/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'npm', 'react', 'dist'),
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        data: path.resolve(__dirname, 'src/data/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  },
]
