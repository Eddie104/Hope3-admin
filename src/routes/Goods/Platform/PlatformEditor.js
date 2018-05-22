import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Button, Table, Input, Form, Row, Col, Tabs, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
// import ShopTable from '../Shop/ShopTable';
// import Ellipsis from '../../../components/Ellipsis';
import FooterToolbar from '../../../components/FooterToolbar';
// import SubscribeTableForm from './SubscribeTableForm';

// const { Option } = Select;
// const TabPane = Tabs.TabPane;

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
            // 获取shop列表
            this.props.dispatch({
                type: 'platform/findShop',
                payload: {
                    platform: detail._id,
                    page: 1,
                    count: 10,
                },
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
                // utils.cleanObject(values);
                // utils.cleanObject(values.condition);
                // console.log(values);
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

    renderFormItem = (label, field, rules, Component, isFirst = false) => {
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
        // const { brandSeriesSource } = this.state;
        const { form: { getFieldDecorator }, platform: { detail, shopListData } } = this.props;
        // console.log(detail);
        // console.log(listData);
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
                    {/* <Divider /> */}
                    {/* <Card title="商铺列表" >
                        <ShopTable
                            loading={false}
                            data={shopListData}
                            onChange={this.handleStandardTableChange}
                        />
                    </Card> */}
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
