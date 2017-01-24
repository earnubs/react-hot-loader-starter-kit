import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

export default class Html extends Component {
  render() {
    const { assets, store, component } = this.props;
    const preloadedState = store.getState();
    const content = component ? this.renderComponent(component, store) : '';
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();

    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}` }}
          />
          <script src={ assets.manifest.js } />
          <script src={ assets.vendor.js } />
          <script src={ assets.main.js } />
        </body>
      </html>
    );
  }

  renderComponent(component, store) {
    return ReactDOM.renderToString(
      <Provider store={store} key="provider">
        { component }
      </Provider>
    );
  }
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object,
  assets: PropTypes.object
};
