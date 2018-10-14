// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    find,
    detail,
    update,
    add,
    remove,
    fetchGoodsImgBySeriesId,
    setSeriesImg,
} from '../services/brand';
// import { getItemFromArr } from '../utils/utils';

export default {
    namespace: 'brand',

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
                    type: 'finded',
                    payload: response.data,
                });
            }
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
                yield put({
                    type: 'updated',
                    payload: response.data,
                });
                message.success('更新成功');
            } else {
                message.error(response.data);
            }
        },
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
        *remove({ payload: { id } }, { call, put }) {
            const response = yield call(remove, id);
            if (response.success) {
                yield put({
                    type: 'removed',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'clearedDetail',
            });
        },
        // 根据系列id找到属于这个系列的商品的图片
        *fetchGoodsImgBySeriesId({ payload, callback }, { call }) {
            const response = yield call(fetchGoodsImgBySeriesId, payload.seriesId, payload.page, payload.pageSize);
            if (response.success) {
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *setSeriesImg({ payload, callback }, { call, put }) {
            const response = yield call(setSeriesImg, payload);
            if (response.success) {
                yield put({
                    type: 'updateSeriedImg',
                    payload,
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
        fetchDetail(state, { payload }) {
            payload.series = payload.series.map((series) => {
                series.key = series._id;
                return series;
            });
            return {
                ...state,
                detail: payload,
            };
        },
        updated(state, { payload }) {
            return {
                ...state,
                detail: payload,
            };
        },
        clearedDetail(state) {
            return {
                ...state,
                detail: {},
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
        removed(state, { payload }) {
            const { list } = state.listData;
            for (let i = 0; i < list.length; i += 1) {
                if (list[i]._id === payload) {
                    list.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                listData: {
                    list: [...list],
                    pagination: {
                        total: state.listData.pagination.total - 1,
                        current: state.listData.pagination.current,
                    },
                },
            };
        },
        updateSeriedImg(state, { payload }) {
            const series = [...state.detail.series];
            for (let i = 0; i < series.length; i++) {
                if (series[i]._id === payload.seriesId) {
                    series[i].img = payload.img;
                    break;
                }
            }
            return {
                ...state,
                detail: {
                    ...state.detail,
                    series,
                },
            };
        },
    },
};
