import { combineReducers } from 'redux';

import * as actions from '../actions';

const rootReducer = combineReducers({
  identity,
  sayStuff
});

export function identity(state={}, action) {
  switch (action.type) {
    case actions.IDENTIFY:
      return [
        ...state,
        ...action.ident,
      ];
    default:
      return state;
  }
}

export function sayStuff(state={}, action) {
  switch (action.type) {
    case actions.SAY_HELLO:
      return [
        ...state,
        {
          to: action.who
        }
      ];
    default:
      return state;
  }
}

export default rootReducer;
