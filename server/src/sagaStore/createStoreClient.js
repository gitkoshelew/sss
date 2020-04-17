import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import reducers from './reducers';
import sagas from './sagas';
import env from '../../../config/env';

export default () => {
  const axiosInstance = axios.create({
    baseURL: env.apiUrl,
  });

  const effectMiddleware = next => effect => {
    if (effect.type === 'CALL' && effect.payload.args.find(el => el === 'api')) {
      effect.payload.fn = effect.payload.fn(axiosInstance);
    }

    return next(effect);
  };

  const sagaMiddleware = createSagaMiddleware({ effectMiddlewares: [effectMiddleware] });

  const store = createStore(
    reducers,
    window.INITIAL_STATE,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  sagaMiddleware.run(sagas);

  return store;
};
