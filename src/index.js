import './index.css';
import './themes/semantic.simplex.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

//import './themes/semantic.sandstone.css';

const TARGET_ROOT = 'root';

let application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(application, document.getElementById(TARGET_ROOT));
registerServiceWorker();
