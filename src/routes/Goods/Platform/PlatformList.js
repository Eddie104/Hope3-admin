import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Icon, Button, Modal } from 'antd';
import PlatformTable from './PlatformTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    domain: 1,
};

@connect(state => ({
    platform: state.platform,
}))
@Form.create()
export default class PlatformList extends PureComponent {
    state = {
        addNameInputValue: '',
        addDomainInputValue: '',
    };

    componentDidMount() {
        const { platform: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch, platform: { findFormValue } } = this.props;

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
            type: 'platform/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'platform/find',
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
        const { dispatch, form, platform: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'platform/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    handleModalVisible = (flag) => {
        this.props.dispatch({
            type: 'platform/changeModalVisible',
            payload: !!flag,
        });
    }

    handleAddNameInput = (e) => {
        this.setState({
            addNameInputValue: e.target.value,
        });
    }

    handleAddDomainInput = (e) => {
        this.setState({
            addDomainInputValue: e.target.value,
        });
    }

    handleAdd = () => {
        this.props.dispatch({
            type: 'platform/add',
            payload: {
                name: this.state.addNameInputValue,
                domain: this.state.addDomainInputValue,
            },
        });
    }

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="平台名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入平台名称" />
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

    renderForm() {
        return this.renderSimpleForm();
    }

    render() {
        const { platform: { loading, listData, modalVisible } } = this.props;
        const { addNameInputValue, addDomainInputValue } = this.state;
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
                        <PlatformTable
                            loading={loading}
                            data={listData}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <Modal
                    title="新建平台"
                    visible={modalVisible}
                    onOk={this.handleAdd}
                    onCancel={() => this.handleModalVisible()}
                >
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="平台名称"
                    >
                        <Input placeholder="请输入" onChange={this.handleAddNameInput} value={addNameInputValue} />
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="平台域名"
                    >
                        <Input placeholder="请输入" onChange={this.handleAddDomainInput} value={addDomainInputValue} />
                    </FormItem>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
