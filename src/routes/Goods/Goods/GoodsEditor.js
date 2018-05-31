import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, Select, Divider, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import SKUTableForm from './SKUTableForm';
import { IMG_SERVER } from '../../../config';

const { Option } = Select;

@connect(state => ({
    goods: state.goods,
}))
@Form.create()
export default class GoodsEditor extends Component {
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goods/detail',
            payload: id,
            callback: () => {
                const { form: { setFieldsValue }, goods: { detail } } = this.props;
                setFieldsValue({
                    name: detail.name,
                    platform_id: detail.platform_id,
                    number: detail.number,
                    url: detail.url,
                });
            },
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goods/clearDetail',
        });
    }

    handleSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, goods: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'goods/update',
                    payload: {
                        ...values,
                        _id: detail._id,
                    },
                });
            }
        });
    }

    render() {
        const { form: { getFieldDecorator }, goods: { platform, detail } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Divider>基本信息</Divider>
                    <Form style={{ width: '100%' }}>
                        {
                            detail && Array.isArray(detail.imgs) && (
                                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                    <Form.Item label="图片">
                                        <a
                                            target="_blank"
                                            href={detail.url}
                                        >
                                            <img style={{ width: '200px' }} alt={detail.name} src={`${IMG_SERVER}/${detail.imgs[0]}`} />
                                        </a>
                                    </Form.Item>
                                </Row>
                            )
                        }
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Form.Item label="名称">
                                {getFieldDecorator('name')(
                                    <Input style={{ width: '100%' }} placeholder="请输入名称" />
                                )}
                            </Form.Item>
                        </Row>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8}>
                                <Form.Item label="平台">
                                    {getFieldDecorator('platform_id')(
                                        <Select style={{ width: '100%' }} placeholder="请输入平台">
                                            {
                                                platform.map(item => (
                                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8}>
                                <Form.Item label="编号">
                                    {getFieldDecorator('number')(
                                        <Input style={{ width: '100%' }} placeholder="请输入编号" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8}>
                                <Form.Item label="URL">
                                    {getFieldDecorator('url')(
                                        <Input disabled style={{ width: '100%' }} placeholder="请输入URL" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider>SKU</Divider>
                    {
                        detail && Array.isArray(detail.sku) && getFieldDecorator('sku', {
                            initialValue: detail.sku.map((item) => { item.key = item._id; return item; }),
                        })(<SKUTableForm />)
                    }
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
