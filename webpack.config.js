let path = require('path');

const PATHS = {
  JS: path.join(__dirname, 'dist/js'),
  DIST: path.join(__dirname, 'dist')
};

module.exports = {
  entry: [
    'babel-polyfill',
    PATHS.JS + '/app.js',
  ],
  output: {
    path: PATHS.DIST,
    filename: 'site.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-runtime'
          ],
          presets: [
            'es2015',
            'es2016',
            'es2017',
            'stage-0'
          ]
        }
      }
    ]
  },
};

