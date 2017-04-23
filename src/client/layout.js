import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';


import Latest from './containers/home.js';
import Historic from './containers/chart.js';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>FX Demo</title>
        </Helmet>
        <Route exact path='/' component={Latest} />
        <Route path='/chart/:cur1/:cur2' component={Historic} />
      </div>
    );
  }
}
