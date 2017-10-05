import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { hydrate } from 'react-dom';

import App from './containers/app';
import reducers from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = (module.hot && module.hot.data && module.hot.data.store)
  ? module.hot.data.store
  : createStore(
    reducers, preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const contentEl = document.getElementById('content');

hydrate(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  contentEl
);

if (module.hot) {

  module.hot.accept();

  module.hot.dispose((data) => {
    data.store = store;
  });
}
