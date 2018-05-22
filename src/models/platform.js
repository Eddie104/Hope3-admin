import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { find, detail, update, add } from '../services/platform';
import { find as findShop } from '../services/shop';

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
        shopListData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
        },
        modalVisible: false,
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
                    type: 'finded',
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
                    type: 'fetchDetail',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *update({ payload }, { call }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
            }
        },
        *findShop({ payload }, { call, put }) {
            const response = yield call(findShop, payload);
            if (response.success) {
                yield put({
                    type: 'findedShop',
                    payload: response.data,
                });
            }
        },
        *add({ payload }, { call, put }) {
            const response = yield call(add, payload);
            if (response.success) {
                message.success('添加成功');
                yield put({
                    type: 'added',
                });
            } else {
                message.error(response.data);
            }
        },
        *changeModalVisible({ payload }, { put }) {
            yield put({
                type: 'changedModalVisible',
                payload,
            });
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
        finded(state, { payload }) {
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
        fetchDetail(state, { payload }) {
            return {
                ...state,
                detail: payload,
            };
        },
        findedShop(state, { payload }) {
            return {
                ...state,
                shopListData: {
                    ...payload,
                },
            };
        },
        added(state) {
            return {
                ...state,
                modalVisible: false,
            };
        },
        changedModalVisible(state, { payload }) {
            return {
                ...state,
                modalVisible: payload,
            };
        },
    },
};
