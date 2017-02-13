import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Html extends Component {
  render() {
    const { assets, store, content } = this.props;
    const preloadedState = store.getState();
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();


    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <link rel="stylesheet" href={ assets.main.css } />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}` }}
          />
          <script src={ assets.vendor.js } />
          <script src={ assets.main.js } />
        </body>
      </html>
    );
  }

}

Html.propTypes = {
  content: PropTypes.string,
  store: PropTypes.object,
  assets: PropTypes.object
};
