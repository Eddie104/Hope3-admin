import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { find, detail, fetchSubCategory, update, merge, mergeGoodsColor, removeGoodsColor } from '../services/goodsType';
import { changeGoodsType } from '../services/goodsColor';

export default {
    namespace: 'goodsType',
    state: {
        loading: false,
        findFormValue: {
            name: null,
            key1: null,
            key2: null,
            gender: -1,
            category: -1,
            subCategory: -1,
            brand: -1,
            series: -1,
        },
        listData: {
            list: [],
            pagination: {
                total: 0,
                current: 0,
                pageSizeOptions: ['10', '20', '30', '40', '300'],
            },
        },
        goodsColorArr: [],
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
                    key1: payload.key1,
                    key2: payload.key2,
                    gender: payload.gender,
                    category: payload.category,
                    subCategory: payload.subCategory,
                    brand: payload.brand,
                    series: payload.series,
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
        *update({ payload, callback }, { call }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
                callback && callback();
            }
        },
        *updateGoodsColor({ payload, callback }, { put }) {
            yield put({
                type: 'updateGoodsColorById',
                payload,
            });
            callback && callback();
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: null,
            });
        },
        *merge({ payload, callback }, { call, put }) {
            const response = yield call(merge, payload);
            if (response.success) {
                yield put({
                    type: 'mergeGoodsType',
                    payload,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *mergeGoodsColor({ payload, callback }, { call, put }) {
            const response = yield call(mergeGoodsColor, payload);
            if (response.success) {
                yield put({
                    type: 'mergeGoodsColor',
                    payload,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *navToGoodsColor({ payload }, { put }) {
            yield put(routerRedux.push(`/goods/goods-color-editor/${payload}`));
        },
        *removeGoodsColor({ payload, callback }, { call, put }) {
            const response = yield call(removeGoodsColor, payload.id, payload.goodsColorId);
            if (response.success) {
                yield put({
                    type: 'removeGoodsColorById',
                    payload: payload.goodsColorId,
                });
                message.success('删除成功');
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *changeGoodsType({ payload, callback }, { call, put }) {
            const response = yield call(changeGoodsType, payload);
            if (response.success) {
                yield put({
                    type: 'removedGoodsColor',
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
        setListData(state, { payload }) {
            const list = [...payload.listData.list];
            let findSeriesNmae = false;
            for (let i = 0; i < list.length; i++) {
                findSeriesNmae = false;
                for (let j = 0; j < payload.brands.length; j++) {
                    for (let k = 0; k < payload.brands[j].series.length; k++) {
                        if (payload.brands[j].series[k]._id === list[i].series) {
                            list[i].seriesName = payload.brands[j].series[k].name;
                            findSeriesNmae = true;
                            break;
                        }
                    }
                    if (findSeriesNmae) {
                        break;
                    }
                }
                for (let j = 0; j < payload.subCategory.length; j++) {
                    if (payload.subCategory[j]._id === list[i].sub_category) {
                        list[i].subCategory = payload.subCategory[j].name;
                        break;
                    }
                }
            }
            return {
                ...state,
                listData: {
                    list,
                    pagination: {
                        ...payload.listData.pagination,
                        pageSizeOptions: ['10', '20', '30', '40', '300'],
                    },
                },
                category: payload.category,
                brands: payload.brands,
                subCategory: payload.subCategory,
            };
        },
        resetedFormValue(state) {
            return {
                ...state,
                findFormValue: {
                    name: null,
                    key1: null,
                    key2: null,
                    gender: -1,
                    category: -1,
                    subCategory: -1,
                    brand: -1,
                    series: -1,
                },
            };
        },
        setDetail(state, { payload }) {
            const sortFun = (a, b) => a.hot_degree < b.hot_degree;
            if (payload) {
                return {
                    ...state,
                    detail: payload.goodsType,
                    goodsColorArr: payload.goodsColorArr.sort(sortFun),
                    brands: payload.brands,
                    category: payload.category,
                };
            }
            return {
                ...state,
                goodsColorArr: [],
                detail: null,
                brands: [],
                category: [],
                subCategory: [],
            };
        },
        setSubCategory(state, { payload }) {
            return {
                ...state,
                subCategory: payload,
            };
        },
        updateGoodsColorById(state, { payload }) {
            const goodsColorArr = [...state.goodsColorArr];
            for (let i = 0; i < goodsColorArr.length; i += 1) {
                if (goodsColorArr[i]._id === payload._id) {
                    goodsColorArr[i] = payload;
                    break;
                }
            }
            return {
                ...state,
                goodsColorArr,
            };
        },
        mergeGoodsType(state, { payload }) {
            const {
                mergeTargetGoodsType,
                goodsTypeArr,
            } = payload;
            const list = [...state.listData.list];
            let i = list.length;
            while (--i > -1) {
                if (list[i]._id !== mergeTargetGoodsType) {
                    if (goodsTypeArr.includes(list[i]._id)) {
                        list.splice(i, 1);
                    }
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
        mergeGoodsColor(state, { payload }) {
            const {
                mergeTargetGoodsColor,
                goodsColorArr,
            } = payload;
            const newGoodsColorArr = [...state.goodsColorArr];
            let i = newGoodsColorArr.length;
            while (--i > -1) {
                if (newGoodsColorArr[i]._id !== mergeTargetGoodsColor) {
                    if (goodsColorArr.includes(newGoodsColorArr[i]._id)) {
                        newGoodsColorArr.splice(i, 1);
                    }
                }
            }
            return {
                ...state,
                goodsColorArr: newGoodsColorArr,
            };
        },
        removeGoodsColorById(state, { payload }) {
            const goodsColorArr = [...state.goodsColorArr];
            for (let i = 0; i < goodsColorArr.length; i++) {
                if (goodsColorArr[i]._id === payload) {
                    goodsColorArr.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                goodsColorArr,
            };
        },
        removedGoodsColor(state, { payload: { goodsColorIDArr } }) {
            const goodsColorArr = [...state.goodsColorArr].filter(goodsColor => !goodsColorIDArr.includes(goodsColor._id));
            return {
                ...state,
                goodsColorArr,
            };
        },
    },
};
