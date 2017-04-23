import fetch from 'isomorphic-fetch';

const API_URL = 'https://api.fixer.io';
const DEFAULT_SYMBOLS = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNY' ,
  'SEK',
  'NZD'
];

export const REQUEST_RATES = 'REQUEST_RATES';
export const REQUEST_RATES_FAILURE = 'REQUEST_RATES_FAILURE';

export function requestRates() {
  return {
    type: REQUEST_RATES
  };
}

export const REQUEST_RATES_SUCCESS = 'REQUEST_RATES_SUCCESS';
export function requestRatesSuccess(json) {
  return {
    type: REQUEST_RATES_SUCCESS,
    payload: json
  };
}

export function fetchRates() {
  return function (dispatch) {
    dispatch(requestRates());

    return fetch(`${API_URL}/latest?symbols=${DEFAULT_SYMBOLS}`)
      .then(response => response.json())
      .then(json =>
        dispatch(requestRatesSuccess(json))
      );

    // TODO handle failure
  };
}

export const UPDATE_BASE_AMOUNT = 'UPDATE_BASE_AMOUNT';
export function updateBaseAmount(amount) {
  return {
    type: UPDATE_BASE_AMOUNT,
    payload: amount
  };
}

export const SELECT_QUOTE = 'SELECT_QUOTE';
export function selectQuote(quote) {
  return {
    type: SELECT_QUOTE,
    payload: quote
  };
}

export const CLEAR_SELECTED_QUOTES= 'CLEAR_SELECTED_QUOTES';
export function clearSelectedQuotes() {
  return {
    type: CLEAR_SELECTED_QUOTES
  };
}

export const REQUEST_5DAY_RATES = 'REQUEST_5DAY_RATES';
export function request5DayRates() {
  return {
    type: REQUEST_5DAY_RATES
  };
}

export function fetch5DayRates(symbols, dates) {
  return function (dispatch) {
    dispatch(request5DayRates);

    return Promise.all(dates.reverse().map(date => {
      return fetch(`${API_URL}/${date}?symbols=${symbols.join()}`)
        .then(response => response.json());
    }))
      .then(json => {
        dispatch(request5DayRatesSuccess(json));
      });
  };
}

export const REQUEST_5DAY_RATES_SUCCESS = 'REQUEST_5DAY_RATES_SUCCESS';
export function request5DayRatesSuccess(json) {
  return {
    type: REQUEST_5DAY_RATES_SUCCESS,
    payload: json
    // TODO receivedAt, only check if 24 hrs have passed or after 4PM CET
  };
}
