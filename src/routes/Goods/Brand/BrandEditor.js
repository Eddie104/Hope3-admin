import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Card, Button, Input, Form, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
// import Ellipsis from '../../../components/Ellipsis';
import FooterToolbar from '../../../components/FooterToolbar';
// import DescriptionList from '../../../components/DescriptionList';
import SeriesTableForm from './SeriesTableForm';
// import styles from '../../style.less';
const { TextArea } = Input;

@connect(state => ({
    brand: state.brand,
}))
@Form.create()
export default class BrandEditor extends Component {
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'brand/detail',
            payload: id,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, brand: { detail } } = nextProps;
        if (detail._id !== this.props.brand.detail._id) {
            setFieldsValue({
                name: detail.name,
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'brand/clearDetail',
        });
    }

    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, brand: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'brand/update',
                    payload: {
                        ...values,
                        id: detail._id,
                    },
                });
            }
        });
    }

    render() {
        const { form: { getFieldDecorator }, brand: { detail } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label="品牌名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入品牌名称' }],
                            })(
                                <TextArea placeholder="请输入品牌名称" rows={2} />
                            )}
                        </Form.Item>
                    </Form>
                    {getFieldDecorator('series', {
                        initialValue: detail.series || [],
                    })(<SeriesTableForm />)}
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
