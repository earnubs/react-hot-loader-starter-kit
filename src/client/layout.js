import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './containers/home.js';
import About from './containers/about.js';
import DatasetTools from './containers/datasetTools.js';

//debugger; // eslint-disable-line no-debugger

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className={'b-nav'}>
          <div className={'b-nav__wrap'}>
            <div className={'b-nav__homelink'}>
              <Link to='/'>home</Link>
              <Link to='/about'>about</Link>
              <Link to='/datasetTools'>dataset.tools</Link>
            </div>
          </div>
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/datasetTools" component={DatasetTools} />
      </div>
    );
  }
}
