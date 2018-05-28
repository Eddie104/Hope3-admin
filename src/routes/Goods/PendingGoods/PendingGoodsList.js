import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Select, Spin } from 'antd';
import PendingGoodsTable from './PendingGoodsTable';
// import Ellipsis from '../../../components/Ellipsis';
import MyCheckbox from '../../../components/MyCheckbox';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { Option } = Select;

const FIELDS = {
    name: 1,
    id: 1,
};

const Goods_TYPE_FIELDS = { // eslint-disable-line
    name: 1,
    imgs: 1,
};

@connect(state => ({
    pendingGoods: state.pendingGoods,
}))
@Form.create()
export default class PendingGoodsList extends PureComponent {
    componentDidMount() {
        const { pendingGoods: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            only_pending: findFormValue.only_pending,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, pendingGoods: { findFormValue } } = this.props;
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
            type: 'pendingGoods/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'pendingGoods/find',
            payload: {
                fields: FIELDS,
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleOnlyPendingChange = ({ target: { checked } }) => {
        this.props.dispatch({
            type: 'pendingGoods/setFormValueOnlyPending',
            payload: {
                only_pending: checked,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, pendingGoods: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'pendingGoods/find',
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
        const { form: { getFieldDecorator }, pendingGoods: { listData: { platform } } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入商品名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="商品平台">
                            {getFieldDecorator('platform', {
                                initialValue: 'all',
                            })(
                                <Select>
                                    <Option key="all" value="all">
                                        所有平台
                                    </Option>
                                    {
                                        platform.map(item => (
                                            <Option key={item.name} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="只显示未处理商品">
                            {getFieldDecorator('only_pending')(
                                <MyCheckbox onChange={this.handleOnlyPendingChange} />
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
        const { pendingGoods: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Spin spinning={false} tip="自动关联中，请稍候。。。">
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                {this.renderForm()}
                            </div>
                            {/* <div className={styles.tableListOperator}>
                                <Button type="primary" onClick={this.handleAutoRelation}>
                                    relation by name
                                </Button>
                                <Button type="primary" onClick={this.handleAutoRelationByNumber}>
                                    relation by number
                                </Button>
                            </div> */}
                            <PendingGoodsTable
                                loading={loading}
                                data={listData}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                            />
                        </div>
                    </Card>
                </Spin>
            </PageHeaderLayout>
        );
    }
}
