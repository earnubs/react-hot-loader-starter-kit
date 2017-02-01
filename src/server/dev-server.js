require('babel-register');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const chalk = require('chalk');

const webpackConfig = require('../../webpack/config.js');
const app = require('./index.js').default;

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/', // Same as `output.publicPath` in most cases.
  stats: 'none'
}));

app.listen(3000, () => console.log( // eslint-disable-line no-console
  chalk.bold.inverse.green('DEV SERVER: listening on port 3000')
));
