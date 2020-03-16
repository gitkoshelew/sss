import React, { useEffect, useCallback } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import '../../node_modules/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import './style.scss';
import Header from './organizms/Header/index';
import Loader from './atoms/Loader';
import { authInitialCheck } from '../sagaStore/actions';

const App = ({ route, loaderMain, dispatchAuthInitialCheck }) => {
  useEffect(() => {
    dispatchAuthInitialCheck();
  }, [dispatchAuthInitialCheck]);

  return (
    <div>
      {loaderMain && <Loader />}
      <Header />
      <Switch>{renderRoutes(route.routes)}</Switch>
      {/* <Switch>{route}</Switch> */}
    </div>
  );
};

const actionCreators = {
  dispatchAuthInitialCheck: authInitialCheck,
};

const AppConnect = connect(
  ({ loaders }) => ({
    ...loaders,
  }),
  actionCreators
)(App);

export default {
  component: AppConnect,
};
