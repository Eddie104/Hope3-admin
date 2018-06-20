import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import GoodsTable from './GoodsTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    id: 1,
    url: 1,
};

@connect(state => ({
    goods: state.goods,
}))
@Form.create()
export default class GoodsList extends PureComponent {
    componentDidMount() {
        const { goods: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, goods: { findFormValue } } = this.props;
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            page: pagination.current,
            count: pagination.pageSize,
            ...findFormValue,
            ...filters,
        };
        dispatch({
            type: 'goods/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'goods/find',
            payload: {
                fields: FIELDS,
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, goods: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'goods/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    renderForm() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={18} sm={24}>
                        <FormItem label="款型名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入款型名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { goods: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <GoodsTable
                            loading={loading}
                            data={listData}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
