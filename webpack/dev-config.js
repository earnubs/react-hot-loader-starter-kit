const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const hmr = [
  'babel-polyfill',
  'webpack-hot-middleware/client'
];

module.exports = {
  target: 'web',
  entry: {
    main: ['./src/client/index.js'].concat(hmr),
    // TODO consider externals here
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ].concat(hmr)
  },
  output: {
    filename: '[name].js', // don't use chunkhash in dev
    path: resolve(__dirname, '../public'),
    pathinfo: true,
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    })
  ]
};
