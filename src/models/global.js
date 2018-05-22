import { queryNotices } from '../services/api';

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        notices: [],
        fetchingNotices: false,
    },

    effects: {
        *fetchNotices(_, { call, put }) {
            yield put({
                type: 'changeNoticeLoading',
                payload: true,
            });
            const data = yield call(queryNotices);
            yield put({
                type: 'saveNotices',
                payload: data,
            });
            yield put({
                type: 'user/changeNotifyCount',
                payload: data.length,
            });
        },
        *clearNotices({ payload }, { put, select }) {
            yield put({
                type: 'saveClearedNotices',
                payload,
            });
            const count = yield select(state => state.global.notices.length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: count,
            });
        },
        // *checkOAuthError({ payload }, { put }) {
        //     if (payload.response && payload.response.json) {
        //         const responseJson = yield payload.response.json();
        //         /*
        //             error: "invalid_token"
        //             error_description: "Invalid token: access token has expired"
        //         */
        //         if (responseJson.error === 'invalid_token') {
        //             message.error('access token 已过期');
        //             // 跳转到登录页面
        //             yield put(routerRedux.push('/user/login'));
        //         } else if (responseJson.error === 'invalid_client') {
        //             message.error('不合法的client ID');
        //             // 跳转到登录页面
        //             yield put(routerRedux.push('/user/login'));
        //         }
        //     }
        // },
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        saveNotices(state, { payload }) {
            return {
                ...state,
                notices: payload,
                fetchingNotices: false,
            };
        },
        saveClearedNotices(state, { payload }) {
            return {
                ...state,
                notices: state.notices.filter(item => item.type !== payload),
            };
        },
        changeNoticeLoading(state, { payload }) {
            return {
                ...state,
                fetchingNotices: payload,
            };
        },
    },

    subscriptions: {
        setup({ history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },
    },
};
