import { all, call, put, takeEvery, select } from 'redux-saga/effects';
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
    FETCH_ADMINS_FAIL,
    FETCH_LOG,
    FETCH_LOG_OUT
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
            console.log("1Problem With Response ", err.response.data);
            return { error: "1Problem With Response " + err.response.data.error}
        } else if (err.response.status) {
            console.log("2Problem With Response ", err.response.status);
            return { error: "2Problem With Response " + err.response.status }
        } else if (err.request) {
            console.log("Problem With Request!");
            return { error: "Problem With Request!" };
        } else {
            console.log('Error', err.message);
            return { error: err.message}
        }
    });

const postAxiosApi = (url, data) => (api) => () => api.post(url, data)
.then(res=>res.data)
.catch(err=>{ 
    if (err.response.data){
        console.log("1Problem With Response ", err.response.data);
        return { error: "1Problem With Response " + err.response.data.error}
    } else if (err.response.status) {
        console.log("2Problem With Response ", err.response.status);
        return { error: "2Problem With Response " + err.response.status }
    } else if (err.request) {
        console.log("Problem With Request!");
        return { error: "Problem With Request!" };
    } else {
        console.log('Error', err.message);
        return { error: err.message}
    }
});


export function* fetchUsers() {
    try {
        const users = yield call(getAxiosApi('/users'), 'api', 'cookie');
        if ( users.error ){
            yield put({
                type: FETCH_USERS_FAIL,
                payload: users.error
            });
        } else {
            yield put({
                type: FETCH_USERS_SUCCESS,
                payload: users
            });
        }

    } catch (error) {
        yield put({
            type: FETCH_USERS_FAIL,
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
        yield put({
            type: FETCH_ADMINS_FAIL,
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

export function* fetchLog() {
    try {
        const logForm = yield select(state => state.logForm )
        const user = yield call(postAxiosApi('/auth/local', logForm), 'api');
        if (user.message && user.message === 'logout'){
            yield put({
                type: FETCH_CURRENT_USER_SUCCESS,
                payload: false
            });
        } else {
            yield put({
                type: FETCH_CURRENT_USER_SUCCESS,
                payload: user
            });
        }
    } catch (error) {
        yield put({
            type: FETCH_CURRENT_USER_SUCCESS,
            payload: error
        });
    }
}

export function* fetchLogOut() {
    try {

        yield call(postAxiosApi('/auth/local', false), 'api');

        yield put({
            type: FETCH_CURRENT_USER_SUCCESS,
            payload: null
        });

    } catch (error) {
        yield put({
            type: FETCH_CURRENT_USER_ERROR,
            payload: error
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

export function* fetchLogSaga() {
    yield takeEvery(FETCH_LOG, fetchLog);
}

export function* fetchLogOutSaga() {
    yield takeEvery(FETCH_LOG_OUT, fetchLogOut);
}

export default function* rootSaga() {
    yield all([
        fetchUsersSaga(),
        fetchCurrentUserSaga(),
        fetchAdminsSaga(),
        fetchLogSaga(),
        fetchLogOutSaga(),
    ]);
}
