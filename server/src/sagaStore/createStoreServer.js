import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import axios from 'axios';
import reducers from './reducers';
// import effectMiddleware from './effectMiddleware';




export default req => {
  const axiosCookieInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' }
  });

  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
  });

  const effectMiddleware = next => effect => {
    if (effect.type === 'CALL' && effect.payload.args.find(el=>el==='api')){
      if (effect.payload.args.find(el=>el==='cookie')){
        effect.payload.fn = effect.payload.fn(axiosCookieInstance);
      } else {
        effect.payload.fn = effect.payload.fn(axiosInstance);
      }
    }
 
    return next(effect);
  }

  const effectMiddleware2 = next => effect => {
    if (effect.type === 'CALL'){
      
    }
    
    return next(effect);
  }
  
  const sagaMiddleware = createSagaMiddleware({ effectMiddlewares: [effectMiddleware, effectMiddleware2] });

  // const middleware = sagaMiddleware({ effectMiddlewares: [effectMiddleware(axiosInstance)] });

  
  const store = createStore(
    reducers,
    {},
    // applyMiddleware(middleware)
    applyMiddleware(sagaMiddleware)
  );

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
};
