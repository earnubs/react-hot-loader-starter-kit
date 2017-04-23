import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseCurrencyAmount extends Component {
  render() {
    return (
      <label>
        EUR
        <input value={ this.props.value } onChange={ this.props.handleChange } />
      </label>
    );
  }
}

BaseCurrencyAmount.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func
};
