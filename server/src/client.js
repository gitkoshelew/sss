// Startup point for the client side application
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './components/Routes';
// import createStore from './thunkStore/createStoreClient'; // use thunkStore
import createStore from './sagaStore/createStoreClient'; // use sagaStore


if (process.env.NODE_ENV === 'development' && module.hot) {
  // use thunkStore
  // module.hot.accept('./sagaStore/reducers', () =>
  //   store.replaceReducer(require('./sagaStore/reducers').default)
  // );

  // use sagaStore
  module.hot.accept('./sagaStore/reducers', () =>
    store.replaceReducer(require('./sagaStore/reducers').default)
  );
}

ReactDOM.hydrate(
  <Provider store={createStore()}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
