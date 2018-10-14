import { message } from 'antd';
import { detail, update, removeGoods } from '../services/goodsColor';

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
    },
    effects: {
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
        *update({ payload, callback }, { call }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
                callback && callback();
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
    },
};
