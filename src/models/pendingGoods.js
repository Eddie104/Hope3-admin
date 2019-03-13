// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    find,
    fetchBrandAndCategory,
    addGoodsType,
    connectGoodsType,
    setCheck,
    autoConnectByNumber,
    autoConnectByName,
    deletePendingGoods,
    deletePendingGoodsBatch,
} from '../services/pendingGoods';
import {
    fetchSubCategory,
} from '../services/category';
import {
    find as findGoodsType,
} from '../services/goodsType';

export default {
    namespace: 'pendingGoods',

    state: {
        loading: false,
        findFormValue: {
            name: '',
            only_pending: false,
            is_deleted: 0,
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
        *setFormValueIs({ payload }, { put }) {
            yield put({
                type: 'createFindFormValue',
                payload: {
                    is_deleted: payload.is_deleted,
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
                    is_deleted: payload.is_deleted,
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
        *addGoodsType({ payload, callback }, { call, put }) {
            const response = yield call(addGoodsType, payload);
            if (response.success) {
                yield call(setCheck, [payload._id]);
                yield put({
                    type: 'setChecked',
                    payload: [payload._id],
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *connectGoodsType({ payload, callback }, { call, put }) {
            const response = yield call(connectGoodsType, payload);
            if (response.success) {
                const idArr = payload.targetPendingGoodsArr.map(item => item._id);
                yield call(setCheck, idArr);
                yield put({
                    type: 'setChecked',
                    payload: idArr,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *findGoodsType({ payload, callback }, { call }) {
            const response = yield call(findGoodsType, payload);
            if (response.success) {
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *autoConnectByNumber({ callback }, { call }) {
            const response = yield call(autoConnectByNumber);
            if (response.success) {
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *autoConnectByName({ callback }, { call }) {
            const response = yield call(autoConnectByName);
            if (response.success) {
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *delete({ payload, callback }, { call, put }) {
            const response = yield call(deletePendingGoods, payload);
            if (response.success) {
                yield put({
                    type: 'setDeleted',
                    payload,
                });
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *deleteBatch({ payload, callback }, { call, put }) {
            const response = yield call(deletePendingGoodsBatch, payload);
            if (response.success) {
                yield put({
                    type: 'setDeletedBatch',
                    payload,
                });
                callback && callback(response.data);
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
        setChecked(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (payload.includes(list[i]._id)) {
                    list[i].is_checked = true;
                }
            }
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list,
                },
            };
        },
        setDeleted(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (list[i]._id === payload) {
                    list[i].is_deleted = true;
                    break;
                }
            }
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list,
                },
            };
        },
        setDeletedBatch(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (payload.includes(list[i]._id)) {
                    list[i].is_deleted = true;
                }
            }
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list,
                },
            };
        },
    },
};


// 630358
