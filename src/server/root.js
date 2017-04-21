import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default class Html extends Component {
  render() {
    const { assets, store, content } = this.props;
    const preloadedState = store.getState();
    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();


    return (
      <html {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
        </head>
        <body {...bodyAttrs}>
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
