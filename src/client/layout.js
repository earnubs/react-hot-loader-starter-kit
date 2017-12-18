import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/home.js';
import About from './containers/about.js';
import Login from './containers/login.js';

//debugger; // eslint-disable-line no-debugger

export class Component extends React.Component {
  render() {
    const { displayName } = this.props.identity;
    return (
      <div>
        <div className={'b-nav'}>
          <div className={'b-nav__wrap'}>
            <div className={'b-nav__homelink'}>
              <Link to='/'>Home</Link>
              <Link to='/about'>About</Link>
              { displayName ?
                <span>
                    Hello {displayName}
                    (
                  <a href='/logout'>Logout {this.props.identity.displayName}</a>
                    )
                </span>
                :
                <Link to='/login'>Login</Link>
              }
            </div>
          </div>
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

Component.propTypes = {
  identity: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
};

Component.defaultProps = {
  identity: {
    displayName: undefined,
  }
};

function mapStateToProps(state) {
  return { identity: state.identity };
}

export default connect(mapStateToProps)(Component);

