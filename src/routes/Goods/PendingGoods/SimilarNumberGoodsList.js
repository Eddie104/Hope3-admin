import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import SimilarNumberGoodsTable from './SimilarNumberGoodsTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    id: 1,
};

/**
 * 相似number的待处理商品
 */
@connect(state => ({
    similarNumberGoods: state.similarNumberGoods,
}))
@Form.create()
export default class SimilarNumberGoodsList extends PureComponent {
    state = { };
    componentDidMount() {
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch } = this.props;
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            page: pagination.current,
            count: pagination.pageSize,
            ...filters,
        };
        dispatch({
            type: 'similarNumberGoods/find',
            payload: params,
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, similarNumberGoods: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'similarNumberGoods/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    render() {
        const { similarNumberGoods: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <SimilarNumberGoodsTable
                        loading={loading}
                        data={listData}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                        onAddGoodsType={this.handleShowAddGoodsType}
                        onRelationGoodsType={this.handleShowRelationGoodsType}
                    />
                </Card>
            </PageHeaderLayout>
        );
    }
}
