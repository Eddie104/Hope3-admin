import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import NaiFenTable from './NaiFenTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
    naifen: state.naifen,
}))
@Form.create()
export default class NaiFenList extends PureComponent {
    componentDidMount() {
        const { naifen: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
        });
        this.handleSearch();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'naifen/clearDetail',
        });
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, naifen: { findFormValue } } = this.props;

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
            type: 'naifen/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'naifen/find',
            payload: {
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, naifen: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'naifen/find',
                payload: {
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    // handleRemove = (id) => {
    //     this.props.dispatch({
    //         type: 'naifen/remove',
    //         payload: {
    //             id,
    //         },
    //     });
    // }

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
        const { naifen: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <NaiFenTable
                            loading={loading}
                            data={listData}
                            onChange={this.handleStandardTableChange}
                            onRemove={this.handleRemove}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
