// import { message } from 'antd';
import { message } from 'antd';
import { find, detail, fetchSubCategory } from '../services/goodsType';

export default {
    namespace: 'goodsType',
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
        detail: null,
        brands: [],
        category: [],
        subCategory: [],
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
        },
        *detail({ payload, callback }, { call, put }) {
            const response = yield call(detail, payload);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *fetchSubCategory({ payload, callback }, { call, put }) {
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
        // *update({ payload }, { call, put }) {
        //     const response = yield call(update, payload);
        //     if (response.success) {
        //         message.success('保存成功');
        //         yield put({
        //             type: 'updated',
        //             payload: response.data,
        //         });
        //     }
        // },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: null,
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
        // added(state, { payload }) {
        //     return {
        //         ...state,
        //         listData: {
        //             list: [payload, ...state.listData.list],
        //             pagination: state.listData.pagination,
        //         },
        //     };
        // },
        setListData(state, { payload }) {
            return {
                ...state,
                listData: {
                    ...payload,
                },
            };
        },
        // updated(state, { payload }) {
        //     const categoryDetail = { ...state.detail };
        //     categoryDetail.sub_category = payload;
        //     return {
        //         ...state,
        //         detail: categoryDetail,
        //     };
        // },
        resetedFormValue(state) {
            return {
                ...state,
                findFormValue: {
                    name: null,
                },
            };
        },
        setDetail(state, { payload }) {
            if (payload) {
                return {
                    ...state,
                    detail: payload.goodsType,
                    brands: payload.brands,
                    category: payload.category,
                };
            }
            return {
                ...state,
                detail: null,
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
