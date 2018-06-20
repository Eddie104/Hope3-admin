import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, Divider, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import GoodsTable from '../Goods/GoodsTable';
// import SKUTableForm from './SKUTableForm';
import { IMG_SERVER } from '../../../config';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
    goodsColor: state.goodsColor,
}))
@Form.create()
export default class GoodsColorEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmiting: false,
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goodsColor/detail',
            payload: {
                _id: id,
                page: 1,
                count: 10,
            },
            callback: () => {
                const { form: { setFieldsValue }, goodsColor: { detail } } = this.props;
                console.log(detail);
                setFieldsValue({
                    color_name: detail.color_name,
                    color_value: detail.color_value,
                    number: detail.number.join(','),
                });
            },
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goodsColor/clearDetail',
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
            page: pagination.current,
            count: pagination.pageSize,
            ...findFormValue,
            ...filters,
        };
        dispatch({
            type: 'goodsColor/detail',
            payload: params,
        });
    }

    handleSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, goodsColor: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                this.setState({ isSubmiting: true }, () => {
                    values.number = values.number.split(',');
                    dispatch({
                        type: 'goodsColor/update',
                        payload: {
                            ...values,
                            _id: detail._id,
                        },
                        callback: () => {
                            this.setState({ isSubmiting: false });
                        },
                    });
                });
            }
        });
    }

    render() {
        const { isSubmiting } = this.state;
        const { form: { getFieldDecorator }, goodsColor: { detail, goodsListData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Divider>基本信息</Divider>
                    <Form style={{ width: '100%' }}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={6}>
                                <Form.Item label="颜色名称">
                                    {getFieldDecorator('color_name')(
                                        <Input style={{ width: '100%' }} placeholder="请输入颜色名称" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={6}>
                                <Form.Item label="颜色值">
                                    {getFieldDecorator('color_value')(
                                        <Input style={{ width: '100%' }} placeholder="请输入颜色值" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={6}>
                                <Form.Item label="编号">
                                    {getFieldDecorator('number')(
                                        <Input style={{ width: '100%' }} placeholder="请输入编号" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={6}>
                                <Form.Item
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 15 }}
                                    label="图片"
                                >
                                    {
                                        detail && detail.img && (
                                            <img
                                                alt={detail.img}
                                                src={`${IMG_SERVER}/${detail.img}`}
                                                style={{ width: '120px' }}
                                            />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider>关联商品</Divider>
                    <GoodsTable
                        loading={false}
                        data={goodsListData}
                        // onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />
                    {/* <Divider>SKU</Divider>
                    {
                        detail && Array.isArray(detail.sku) && getFieldDecorator('sku', {
                            initialValue: detail.sku.map((item) => { item.key = item._id; return item; }),
                        })(<SKUTableForm />)
                    } */}
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handleSubmit} loading={isSubmiting}>
                            提交
                        </Button>
                    </FooterToolbar>
                </Card>
            </PageHeaderLayout>
        );
    }
}
