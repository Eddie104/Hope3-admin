import { message } from 'antd';
import { find, detail, update, add, fetchSubCategory } from '../services/category';

export default {
    namespace: 'category',
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
        detail: {
            name: '',
            sub_category: [],
        },
        subCategoryArr: [],
    },
    effects: {
        *add({ payload, callback }, { call, put }) {
            const response = yield call(add, payload);
            if (response.success) {
                yield put({
                    type: 'added',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
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
        *update({ payload }, { call, put }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
                yield put({
                    type: 'updated',
                    payload: response.data,
                });
            }
        },
        *fetchSubCategory({ payload }, { call, put }) {
            const response = yield call(fetchSubCategory, payload);
            if (response.success) {
                yield put({
                    type: 'fetchedSubCategory',
                    payload: response.data,
                });
            }
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'clearedDetail',
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
        added(state, { payload }) {
            return {
                ...state,
                listData: {
                    list: [payload, ...state.listData.list],
                    pagination: state.listData.pagination,
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
        updated(state, { payload }) {
            const categoryDetail = { ...state.detail };
            categoryDetail.sub_category = payload;
            return {
                ...state,
                detail: categoryDetail,
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
            const { category, subCategory } = payload;
            category.sub_category = subCategory;
            return {
                ...state,
                detail: category,
            };
        },
        fetchedSubCategory(state, { payload }) {
            return {
                ...state,
                subCategoryArr: payload,
            };
        },
        clearedDetail(state) {
            return {
                ...state,
                detail: {
                    name: '',
                    sub_category: [],
                },
            };
        },
    },
};
