import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className={'b-nav'}>
          <div className={'b-nav__wrap'}>
            <div className={'b-nav__homelink'}>
              <Link to='/'>Snapfui</Link>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
