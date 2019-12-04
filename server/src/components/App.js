import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './organizms/Header';
// import { fetchCurrentUser } from '../thunkStore/actions';  //use thunkStore
import { fetchCurrentUser as fetchCurrentUserSaga } from '../sagaStore/sagas';  //use sagaStore

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
  // loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),  //use thunkStore
  loadGeneratorData: fetchCurrentUserSaga //use sagaStore
};
