import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as actionTypes from '../actions';

const rootReducer = combineReducers({
  latest,
  historic,
  routing: routerReducer
});

export function latest(state = {
  amount: 1,
  isFetching: false,
  error: null,
  selected: [],
  rates: {}
}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_BASE_AMOUNT:
      return {
        ...state,
        amount: action.payload
      };
    case actionTypes.REQUEST_RATES:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.REQUEST_RATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        rates: action.payload.rates
      };
    case actionTypes.REQUEST_RATES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case actionTypes.SELECT_QUOTE: {
      return {
        ...state,
        selected: state.selected.concat(action.payload).slice(-2)
      };
    }
    case actionTypes.CLEAR_SELECTED_QUOTES:
      return {
        ...state,
        selected: []
      };
    default:
      return state;
  }
}

export function historic(state = {
  isFetching: false,
  error: null,
  dailyRates: {}
}, action) {

  switch (action.type) {
    case actionTypes.REQUEST_5DAY_RATES:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.REQUEST_5DAY_RATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dailyRates: action.payload
      };
    default:
      return state;
  }
}


export default rootReducer;
