// Startup point for the client side application
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './components/Routes';
import createStore from './sagaStore/createStoreClient';
import reducers from './sagaStore/reducers';

const store = createStore();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./sagaStore/reducers', () => {
    store.replaceReducer(reducers);
  });
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
