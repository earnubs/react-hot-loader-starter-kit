const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    main: './src/client/index.js',
    // TODO consider externals here
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ]
  },
  output: {
    filename: '[chunkhash].[name].js',
    path: path.resolve(__dirname, 'public')
  },
  stats: 'verbose',
  performance: {
    hints: 'warning'
  },
  plugins: [
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: './webpack_cache'
      },
    }]
  }
};
