import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal } from 'antd';
import BrandTable from './BrandTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
    brand: state.brand,
}))
@Form.create()
export default class BrandList extends PureComponent {
    state = {
        addInputValue: '',
        modalVisible: false,
    };

    componentDidMount() {
        const { brand: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
        });
        this.handleSearch();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'brand/clearDetail',
        });
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, brand: { findFormValue } } = this.props;

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
            type: 'brand/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'brand/find',
            payload: {
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, brand: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'brand/find',
                payload: {
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    }

    handleAddInput = (e) => {
        this.setState({
            addInputValue: e.target.value,
        });
    }

    handleAdd = () => {
        this.props.dispatch({
            type: 'brand/add',
            payload: {
                name: this.state.addInputValue,
            },
            callback: () => {
                this.setState({
                    modalVisible: false,
                });
            },
        });
    }

    handleRemove = (id) => {
        this.props.dispatch({
            type: 'brand/remove',
            payload: {
                id,
            },
        });
    }

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="品牌名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入品牌名称" />
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
        const { modalVisible, addInputValue } = this.state;
        const { brand: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                        </div>
                        <BrandTable
                            loading={loading}
                            data={listData}
                            onChange={this.handleStandardTableChange}
                            onRemove={this.handleRemove}
                        />
                    </div>
                </Card>
                <Modal
                    title="新建品牌"
                    visible={modalVisible}
                    onOk={this.handleAdd}
                    onCancel={() => this.handleModalVisible()}
                >
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="品牌名称"
                    >
                        <Input placeholder="请输入" onChange={this.handleAddInput} value={addInputValue} />
                    </FormItem>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
