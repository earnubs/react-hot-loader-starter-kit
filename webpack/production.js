const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  target: 'web',
  context: resolve(__dirname, '../'),
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
    path: resolve(__dirname, '../public'),
    publicPath: '/pub/'
  },
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    })
  ]
};
