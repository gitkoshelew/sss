import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import reducers from './reducers';
import sagas from './sagas';



export default () => {
    const axiosInstance = axios.create({
        baseURL: '/api'
    });

    const effectMiddleware = next => effect => {
        if (effect.type === 'CALL' && effect.payload.args.find(el=>el==='api')){
            effect.payload.fn = effect.payload.fn(axiosInstance);
        }
     
        return next(effect);
      }

    const sagaMiddleware = createSagaMiddleware({ effectMiddlewares: [effectMiddleware] });

    const store = createStore(
        reducers,
        window.INITIAL_STATE,
        compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__  ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        )
    );

    sagaMiddleware.run(sagas)

  return store;
};