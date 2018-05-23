// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { find, detail, update, add } from '../services/platform';

export default {
    namespace: 'platform',

    state: {
        loading: false,
        findFormValue: {
            name: null,
        },
        listData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
        },
        detail: {},
    },

    effects: {
        *find({ payload }, { call, put }) {
            yield put({
                type: 'changeStyleListLoading',
                payload: true,
            });
            yield put({
                type: 'createFindFormValue',
                payload: {
                    name: payload.name,
                },
            });
            if (payload.resetFormValue) {
                yield put({
                    type: 'resetedFormValue',
                });
            }
            const response = yield call(find, payload);
            if (response.success) {
                yield put({
                    type: 'setListData',
                    payload: response.data,
                });
            }
            yield put({
                type: 'changeStyleListLoading',
                payload: false,
            });
            // message.success('提交成功');
        },
        *detail({ payload }, { call, put }) {
            const response = yield call(detail, payload);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: {},
            });
        },
        *update({ payload }, { call }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
            }
        },
        *add({ payload, callback }, { call }) {
            const response = yield call(add, payload);
            if (response.success) {
                message.success('添加成功');
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
    },

    reducers: {
        changeStyleListLoading(state, { payload }) {
            return {
                ...state,
                loading: payload,
            };
        },
        createFindFormValue(state, { payload }) {
            return {
                ...state,
                findFormValue: {
                    ...payload,
                },
            };
        },
        setListData(state, { payload }) {
            return {
                ...state,
                listData: {
                    ...payload,
                },
            };
        },
        resetedFormValue(state) {
            return {
                ...state,
                findFormValue: {
                    name: null,
                },
            };
        },
        setDetail(state, { payload }) {
            return {
                ...state,
                detail: payload,
            };
        },
    },
};
