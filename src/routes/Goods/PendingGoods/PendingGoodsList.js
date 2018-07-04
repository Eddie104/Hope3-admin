import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Select, Spin } from 'antd';
import PendingGoodsTable from './PendingGoodsTable';
import NewGoodsTypeModal from './NewGoodsTypeModal';
import ConnectGoodsTypeModal from './ConnectGoodsTypeModal';
// import Ellipsis from '../../../components/Ellipsis';
import MyCheckbox from '../../../components/MyCheckbox';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { Option } = Select;

const FIELDS = {
    name: 1,
    id: 1,
};

@connect(state => ({
    pendingGoods: state.pendingGoods,
}))
@Form.create()
export default class PendingGoodsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowingNewGoodsTypeModal: false,
            isShowingConnectGoodsTypeModal: false,
            targetPendingGoods: null,
            isShowingSpin: false,
        };
    }

    componentDidMount() {
        const { pendingGoods: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            only_pending: findFormValue.only_pending,
            is_deleted: findFormValue.is_deleted,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, pendingGoods: { findFormValue } } = this.props;
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
            type: 'pendingGoods/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'pendingGoods/find',
            payload: {
                fields: FIELDS,
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleOnlyPendingChange = ({ target: { checked } }) => {
        this.props.dispatch({
            type: 'pendingGoods/setFormValueOnlyPending',
            payload: {
                only_pending: checked,
            },
        });
    }

    handleIsDelected = (val) => {
        this.props.dispatch({
            type: 'pendingGoods/setFormValueIs',
            payload: {
                is_deleted: val,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, pendingGoods: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'pendingGoods/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    handleNewGoodsType = (pendingGoods) => {
        this.setState({
            isShowingNewGoodsTypeModal: true,
            targetPendingGoods: pendingGoods,
        });
    }

    handleNewGoodsTypeOK = (pendingGoods) => {
        this.props.dispatch({
            type: 'pendingGoods/addGoodsType',
            payload: pendingGoods,
            callback: () => {
                this.setState({
                    isShowingNewGoodsTypeModal: false,
                });
            },
        });
    }

    handleNewGoodsTypeCancel = () => {
        this.setState({
            isShowingNewGoodsTypeModal: false,
        });
    }

    handleConnectGoodsType = (pendingGoods) => {
        this.setState({
            isShowingConnectGoodsTypeModal: true,
            targetPendingGoods: pendingGoods,
        });
    }

    handleConnectGoodsTypeOK = (goodsTypeId) => {
        this.props.dispatch({
            type: 'pendingGoods/connectGoodsType',
            payload: {
                ...this.state.targetPendingGoods,
                goods_type_id: goodsTypeId,
            },
            callback: () => {
                this.setState({
                    isShowingConnectGoodsTypeModal: false,
                });
            },
        });
    }

    handleConnectGoodsTypeCancel = () => {
        this.setState({
            isShowingConnectGoodsTypeModal: false,
        });
    }

    handleAutoConnectByNumber = () => {
        this.setState({ isShowingSpin: true }, () => {
            this.props.dispatch({
                type: 'pendingGoods/autoConnectByNumber',
                callback: () => {
                    this.setState({ isShowingSpin: false });
                },
            });
        });
    }

    handleAutoConnectByName = () => {
        this.setState({ isShowingSpin: true }, () => {
            this.props.dispatch({
                type: 'pendingGoods/autoConnectByName',
                callback: () => {
                    this.setState({ isShowingSpin: false });
                },
            });
        });
    }

    handleDeletePendingGoods = (pendingGoods) => {
        this.props.dispatch({
            type: 'pendingGoods/delete',
            payload: pendingGoods._id,
        });
    }

    renderForm() {
        const { form: { getFieldDecorator }, pendingGoods: { listData: { platform } } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入商品名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="商品平台">
                            {getFieldDecorator('platform', {
                                initialValue: 'all',
                            })(
                                <Select>
                                    <Option key="all" value="all">
                                        所有平台
                                    </Option>
                                    {
                                        platform.map(item => (
                                            <Option key={item.name} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                        <FormItem label="只显示未处理商品">
                            {getFieldDecorator('only_pending')(
                                <MyCheckbox onChange={this.handleOnlyPendingChange} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                        <FormItem>
                            {getFieldDecorator('is_deleted')(
                                <Select onChange={this.handleIsDelected}>
                                    <Option value={0}>
                                        所有商品
                                    </Option>
                                    <Option value={1}>
                                        垃圾商品
                                    </Option>
                                    <Option value={2}>
                                        非垃圾商品
                                    </Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
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
        const { isShowingNewGoodsTypeModal, isShowingConnectGoodsTypeModal, targetPendingGoods, isShowingSpin } = this.state;
        const { pendingGoods: { loading, listData, brands, category, subCategory }, dispatch } = this.props;
        return (
            <PageHeaderLayout>
                <Spin spinning={isShowingSpin} tip="自动关联中，请稍候。。。">
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                {this.renderForm()}
                            </div>
                            <div className={styles.tableListOperator}>
                                <Button type="primary" onClick={this.handleAutoConnectByName}>
                                    relation by name
                                </Button>
                                <Button type="primary" onClick={this.handleAutoConnectByNumber}>
                                    relation by number
                                </Button>
                            </div>
                            <PendingGoodsTable
                                loading={loading}
                                data={listData}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                                onNewGoodsType={this.handleNewGoodsType}
                                onConnectGoodsType={this.handleConnectGoodsType}
                                onDeletePendingGoods={this.handleDeletePendingGoods}
                            />
                        </div>
                    </Card>
                </Spin>
                <NewGoodsTypeModal
                    visible={isShowingNewGoodsTypeModal}
                    pendingGoods={targetPendingGoods}
                    dispatch={dispatch}
                    brands={brands}
                    category={category}
                    subCategory={subCategory}
                    handleOk={this.handleNewGoodsTypeOK}
                    handleCancel={this.handleNewGoodsTypeCancel}
                />
                <ConnectGoodsTypeModal
                    visible={isShowingConnectGoodsTypeModal}
                    pendingGoods={targetPendingGoods}
                    dispatch={dispatch}
                    // category={category}
                    // subCategory={subCategory}
                    handleOk={this.handleConnectGoodsTypeOK}
                    handleCancel={this.handleConnectGoodsTypeCancel}
                />
            </PageHeaderLayout>
        );
    }
}
