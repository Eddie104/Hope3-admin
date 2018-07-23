import { find } from '../services/naifen';

export default {
    namespace: 'naifen',

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
        finded(state, { payload }) {
            return {
                ...state,
                loading: false,
                listData: payload,
            };
        },
        resetedFormValue(state) {
            return {
                ...state,
                findFormValue: {
                    name: null,
                    onlyShowNoGoodsType: false,
                },
            };
        },
        clearedDetail(state) {
            return {
                ...state,
                detail: {},
            };
        },
    },
};
