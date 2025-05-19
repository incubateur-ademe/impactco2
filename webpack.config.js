/* eslint-disable @typescript-eslint/no-var-requires */
//const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
      detectionAsync: {
        import: './detection/index-async.ts',
        filename: '../public/scripts/detection-async.js',
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
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
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
        MATOMO_SITE_ID: `'${process.env.NEXT_PUBLIC_MATOMO_DETECTOR_SITE_ID || ''}'`,
      }),
      //new BundleAnalyzerPlugin(),
      //new StatoscopeWebpackPlugin(),
    ],
  },
  {
    name: 'npm',
    mode: 'production',
    entry: './src/npm/react/index.ts',
    output: {
      publicPath: '',
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
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  },

  {
    name: 'web-components',
    mode: 'production',
    entry: './src/npm/react/EtiquetteWC.ts',
    output: {
      publicPath: '',
      filename: 'etiquette.js',
      path: path.resolve(__dirname, 'public', 'webcomponents'),
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        data: path.resolve(__dirname, 'src/data/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat', // Must be below test-utils
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
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
