import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from '../layout.js';
import styles from './app.scss';

const App = React.createClass({
  render: () => {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
});

export default App;
