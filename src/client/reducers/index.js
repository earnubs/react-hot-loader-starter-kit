import { combineReducers } from 'redux';

import * as actions from '../actions';

const rootReducer = combineReducers({
  sayStuff
});

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
