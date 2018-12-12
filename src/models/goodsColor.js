import { message } from 'antd';
import { detail, update, removeGoods, findPopular, findRecommend } from '../services/goodsColor';

export default {
    namespace: 'goodsColor',
    state: {
        detail: null,
        goodsListData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
        },
        popularListData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
        },
        recommendListData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
            },
        },
        loading: false,
    },
    effects: {
        *findPopular({ payload: { page, count }, callback }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(findPopular, page, count);
            if (response.success) {
                yield put({
                    type: 'setPopularListData',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *findRecommend({ payload: { page, count }, callback }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(findRecommend, page, count);
            if (response.success) {
                yield put({
                    type: 'setRecommendListData',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
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
        *update({ payload, callback }, { call, put }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
                callback && callback();
                if (payload.from === 'popularGoodsColorList') {
                    yield put({
                        type: 'updatePopularListData',
                        payload,
                    });
                } else if (payload.from === 'recommendGoodsColorList') {
                    yield put({
                        type: 'updateRecommendListData',
                        payload,
                    });
                }
            }
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: null,
            });
        },
        *removeGoods({ payload, callback }, { call, put }) {
            const response = yield call(removeGoods, payload._id, payload.goods_id);
            if (response.success) {
                yield put({
                    type: 'rmeoveGoodsById',
                    payload: payload.goods_id,
                });
                callback && callback();
                message.success('删除成功');
            } else {
                message.error(response.data);
            }
        },
    },
    reducers: {
        setDetail(state, { payload }) {
            if (payload) {
                // console.log(payload);
                const { goodsType } = payload;
                return {
                    ...state,
                    detail: payload.goodsColor,
                    goodsListData: {
                        ...payload.goodsArr,
                        list: payload.goodsArr.list.map((item) => {
                            item.goodsTypeName = goodsType.name;
                            item.goodsTypeImg = goodsType.img;
                            return item;
                        }),
                    },
                };
            }
            return {
                ...state,
                detail: null,
                goodsListData: {
                    list: [],
                    pagination: {
                        total: 0,
                        current: 0,
                    },
                },
            };
        },
        rmeoveGoodsById(state, { payload }) {
            const list = [...state.goodsListData.list];
            for (let i = 0; i < list.length; i++) {
                if (list[i]._id === payload) {
                    list.splice(i, 1);
                }
            }
            return {
                ...state,
                goodsListData: {
                    list,
                    pagination: { ...state.goodsListData.pagination },
                },
            };
        },
        setPopularListData(state, { payload }) {
            return {
                ...state,
                popularListData: payload,
                loading: false,
            };
        },
        setRecommendListData(state, { payload }) {
            return {
                ...state,
                recommendListData: payload,
                loading: false,
            };
        },
        setLoading(state, { payload }) {
            return {
                ...state,
                loading: !!payload,
            };
        },
        updatePopularListData(state, { payload: { _id, is_popular } }) { // eslint-disable-line
            const list = [...state.popularListData.list];
            for (let i = 0; i < list.length; i++) {
                if (list[i]._id === _id) {
                    list[i].is_popular = is_popular; // eslint-disable-line
                    break;
                }
            }
            return {
                ...state,
                popularListData: {
                    list,
                    pagination: state.popularListData.pagination,
                },
            };
        },
        updateRecommendListData(state, { payload: { _id, is_recommend } }) { // eslint-disable-line
            const list = [...state.recommendListData.list];
            for (let i = 0; i < list.length; i++) {
                if (list[i]._id === _id) {
                    list[i].is_recommend = is_recommend; // eslint-disable-line
                    break;
                }
            }
            return {
                ...state,
                recommendListData: {
                    list,
                    pagination: state.recommendListData.pagination,
                },
            };
        },
    },
};
