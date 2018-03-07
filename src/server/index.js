import 'source-map-support/register';
import Express from 'express';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import {
  StaticRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';

// dev server only
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import webpackDevConfig from '../../webpack/development.js';

import Layout from '../client/layout.js';
import reducers from '../client/reducers';
import Html from './root.js';
import assets from '../../webpack-assets.json';

const app = Express();

app.use(favicon('./public/penrose.ico'));
app.use('/pub', Express.static('public', { maxAge: '365d' }));

// TODO ensure this gets DCE
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    // this tells the middleware where to send assets in memory, so
    // if you're seeing 404's for assets it's probably because this isn't
    // set correctly in this middleware
    publicPath: webpackDevConfig.output.publicPath,
    hot: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    reload: true // reload page when webpack gets stuck
  }));
}

app.get('*', (req, res) => {

  const store = createStore(reducers);
  const context = {};

  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store} key="provider">
        <Layout />
      </Provider>
    </StaticRouter>
  );

  // in order for the bundled react to reconcile with the server rendered tree,
  // we must renderToString the two different sections, so that the render from
  // client/index has a matching tree
  const html = renderToString(
    <Html
      store={ store }
      assets={ assets }
      content= { content }
    />
  );

  res.send(html);
});

export default app;
