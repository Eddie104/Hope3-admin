import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import GoodsTable from './GoodsTable';
import RelationGoodsTypeModal from './RelationGoodsTypeModal';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    type: 1,
    type_checked: 1,
};

@connect(state => ({
    goods: state.goods,
}))
@Form.create()
export default class GoodsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 需要编辑的商品对象
            goods: null,
        };
    }

    componentDidMount() {
        const { goods: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            onlyShowNoGoodsType: findFormValue.onlyShowNoGoodsType,
        });
        this.handleSearch();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goods/clearDetail',
        });
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, goods: { findFormValue } } = this.props;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            fields: FIELDS,
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

    handleGoodsTypeModalVisible = (flag, goods) => {
        const visible = !!flag;
        if (goods) {
            this.setState({ goods });
        }
        this.props.dispatch({
            type: 'goods/changeRelationGoodsTypeModalVisible',
            payload: {
                visible,
                params: {
                    // name,
                    fields: { _id: 1, name: 1 },
                    page: 1,
                    count: 18,
                },
            },
        });
    }

    handleUpdateGoodsTypeChecked = (id) => {
        this.props.dispatch({
            type: 'goods/updateGoodsTypeChecked',
            payload: id,
        });
    }

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入商品名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="只显示未匹配款型的">
                            {getFieldDecorator('onlyShowNoGoodsType')(
                                <Checkbox onChange={this.handleHasGoodsTypeChange} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
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
        const { goods } = this.state;
        const { goods: { loading, listData, relationGoodsTypeModalVisible, goodsTypeData } } = this.props;
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
                            handleGoodsTypeModalVisible={this.handleGoodsTypeModalVisible}
                            handleUpdateGoodsTypeChecked={this.handleUpdateGoodsTypeChecked}
                        />
                    </div>
                </Card>
                {
                    goods && (
                        <RelationGoodsTypeModal
                            dispatch={this.props.dispatch}
                            visible={relationGoodsTypeModalVisible}
                            goods={goods}
                            goodsType={goods.type}
                            goodsTypeData={goodsTypeData}
                        />
                    )
                }
            </PageHeaderLayout>
        );
    }
}
