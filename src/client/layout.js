import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './containers/home.js';
import About from './containers/about.js';

//debugger; // eslint-disable-line no-debugger

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className={'b-nav'}>
          <div className={'b-nav__wrap'}>
            <div className={'b-nav__homelink'}>
              <Link to='/'>Home</Link>
              <Link to='/about'>About</Link>
            </div>
          </div>
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}
