import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAIL,
    FETCH_ADMINS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAIL
} from '../actions';


export const fetchApi = (url) => (api) =>{
    api.get(url).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
    
        return response.json();
    });
}

export const fetchUrl = (url) => () => fetch('http://react-ssr-api.herokuapp.com' + url).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        
        return response.json();
    })

const getAxiosApi = (url) => (api) => () => api.get(url)
    .then(res=>res.data)
    .catch(err=>{ 
        if (err.response.data){
            console.log(err.response.data);
            return { error: "Problem With Response " + err.response.data.error}
        } else if (err.response.status) {
            console.log("Problem With Response ", err.response.status);
            return { error: "2Problem With Response " + err.response.status }
        } else if (err.request) {
            console.log("Problem With Request!");
            return { error: "Problem With Request!" };
        } else {
            console.log('Error', err.message);
            throw new Error('Error', err.message);
        }
    });


export function* fetchUsers() {
    try {
        const users = yield call(getAxiosApi('/users'), 'api', 'cookie');
        if ( users.error ){
            yield put({
                type: FETCH_USERS_SUCCESS,
                payload: users
            });
        } else {
            yield put({
                type: FETCH_USERS_FAIL,
                payload: users.error
            });
        }

    } catch (error) {
        yield put({
            type: FETCH_USERS_FAIL,
            payload: error,
        });
    }
}

export function* fetchCurrentUser() {
    try {
        const user = yield call(getAxiosApi('/current_user'), 'api');

        yield put({
            type: FETCH_CURRENT_USER_SUCCESS,
            payload: user
        });
    } catch (error) {
        yield put({
            type: FETCH_CURRENT_USER_FAIL,
            payload: error,
        });
    }
}

export function* fetchAdmins() {
    try {
        const admins = yield call(getAxiosApi('/admins'), 'api');
        if (admins.error){
            yield put({
                type: FETCH_ADMINS_FAIL,
                payload: admins.error,
            })
        } else {
            yield put({
                type: FETCH_ADMINS_SUCCESS,
                payload: admins
            });
        }

    } catch (error) {
        console.log("!!!", error)
        yield put({
            type: FETCH_ADMINS_FAIL,
            payload: error,
        });
    }
}

export function* fetchUsersSaga() {
    yield takeEvery(FETCH_USERS, fetchUsers);
}

export function* fetchCurrentUserSaga() {
    yield takeEvery(FETCH_CURRENT_USER, fetchCurrentUser);
}

export function* fetchAdminsSaga() {
    yield takeEvery(FETCH_ADMINS, fetchAdmins);
}

export default function* rootSaga() {
    yield all([
        fetchUsersSaga(),
        fetchCurrentUserSaga(),
        fetchAdminsSaga()
    ]);
}
