import 'source-map-support/register';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { match, RouterContext } from 'react-router';

// dev server only
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';

import webpackDevConfig from '../../webpack/dev-config.js';

import reducers from '../client/reducers';
import routes from '../client/routes';
import Html from './root.js';
import assets from '../../webpack-assets.json';

const app = Express();

app.use('/assets', Express.static('public', { maxAge: '365d' }));

// TODO ensure this gets DCE
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    // this tells the middleware where to send assets in memory, so
    // if you're seeing 404's for assets it's probably because this isn't
    // set correctly in this middleware
    publicPath: webpackDevConfig.output.publicPath
  }));
}

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {

      const component = <RouterContext {...props}/>;
      const store = createStore(reducers);

      res.status(200);
      res.send('<!doctype html>\n' +
        renderToString(
          <Html
            store={ store }
            component={ component }
            assets={ assets }
          />
        ));
    } else {
      res.status(404).send('Snapfui: Not Found');
    }

  });
});

export default app;
