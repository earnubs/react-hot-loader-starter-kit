import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Quote extends Component {
  render() {
    return (
      <div onClick={ this.props.handleClick } style={ this.props.isSelected ? { color: 'red' } : null }>
        { this.props.currency} { this.props.quote }
      </div>
    );
  }
}

Quote.propTypes = {
  currency: PropTypes.string,
  quote: PropTypes.string,
  handleClick: PropTypes.func,
  isSelected: PropTypes.bool
};
