import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, Select, Divider, List, Icon, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import GoodsColorEditor from './GoodsColorEditor';
import { GENDER, IMG_SERVER } from '../../../config';
import styles from '../../style.less';

const { Option } = Select;

@connect(state => ({
    goodsType: state.goodsType,
    goodsColor: state.goodsColor,
}))
@Form.create()
export default class GoodsTypeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            isShowingGoodsColorEditor: false,
            targetGoodsColorId: null,
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goodsType/detail',
            payload: id,
            callback: () => {
                const { form: { setFieldsValue }, goodsType: { detail, brands } } = this.props;
                setFieldsValue({
                    name: detail.name,
                    gender: detail.gender,
                    brand: detail.brand,
                    series: detail.series,
                    category: detail.category,
                    sub_category: detail.sub_category,
                });
                for (let i = 0; i < brands.length; i += 1) {
                    if (brands[i]._id === detail.brand) {
                        this.setState({
                            series: brands[i].series,
                        });
                        break;
                    }
                }
                this.handleCategoryChange(detail.category);
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
            const { form: { setFieldsValue } } = this.props;
            setFieldsValue({
                series: 'null',
            });
        }
    }

    handleCategoryChange = (value) => {
        if (value) {
            this.props.dispatch({
                type: 'goodsType/fetchSubCategory',
                payload: value,
            });
        }
    }

    handleGoodsColorClick = (goodsColorId) => {
        this.setState({
            isShowingGoodsColorEditor: true,
            targetGoodsColorId: goodsColorId,
        });
    }

    handleGoodsColorEditorOK = (goodsColorData) => {
        this.props.dispatch({
            type: 'goodsColor/update',
            payload: goodsColorData,
            callback: () => {
                this.setState({
                    isShowingGoodsColorEditor: false,
                    targetGoodsColorId: null,
                }, () => {
                    this.props.dispatch({
                        type: 'goodsType/updateGoodsColor',
                        payload: goodsColorData,
                    });
                });
            },
        });
    }

    handleGoodsColorEditorCancel = () => {
        this.setState({
            isShowingGoodsColorEditor: false,
            targetGoodsColorId: null,
        });
    }

    render() {
        const { series, isShowingGoodsColorEditor, targetGoodsColorId } = this.state;
        const { form: { getFieldDecorator }, goodsType: { goodsColorArr, brands, category, subCategory } } = this.props;
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
                                            <Option key="null" value="null">无系列</Option>
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
                    <List
                        rowKey="id"
                        grid={{ gutter: 24, lg: 6, md: 4, sm: 1, xs: 1 }}
                        dataSource={['', ...goodsColorArr]}
                        renderItem={item =>
                            (item ? (
                                <List.Item key={item.id}>
                                    <Card hoverable onClick={() => { this.handleGoodsColorClick(item._id); }}>
                                        <Row>
                                            <img style={{ width: '120px' }} alt={item.img} src={`${IMG_SERVER}/${item.img}`} />
                                        </Row>
                                        <Row type="flex" justify="center">
                                            {item.color_name || 'no name'}
                                        </Row>
                                    </Card>
                                </List.Item>
                            ) : (
                                <List.Item>
                                    <Button type="dashed" className={styles.newButton}>
                                        <Icon type="plus" /> 新增配色
                                    </Button>
                                </List.Item>
                            ))
                        }
                    />
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handleSubmit} loading={false}>
                            提交
                        </Button>
                    </FooterToolbar>
                </Card>
                <GoodsColorEditor
                    visible={isShowingGoodsColorEditor}
                    goodsColorId={targetGoodsColorId}
                    dispatch={this.props.dispatch}
                    detail={this.props.goodsColor.detail}
                    handleOk={this.handleGoodsColorEditorOK}
                    handleCancel={this.handleGoodsColorEditorCancel}
                />
            </PageHeaderLayout>
        );
    }
}
