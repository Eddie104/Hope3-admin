// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    find,
    fetchBrandAndCategory,
} from '../services/pendingGoods';
import {
    fetchSubCategory,
} from '../services/category';

export default {
    namespace: 'pendingGoods',

    state: {
        loading: false,
        findFormValue: {
            name: '',
            only_pending: false,
            platform: 'all',
        },
        listData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
            platform: [],
        },
        brands: [],
        category: [],
        subCategory: [],
        goodsTypeData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
            brandArr: [],
            goodsArr: [],
        },
    },

    effects: {
        *setFormValueOnlyPending({ payload }, { put }) {
            yield put({
                type: 'createFindFormValue',
                payload: {
                    only_pending: payload.only_pending,
                },
            });
        },
        *find({ payload }, { call, put }) {
            yield put({
                type: 'changeStyleListLoading',
                payload: true,
            });
            yield put({
                type: 'createFindFormValue',
                payload: {
                    name: payload.name,
                    only_pending: payload.only_pending,
                    platform: payload.platform,
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
            } else {
                message.error(response.data);
            }
            yield put({
                type: 'changeStyleListLoading',
                payload: false,
            });
        },
        *fetchBrandAndCategory({ callback }, { call, put }) {
            const response = yield call(fetchBrandAndCategory);
            if (response.success) {
                yield put({
                    type: 'setBrandAndCategory',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *fetchSubCategory({ callback, payload }, { call, put }) {
            const response = yield call(fetchSubCategory, payload);
            if (response.success) {
                yield put({
                    type: 'setSubCategory',
                    payload: response.data,
                });
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
                    ...state.findFormValue,
                    ...payload,
                },
            };
        },
        resetedFormValue(state) {
            return {
                ...state,
                findFormValue: { name: '', only_pending: false, platform: 'all' },
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
        setBrandAndCategory(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        setSubCategory(state, { payload }) {
            return {
                ...state,
                subCategory: payload,
            };
        },
    },
};
