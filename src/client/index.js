import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';
//import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/app';
import reducers from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducers, preloadedState);

//const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./containers/app.js', () => {
    console.log('module.hot.accept'); // eslint-disable-line no-console
  });
}
