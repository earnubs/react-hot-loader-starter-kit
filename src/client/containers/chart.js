import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';

import { fetch5DayRates } from '../actions';

const COLOURS = ['blue', 'red'];

export class Historic extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;

    this.symbols = Object.values(match.params);
    dispatch(fetch5DayRates(this.symbols));
  }

  componentWillReceiveProps(nextProps) {
    const { historic } = nextProps;

    if (!historic.isFetching && historic.dailyRates.length) {
      // https://github.com/reactjs/react-chartjs/issues/57
      // TODO currently installed from master, needs pinned
      new Chart(this.canvas, {
        type: 'line',
        data: {
          labels: historic.dailyRates.map((quote) => quote.date),
          datasets: this.symbols.map((label, i) => {
            return {
              label,
              data: historic.dailyRates.map(quote => quote.rates[label]),
              fill: false,
              lineTension: 0,
              borderColor: COLOURS[i]
            };
          })
        }
      });
    }
  }

  render() {
    return (
      <div>
        <canvas
          width={ 320 }
          height={ 160 }
          ref={ canvas => { this.canvas = canvas; }}
        />
        <Link to='/'>Back</Link>
      </div>
    );
  }
}

Historic.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  historic: PropTypes.object
};

function mapStateToProps(state) {
  const { historic } = state;

  return {
    historic
  };
}

export default connect(mapStateToProps)(Historic);
