import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import SubCategoryTableForm from './SubCategoryTableForm';
@connect(state => ({
    category: state.category,
}))
@Form.create()
export default class CategoryEditor extends Component {
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'category/detail',
            payload: id,
        });
    }
    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, category: { detail } } = nextProps;
        if (detail._id !== this.props.category.detail._id || detail.sub_category.length !== this.props.category.detail.sub_category.length) {
            setFieldsValue({
                name: detail.name,
                sub_category: detail.sub_category,
            });
        }
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'category/clearDetail',
        });
    }
    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, category: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'category/update',
                    payload: {
                        ...values,
                        _id: detail._id,
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
        const { form: { getFieldDecorator }, category: { detail } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            {
                                this.renderFormItem(
                                    '类目名称',
                                    'name',
                                    [{ required: true, message: '请输入类目名称' }],
                                    <Input placeholder="请输入类目名称" />,
                                    true
                                )
                            }
                        </Row>
                        <Card bordered={false}>
                            {getFieldDecorator('sub_category', {
                                initialValue: detail.sub_category ? detail.sub_category.map((item) => { item.key = item._id; return item; }) : [],
                            })(<SubCategoryTableForm />)}
                        </Card>
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
