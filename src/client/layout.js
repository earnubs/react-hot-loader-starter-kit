import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Latest from './containers/home.js';
import Historic from './containers/chart.js';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Latest} />
        <Route path='/chart/:cur1/:cur2' component={Historic} />
      </div>
    );
  }
}
