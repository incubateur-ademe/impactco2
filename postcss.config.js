module.exports = {
  plugins: [
    [
      'postcss-import',
      {
        // Do not transform @import css rules
        filter: () => false,
      },
    ],
    'postcss-nested',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
          grid: 'autoplace',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
}
