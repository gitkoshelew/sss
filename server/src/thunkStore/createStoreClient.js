import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers';

export default () => {
    const axiosInstance = axios.create({
        baseURL: '/api'
    });

    const store = createStore(
        reducers,
        window.INITIAL_STATE,
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );

  return store;
};