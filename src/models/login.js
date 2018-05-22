import { routerRedux } from 'dva/router';
import { login } from '../services/oauth';
import * as storage from '../utils/storage';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            yield put({
                type: 'changeSubmitting',
                payload: true,
            });
            const response = yield call(login, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.success) {
                yield put({
                    type: 'saveToken',
                    payload: response.data.token,
                });
                yield put(routerRedux.push('/'));
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                },
            });
            yield put({ type: 'removeToken' });
            yield put(routerRedux.push('/user/login'));
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                type: payload.type,
                submitting: false,
            };
        },
        changeSubmitting(state, { payload }) {
            return {
                ...state,
                submitting: payload,
            };
        },
        saveToken(state, { payload }) {
            storage.setItem(storage.ACCESS_TOKEN, payload.accessToken);
            storage.setItem(storage.REFRESH_TOKEN, payload.refreshToken);
            storage.setItem(storage.USER, JSON.stringify(payload.user));
            return state;
        },
        removeToken(state) {
            storage.removeItem(storage.ACCESS_TOKEN);
            storage.removeItem(storage.REFRESH_TOKEN);
            storage.removeItem(storage.USER);
            return state;
        },
    },
};
