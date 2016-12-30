const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    main: './lib/client/index.js',
    // XXX consider externals here
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
    path: './public'
  },
  stats: 'verbose',
  performance: {
    hints: false
  },
  plugins: [
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
        cacheDirectory: './webpack_cache',
        babelrc: false,
        presets: [
          'es2015',
          'react'
        ]
      },
    }]
  }
}
