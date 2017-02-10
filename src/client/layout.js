import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './containers/home.js';
import About from './containers/about.js';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <div className={'b-nav'}>
          <div className={'b-nav__wrap'}>
            <div className={'b-nav__homelink'}>
              <Link to='/'>Snapfui</Link>
              <Link to='/about'>About</Link>
            </div>
          </div>
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
});

export default Layout;
