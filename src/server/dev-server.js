require('babel-register')({
  babelrc: false, // dev uses babel-register and hmr, prod doesn't
  presets: [
    'es2015',
    //'stage-2',
    'react'
  ],
  plugins: [
    //  'react-hot-loader/babel'
  ]
});
const chalk = require('chalk');

const app = require('./index.js').default;

app.listen(3000, '0.0.0.0', () => console.log( // eslint-disable-line no-console
  chalk.bold.inverse.green('DEV SERVER: listening on port 3000')
));
