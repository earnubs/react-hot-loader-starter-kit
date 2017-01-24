import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Home from './containers/home';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
