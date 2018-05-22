import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Select, List, Tooltip, Pagination, Icon, Spin } from 'antd';
import PendingGoodsTable from './PendingGoodsTable';
import Ellipsis from '../../../components/Ellipsis';
import MyCheckbox from '../../../components/MyCheckbox';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { QINIU_DOMAIN, GENDER } from '../../../config';

import styles from '../../style.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { Option } = Select;

const FIELDS = {
    name: 1,
    id: 1,
};

const Goods_TYPE_FIELDS = { // eslint-disable-line
    name: 1,
    imgs: 1,
};

@connect(state => ({
    pendingGoods: state.pendingGoods,
}))
@Form.create()
export default class PendingGoodsList extends PureComponent {
    state = {
        addGoodsTypeModalVisible: false,
        relationGoodsTypeModalVisible: false,
        goodsTypeQueryName: '',
        goodsTypeSelected: '',
        // 正在处理的“待处理商品”
        pendingGoods: null,
        series: [],
        isAutoReationing: false,
    };
    componentDidMount() {
        const { pendingGoods: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            only_pending: findFormValue.only_pending,
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

    // 关联款型
    handleShowRelationGoodsType = (pendingGoods) => {
        this.setState({
            pendingGoods,
            relationGoodsTypeModalVisible: true,
        }, () => {
            const { dispatch } = this.props;
            dispatch({
                type: 'pendingGoods/fetchGoodsType',
                payload: {
                    name: this.state.goodsTypeQueryName,
                    page: 1,
                    count: 12,
                    fields: Goods_TYPE_FIELDS,
                },
            });
        });
    }

    handleShowAddGoodsType = (pendingGoods) => {
        // 获取分类和品牌的数据，然后打开添加款型的面板
        const { dispatch } = this.props;
        dispatch({
            type: 'pendingGoods/fetchBrandAndCategory',
            callback: () => {
                this.setState({
                    pendingGoods,
                    addGoodsTypeModalVisible: true,
                });
            },
        });
    }

    handleModalVisible = (flag) => {
        this.setState({
            addGoodsTypeModalVisible: !!flag,
        });
    }

    handleGoodsTypeName = ({ target: { value } }) => {
        this.setState({
            pendingGoods: {
                ...this.state.pendingGoods,
                name: value,
            },
        });
    }

    handleCategoryChange = (value) => {
        // 根据主分类获取次分类
        this.props.dispatch({
            type: 'pendingGoods/fetchSubCategory',
            payload: value,
            callback: () => {
                this.setState({
                    pendingGoods: {
                        ...this.state.pendingGoods,
                        category: value,
                        subCategory: '',
                    },
                });
            },
        });
    }

    handleSubCategoryChange = (value) => {
        this.setState({
            pendingGoods: {
                ...this.state.pendingGoods,
                subCategory: value,
            },
        });
    }

    handleGenderChange = (value) => {
        this.setState({
            pendingGoods: {
                ...this.state.pendingGoods,
                gender: value,
            },
        });
    }

    handleBrandChange = (value) => {
        const { pendingGoods: { brands } } = this.props;
        let series = [];
        for (let i = 0; i < brands.length; i += 1) {
            if (brands[i]._id === value) {
                series = brands[i].series;
                break;
            }
        }
        this.setState({
            pendingGoods: {
                ...this.state.pendingGoods,
                brand: value,
                series: '',
            },
            series,
        });
    }

    handleSeriesChange = (value) => {
        this.setState({
            pendingGoods: {
                ...this.state.pendingGoods,
                series: value,
            },
        });
    }

    handleAddGoodsType = () => {
        this.props.dispatch({
            type: 'pendingGoods/addGoodsType',
            payload: this.state.pendingGoods,
            callback: () => {
                this.setState({
                    addGoodsTypeModalVisible: false,
                    pendingGoods: null,
                    series: [],
                });
            },
        });
    }

    handleRelationGoodsTypeModalVisible = (flag) => {
        this.setState({
            relationGoodsTypeModalVisible: !!flag,
            goodsTypeSelected: 'none',
        });
    }

    handleRelationGoodsTypeName = ({ target: { value } }) => {
        this.setState({
            goodsTypeQueryName: value,
        }, () => {
            this.props.dispatch({
                type: 'pendingGoods/fetchGoodsType',
                payload: {
                    name: value,
                    page: 1,
                    count: 12,
                    fields: Goods_TYPE_FIELDS,
                },
            });
        });
    }

    handleGoodsTypePageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'pendingGoods/fetchGoodsType',
            payload: {
                name: this.state.goodsTypeQueryName,
                page: current,
                count: pageSize,
                fields: Goods_TYPE_FIELDS,
            },
        });
    }

    handleGoodsTypeSelected = (goodsType) => {
        if (this.state.goodsTypeSelected === goodsType) {
            goodsType = 'none';
        }
        this.setState({
            goodsTypeSelected: goodsType,
        });
    }

    handleRelationGoodsType = () => {
        const { pendingGoods, goodsTypeSelected } = this.state;
        this.props.dispatch({
            type: 'pendingGoods/relationGoodsType',
            payload: {
                pendingGoods,
                goodsTypeSelected,
            },
            callback: () => {
                this.setState({
                    relationGoodsTypeModalVisible: false,
                    goodsTypeSelected: 'none',
                });
            },
        });
    }

    handleAutoRelation = () => {
        this.setState({
            isAutoReationing: true,
        });
        this.props.dispatch({
            type: 'pendingGoods/autoRelation',
            callback: () => {
                this.setState({
                    isAutoReationing: false,
                });
            },
        });
    }

    handleAutoRelationByNumber = () => {
        this.setState({
            isAutoReationing: true,
        });
        this.props.dispatch({
            type: 'pendingGoods/autoRelationByNumber',
            callback: () => {
                this.setState({
                    isAutoReationing: false,
                });
            },
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
                    <Col md={6} sm={24}>
                        <FormItem label="只显示未处理商品">
                            {getFieldDecorator('only_pending')(
                                <MyCheckbox onChange={this.handleOnlyPendingChange} />
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
        const { addGoodsTypeModalVisible, relationGoodsTypeModalVisible, goodsTypeQueryName, goodsTypeSelected, pendingGoods, series, isAutoReationing } = this.state;
        const { pendingGoods: { loading, listData, brands, category, subCategory, goodsTypeData } } = this.props;
        return (
            <PageHeaderLayout>
                <Spin spinning={isAutoReationing} tip="自动关联中，请稍候。。。">
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                {this.renderForm()}
                            </div>
                            <div className={styles.tableListOperator}>
                                <Button type="primary" onClick={this.handleAutoRelation}>
                                    relation by name
                                </Button>
                                <Button type="primary" onClick={this.handleAutoRelationByNumber}>
                                    relation by number
                                </Button>
                            </div>
                            <PendingGoodsTable
                                loading={loading}
                                data={listData}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                                onAddGoodsType={this.handleShowAddGoodsType}
                                onRelationGoodsType={this.handleShowRelationGoodsType}
                            />
                        </div>
                    </Card>
                </Spin>
                <Modal
                    title="添加款型"
                    width={1000}
                    visible={addGoodsTypeModalVisible}
                    onOk={this.handleAddGoodsType}
                    onCancel={() => this.handleModalVisible()}
                    destroyOnClose
                >
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="名称"
                    >
                        <Input placeholder="请输入" onChange={this.handleGoodsTypeName} value={pendingGoods ? pendingGoods.name : ''} />
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="性别"
                    >
                        <Select style={{ width: '100%' }} onChange={this.handleGenderChange}>
                            {
                                GENDER.map((g, i) => (
                                    <Option key={i} value={i}>
                                        {g}
                                    </Option>
                                ))
                            }
                        </Select>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="分类"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Select style={{ width: '100%' }} onChange={this.handleCategoryChange}>
                                    {
                                        category.map((c, i) => (
                                            <Option key={i} value={c._id}>{c.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select style={{ width: '100%' }} onChange={this.handleSubCategoryChange}>
                                    {
                                        subCategory.map((c, i) => (
                                            <Option key={i} value={c._id}>{c.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="品牌"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Select style={{ width: '100%' }} onChange={this.handleBrandChange}>
                                    {
                                        brands.map((brand, i) => (
                                            <Option key={i} value={brand._id}>{brand.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select style={{ width: '100%' }} onChange={this.handleSeriesChange}>
                                    {
                                        series.length > 0 && (
                                            <Option key="null" value="null">无系列</Option>
                                        )
                                    }
                                    {
                                        series.map((s, i) => (
                                            <Option key={i} value={s._id}>{s.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    {
                        pendingGoods && (
                            <FormItem
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 15 }}
                                label="图片"
                            >
                                <Row>
                                    {
                                        pendingGoods.imgs.map((img, index) => (
                                            <Col span={4} key={index}>
                                                <img
                                                    alt={`${pendingGoods.number}_${img}`}
                                                    src={`${QINIU_DOMAIN}/goods/${pendingGoods.number.replace(/[ /]/g, '_')}/${img}`}
                                                    style={{ width: '120px' }}
                                                />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </FormItem>
                        )
                    }
                </Modal>
                <Modal
                    title="关联款型"
                    width={1200}
                    visible={relationGoodsTypeModalVisible}
                    onOk={this.handleRelationGoodsType}
                    onCancel={() => this.handleRelationGoodsTypeModalVisible()}
                >
                    {
                        pendingGoods && (
                            <Row>
                                {pendingGoods.name}
                                <img src={`${QINIU_DOMAIN}/goods/${pendingGoods.number.replace(/[ /]/g, '_')}/${pendingGoods.imgs[0]}`} alt={pendingGoods.name} style={{ width: '150px' }} />
                            </Row>
                        )
                    }
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="名称"
                    >
                        <Input placeholder="请输入" onChange={this.handleRelationGoodsTypeName} value={goodsTypeQueryName} />
                    </FormItem>
                    <List
                        rowKey="_id"
                        grid={{ gutter: 8, lg: 6, md: 2, sm: 1, xs: 1 }}
                        dataSource={goodsTypeData.list}
                        renderItem={item => (
                            // 这个item是goodsType
                            <Tooltip title={item.name}>
                                <List.Item key={item._id}>
                                    <Card hoverable className={styles.card} style={{ height: '160px' }} onClick={() => { this.handleGoodsTypeSelected(item._id); }}>
                                        <Card.Meta
                                            description={(
                                                <Ellipsis className={styles.item} lines={10}>{item.name}</Ellipsis>
                                            )}
                                        />
                                        <div>
                                            <img src={`${QINIU_DOMAIN}/goodsType/${item._id}/${item.imgs[0] ? item.imgs[0].name : 'q.jpg'}`} alt={item.name} style={{ width: '100%', height: '100%' }} />
                                            {
                                                goodsTypeSelected === item._id && <Icon type="check" style={{ fontSize: 40, color: '#08c', position: 'absolute', left: '80%', top: '20%' }} />
                                            }
                                        </div>
                                    </Card>
                                </List.Item>
                            </Tooltip>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination current={goodsTypeData.pagination.current} total={goodsTypeData.pagination.total} pageSize={12} onChange={this.handleGoodsTypePageChange} />
                    </Row>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
