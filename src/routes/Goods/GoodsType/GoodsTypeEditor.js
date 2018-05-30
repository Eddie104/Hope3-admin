import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, Select, Divider, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import { GENDER } from '../../../config';

const { Option } = Select;

@connect(state => ({
    goodsType: state.goodsType,
}))
@Form.create()
export default class GoodsTypeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goodsType/detail',
            payload: id,
            callback: () => {
                const { form: { setFieldsValue }, goodsType: { detail } } = this.props;
                setFieldsValue({
                    name: detail.name,
                    gender: detail.gender,
                    brand: detail.brand,
                    series: detail.series,
                });
            },
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goodsType/clearDetail',
        });
    }

    handleSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, goodsType: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'goodsType/update',
                    payload: {
                        ...values,
                        _id: detail._id,
                    },
                });
            }
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
        }
    }

    handleCategoryChange = (value) => {
        this.props.dispatch({
            type: 'goodsType/fetchSubCategory',
            payload: value,
        });
    }

    render() {
        const { series } = this.state;
        const { form: { getFieldDecorator }, goodsType: { brands, category, subCategory } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Divider>基本信息</Divider>
                    <Form style={{ width: '100%' }}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Form.Item label="款型名称">
                                {getFieldDecorator('name')(
                                    <Input style={{ width: '100%' }} placeholder="请输入款型名称" />
                                )}
                            </Form.Item>
                        </Row>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8}>
                                <Form.Item label="性別">
                                    {getFieldDecorator('gender')(
                                        <Select style={{ width: '100%' }} placeholder="请输入性別">
                                            {
                                                GENDER.map((item, i) => (
                                                    <Option key={i} value={i}>{item}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8}>
                                <Form.Item label="品牌">
                                    {getFieldDecorator('brand')(
                                        <Select style={{ width: '100%' }} placeholder="请输入品牌" onChange={this.handleBrandChange}>
                                            {
                                                brands.map(brand => (
                                                    <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8}>
                                <Form.Item label="系列">
                                    {getFieldDecorator('series')(
                                        <Select style={{ width: '100%' }} placeholder="请输入系列">
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
                            <Col md={8}>
                                <Form.Item label="類目">
                                    {getFieldDecorator('category')(
                                        <Select style={{ width: '100%' }} placeholder="请输入類目" onChange={this.handleCategoryChange}>
                                            {
                                                category.map(item => (
                                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8}>
                                <Form.Item label="子類目">
                                    {getFieldDecorator('sub_category')(
                                        <Select style={{ width: '100%' }} placeholder="请输入子類目">
                                            {
                                                subCategory.map(subCategoryItem => (
                                                    <Option key={subCategoryItem._id} value={subCategoryItem._id}>{subCategoryItem.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider>配色信息</Divider>
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handleSubmit} loading={false}>
                            提交
                        </Button>
                    </FooterToolbar>
                </Card>
            </PageHeaderLayout>
        );
    }
}
