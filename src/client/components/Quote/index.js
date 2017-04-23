import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Quote extends Component {
  render() {
    const { currency, quote, isSelected, handleClick } = this.props;

    return (
      <div onClick={ handleClick }>
        { currency} { quote }
        { isSelected && ' <- click 1 more to compare past 5 days' }
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
