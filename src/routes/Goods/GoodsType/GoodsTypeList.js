import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Alert, Modal, Radio } from 'antd';
import GoodsTypeTable from './GoodsTypeTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    id: 1,
    img: 1,
};

@connect(state => ({
    goodsType: state.goodsType,
}))
@Form.create()
export default class GoodsTypeList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            mergeGoodsTypeModalVisible: false,
            mergeTargetGoodsType: null,
        };
    }

    componentDidMount() {
        const { goodsType: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, goodsType: { findFormValue } } = this.props;
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
            fields: FIELDS,
        };
        dispatch({
            type: 'goodsType/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'goodsType/find',
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
        const { dispatch, form, goodsType: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'goodsType/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    handleSelectRows = (selectedRows) => {
        this.setState({ selectedRows });
    }

    handleMergeSelectedGoodsType = () => {
        this.setState({ mergeGoodsTypeModalVisible: true });
    }

    handleMergeGoodsType = () => {
        const { mergeTargetGoodsType, selectedRows } = this.state;
        this.props.dispatch({
            type: 'goodsType/merge',
            payload: {
                mergeTargetGoodsType,
                goodsTypeArr: selectedRows.map(item => item._id),
            },
            callback: () => {
                this.setState({ mergeGoodsTypeModalVisible: false, selectedRows: [] });
            },
        });
    }

    handleMergeTargetGoodsTypeChange = ({ target: { value } }) => {
        this.setState({ mergeTargetGoodsType: value });
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
        const { selectedRows, mergeGoodsTypeModalVisible } = this.state;
        const { goodsType: { loading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        {
                            selectedRows.length > 1 && (
                                <div className={styles.tableAlert}>
                                    <Alert
                                        message={
                                            <Fragment>
                                                <a onClick={this.handleMergeSelectedGoodsType}>
                                                    合并
                                                </a>
                                            </Fragment>
                                        }
                                        type="info"
                                        showIcon
                                    />
                                </div>
                            )
                        }
                        <GoodsTypeTable
                            loading={loading}
                            data={listData}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <Modal
                    title="合并款型"
                    visible={mergeGoodsTypeModalVisible}
                    onOk={this.handleMergeGoodsType}
                    onCancel={() => { this.setState({ mergeGoodsTypeModalVisible: false }); }}
                >
                    <RadioGroup onChange={this.handleMergeTargetGoodsTypeChange} value={this.state.mergeTargetGoodsType}>
                        {
                            selectedRows.map(goodsType => (
                                <Radio
                                    key={goodsType.id}
                                    style={{
                                        display: 'block',
                                        height: '30px',
                                        lineHeight: '30px',
                                    }}
                                    value={goodsType._id}
                                >
                                    {goodsType.name}
                                </Radio>
                            ))
                        }
                    </RadioGroup>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
