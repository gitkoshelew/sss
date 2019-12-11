import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import axios from 'axios';
import env from '../../config/env';
import reducers from './reducers';

export default req => {
  const axiosCookieInstance = axios.create({
    baseURL: env.apiUrl,
    headers: { cookie: req.get('cookie') || '' },
  });

  const axiosInstance = axios.create({
    baseURL: env.apiUrl,
  });

  const effectMiddleware = next => effect => {
    if (effect.type === 'CALL' && effect.payload.args.find(el => el === 'api')) {
      if (effect.payload.args.find(el => el === 'cookie')) {
        effect.payload.fn = effect.payload.fn(axiosCookieInstance);
      } else {
        effect.payload.fn = effect.payload.fn(axiosInstance);
      }
    }

    return next(effect);
  };

  const sagaMiddleware = createSagaMiddleware({
    effectMiddlewares: [effectMiddleware],
  });

  const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
};
