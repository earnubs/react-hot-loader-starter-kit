import React from 'react';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { render } from 'react-dom';

import App from './containers/app';
import rootReducer from './reducers';

const history = createHistory();
const routing = routerMiddleware(history);


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = (module.hot && module.hot.data && module.hot.data.store)
  ? module.hot.data.store
  : createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, routing),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const contentEl = document.getElementById('content');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <App />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  contentEl
);

if (module.hot) {

  module.hot.accept();

  module.hot.dispose((data) => {
    data.store = store;
  });
}
