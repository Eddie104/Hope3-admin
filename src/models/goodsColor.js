import { message } from 'antd';
import { detail, update } from '../services/goodsColor';

export default {
    namespace: 'goodsColor',
    state: {
        detail: null,
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
    },
    reducers: {
        setDetail(state, { payload }) {
            if (payload) {
                return {
                    ...state,
                    detail: payload.goodsColor,
                };
            }
            return {
                ...state,
                detail: null,
            };
        },
    },
};
