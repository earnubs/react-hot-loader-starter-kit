import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseCurrencyAmount extends Component {
  render() {
    return (
      <label>
        EUR
        {' '}
        <input
          defaultValue={ this.props.value || 1 }
          type={ 'number' }
          min={ 1 }
          onChange={ this.props.handleChange }
        />
      </label>
    );
  }
}

BaseCurrencyAmount.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func
};
