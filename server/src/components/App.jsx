import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './organizms/Header';
import { fetchCurrentUser as fetchCurrentUserSaga } from '../sagaStore/sagas/currentUser';

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  loadGeneratorData: fetchCurrentUserSaga
};
