// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    find,
    fetchBrandAndCategory,
    addGoodsType,
    relationGoodsType,
    autoRelation,
    autoRelationByNumber,
} from '../services/pendingGoods';
// import {
//     find as fetchGoodsType,
// } from '../services/goodsType';
import {
    fetchSubCategory,
} from '../services/category';
// import { QINIU_DOMAIN } from '../config';

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
                    type: 'finded',
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
                    type: 'fetchedBrandAndCategory',
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
                    type: 'fetchedSubCategory',
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
                yield put({
                    type: 'addedGoodsType',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *fetchGoodsType({ payload, callback }, { call, put }) {
            // const response = yield call(fetchGoodsType, payload);
            // if (response.success) {
            //     yield put({
            //         type: 'fetchedGoodsType',
            //         payload: response.data,
            //     });
            //     callback && callback();
            // } else {
            //     message.error(response.data);
            // }
        },
        *relationGoodsType({ payload, callback }, { call, put }) {
            const response = yield call(relationGoodsType, payload);
            if (response.success) {
                yield put({
                    type: 'relationedGoodsType',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *autoRelation({ callback }, { call }) {
            const response = yield call(autoRelation);
            if (response.success) {
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *autoRelationByNumber({ callback }, { call }) {
            const response = yield call(autoRelationByNumber);
            if (response.success) {
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
        finded(state, { payload }) {
            return {
                ...state,
                listData: {
                    ...payload,
                },
            };
        },
        fetchedBrandAndCategory(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        fetchedSubCategory(state, { payload }) {
            return {
                ...state,
                subCategory: payload,
            };
        },
        addedGoodsType(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (list[i]._id === payload._id) {
                    list[i].is_checked = true;
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
        fetchedGoodsType(state, { payload }) {
            return {
                ...state,
                goodsTypeData: { ...payload },
            };
        },
        relationedGoodsType(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (list[i]._id === payload._id) {
                    list[i].is_checked = true;
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
    },
};
