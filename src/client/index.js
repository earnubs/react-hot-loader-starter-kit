import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes.js';
import reducers from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducers, preloadedState);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
  </AppContainer>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    console.log('aslaslals');
  });
}
