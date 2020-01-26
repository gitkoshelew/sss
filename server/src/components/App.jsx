import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import '../../node_modules/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import Header from './organizms/Header/index';
import { fetchCurrentUser as fetchCurrentUserSaga } from '../sagaStore/sagas/currentUser';

const App = ({ route }) => {
  return (
    <div>
      <Header />
      <Switch>{renderRoutes(route.routes)}</Switch>
      {/* <Switch>{route}</Switch> */}
    </div>
  );
};

export default {
  component: App,
  loadGeneratorData: fetchCurrentUserSaga,
};
