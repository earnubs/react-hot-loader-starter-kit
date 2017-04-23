import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRates, updateBaseAmount, selectQuote } from '../actions';
import BaseCurrencyAmount from '../components/BaseCurrencyAmount';
import Quote from '../components/Quote';

export class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRates());
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps.latest;

    if (selected && selected.length > 1) {
      this.props.history.push(`/chart/${selected.join('/')}`);
    }
  }

  handleChange(ev) {
    this.props.dispatch(updateBaseAmount(ev.target.value));
  }

  handleClick(currency) {
    this.props.dispatch(selectQuote(currency));
  }

  render() {
    const { latest } = this.props;
    const { rates, amount, selected } = latest;
    const quotes = rates && Object.entries(rates).map(rate => {
      const [currency, value] = rate;

      const isSelected = selected.some(item => item === currency);

      return (
        <Quote
          key={ currency }
          isSelected={ isSelected }
          currency={ currency }
          quote={ (value * amount).toFixed(2) }
          handleClick={ this.handleClick.bind(this, currency) }
        />
      );
    });

    return (
      <div>
        <BaseCurrencyAmount value={+amount} handleChange={this.handleChange.bind(this)} />
        { quotes }
      </div>
    );
  }

}

Home.propTypes = {
  dispatch: PropTypes.func,
  fetchRates: PropTypes.func,
  history: PropTypes.object,
  latest: PropTypes.object
};


function mapStateToProps(state) {
  const { latest } = state;

  return {
    latest
  };
}

export default connect(mapStateToProps)(Home);
