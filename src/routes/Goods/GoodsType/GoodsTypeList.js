import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Alert, Modal, Radio, Select, message } from 'antd';
import GoodsTypeTable from './GoodsTypeTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { GENDER } from '../../../config';

import styles from '../../style.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
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
            series: [],
        };
    }

    componentDidMount() {
        const { goodsType: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            key1: findFormValue.key1,
            key2: findFormValue.key2,
            gender: findFormValue.gender,
            category: findFormValue.category,
            subCategory: findFormValue.subCategory,
            brand: findFormValue.brand,
            series: findFormValue.series,
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
        if (mergeTargetGoodsType) {
            this.props.dispatch({
                type: 'goodsType/merge',
                payload: {
                    mergeTargetGoodsType,
                    goodsTypeArr: selectedRows.map(item => item._id),
                },
                callback: () => {
                    this.setState({ mergeGoodsTypeModalVisible: false, selectedRows: [], mergeTargetGoodsType: null });
                    this.table.cleanSelectedKeys();
                },
            });
        } else {
            message.error('请先选择一个保留的款型！');
        }
    }

    handleMergeTargetGoodsTypeChange = ({ target: { value } }) => {
        this.setState({ mergeTargetGoodsType: value });
    }

    handleCategoryChange = (value) => {
        // 根据主分类获取次分类
        this.props.dispatch({
            type: 'goodsType/fetchSubCategory',
            payload: value,
        });
    }

    handleBrandChange = (value) => {
        const { goodsType: { brands } } = this.props;
        let targetBrand = null;
        for (let i = 0; i < brands.length; i += 1) {
            if (brands[i]._id === value) {
                targetBrand = brands[i];
                break;
            }
        }
        if (targetBrand) {
            this.setState({
                series: targetBrand.series,
            });
            const { form: { setFieldsValue } } = this.props;
            setFieldsValue({
                series: -1,
            });
        }
    }

    renderForm() {
        const { series } = this.state;
        const { form: { getFieldDecorator }, goodsType: { category, subCategory, brands } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col span={6}>
                        <FormItem label="分类">
                            {getFieldDecorator('category')(
                                <Select style={{ width: '100%' }} onChange={this.handleCategoryChange}>
                                    <Option value={-1} key={-1}>
                                        所有
                                    </Option>
                                    <Option value={0} key={0}>
                                        未设置
                                    </Option>
                                    {
                                        category.map((c, i) => (
                                            <Option key={i} value={c._id}>{c.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="子分类">
                            {getFieldDecorator('subCategory')(
                                <Select style={{ width: '100%' }}>
                                    <Option value={-1} key={-1}>
                                        所有
                                    </Option>
                                    <Option value={0} key={0}>
                                        未设置
                                    </Option>
                                    {
                                        subCategory.map((c, i) => (
                                            <Option value={c._id} key={i}>
                                                { c.name }
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="品牌">
                            {getFieldDecorator('brand')(
                                <Select style={{ width: '100%' }} onChange={this.handleBrandChange}>
                                    <Option value={-1} key={-1}>
                                        所有
                                    </Option>
                                    <Option value={0} key={0}>
                                        未设置
                                    </Option>
                                    {
                                        brands.map(brand => (
                                            <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="系列">
                            {getFieldDecorator('series')(
                                <Select style={{ width: '100%' }}>
                                    <Option value={-1} key={-1}>
                                        所有
                                    </Option>
                                    <Option value={0} key={0}>
                                        未设置
                                    </Option>
                                    {
                                        series.map(seriesItem => (
                                            <Option key={seriesItem._id} value={seriesItem._id}>{seriesItem.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col span={6}>
                        <FormItem label="名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="款型名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="关键词1">
                            {getFieldDecorator('key1')(
                                <Input placeholder="关键词1" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="关键词2">
                            {getFieldDecorator('key2')(
                                <Input placeholder="关键词2" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="性别">
                            {getFieldDecorator('gender')(
                                <Select style={{ width: '100%' }}>
                                    <Option value={-1} key={-1}>
                                        所有
                                    </Option>
                                    <Option value={-2} key={-2}>
                                        未设置
                                    </Option>
                                    {
                                        GENDER.map((g, i) => (
                                            <Option value={i} key={i}>
                                                { g }
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="end">
                    <span className={styles.submitButtons}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                    </span>
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
                            ref={(c) => { this.table = c; }}
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
