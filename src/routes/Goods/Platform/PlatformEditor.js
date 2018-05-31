import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';

@connect(state => ({
    platform: state.platform,
}))
@Form.create()
export default class PlatformEditor extends Component {
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'platform/detail',
            payload: id,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, platform: { detail } } = nextProps;
        if (detail._id !== this.props.platform.detail._id) {
            setFieldsValue({
                name: detail.name,
                domain: detail.domain,
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'platform/clearDetail',
        });
    }

    handleStandardTableChange = (pagination) => {
        const { dispatch, platform: { detail } } = this.props;
        const params = {
            platform: detail._id,
            page: pagination.current,
            count: pagination.pageSize,
        };
        dispatch({
            type: 'platform/findShop',
            payload: params,
        });
    }

    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, platform: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'platform/update',
                    payload: {
                        ...values,
                        id: detail._id,
                    },
                });
            }
        });
    }

    renderFormItem = (label, field, rules, Component, isFirst = false) => { // eslint-disable-line
        let xl = { span: 6, offset: 2 };
        let lg = { span: 8 };
        let md = { span: 12 };
        const sm = 24;
        if (isFirst) {
            xl = {};
            lg = 6;
            md = 12;
        }
        const { form: { getFieldDecorator } } = this.props;
        const options = { rules };
        return (
            <Col xl={xl} lg={lg} md={md} sm={sm}>
                <Form.Item label={label}>
                    {getFieldDecorator(field, options)(
                        Component
                    )}
                </Form.Item>
            </Col>
        );
    }

    render() {
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            {
                                this.renderFormItem(
                                    '平台名称',
                                    'name',
                                    [{ required: true, message: '请输入平台名称' }],
                                    <Input placeholder="请输入平台名称" />,
                                    true
                                )
                            }
                            {
                                this.renderFormItem(
                                    '平台域名',
                                    'domain',
                                    [{ required: true, message: '请输入平台域名' }],
                                    <Input placeholder="请输入平台域名" />
                                )
                            }
                        </Row>
                    </Form>
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handlerSubmit} loading={false}>
                            提交
                        </Button>
                    </FooterToolbar>
                </Card>
            </PageHeaderLayout>
        );
    }
}
