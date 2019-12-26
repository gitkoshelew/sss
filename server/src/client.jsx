// Startup point for the client side application
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './components/Routes';
import createStore from './sagaStore/createStoreClient';

const store = createStore();

const createRoutes = routes =>
  routes.map((route, idx) => {
    const Component = route.component;
    const childRoutes = route.routes ? createRoutes(route.routes) : () => null;
    return (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact || false}
        render={() => <Component route={childRoutes} />}
      />
    );
  });

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
      {/* <div>
        <Switch>{createRoutes(Routes)}</Switch>
      </div> */}
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
