import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, Row, Col, Select, Divider, List, Icon, message, Checkbox, Modal, Radio, Popconfirm, Tag } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import { GENDER, IMG_SERVER } from '../../../config';
import styles from '../../style.less';

const { Option } = Select;
const RadioGroup = Radio.Group;

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
            mergeGoodsColorModalVisible: false,
            selectedGoodsColor: [],
            mergeTargetGoodsColor: null,
            targetGoodsColorId: null,
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } }, location: { search } } = this.props;
        let targetGoodsColorId = null;
        if (search) {
            // ?goods_color_id=5aadc2c69574fa6b67813740
            const queryArr = search.replace('?', '').split('&');
            let query = null;
            for (let i = 0; i < queryArr.length; i++) {
                query = queryArr[i].split('=');
                if (query[0] === 'goods_color_id') {
                    targetGoodsColorId = query[1];
                }
            }
        }
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
                let setedState = false;
                for (let i = 0; i < brands.length; i += 1) {
                    if (brands[i]._id === detail.brand) {
                        setedState = true;
                        this.setState({
                            series: brands[i].series,
                            targetGoodsColorId,
                        });
                        break;
                    }
                }
                if (!setedState) {
                    this.setState({
                        targetGoodsColorId,
                    });
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
        this.props.dispatch({
            type: 'goodsType/navToGoodsColor',
            payload: goodsColorId,
        });
    }

    handleGoodsColorCheckboxChange = (goodsColor, isChecked) => {
        const selectedGoodsColor = [...this.state.selectedGoodsColor];
        const index = selectedGoodsColor.indexOf(goodsColor);
        if (isChecked) {
            if (index === -1) {
                selectedGoodsColor.push(goodsColor);
            }
        } else if (index !== -1) {
            selectedGoodsColor.splice(index, 1);
        }
        this.setState({ selectedGoodsColor });
    }

    handleMergeSelectedGoodsColor = () => {
        this.setState({ mergeGoodsColorModalVisible: true });
    }

    handleMergeTargetGoodsColorChange = ({ target: { value } }) => {
        this.setState({ mergeTargetGoodsColor: value });
    }

    handleMergeGoodsColor = () => {
        const { mergeTargetGoodsColor, selectedGoodsColor } = this.state;
        this.props.dispatch({
            type: 'goodsType/mergeGoodsColor',
            payload: {
                mergeTargetGoodsColor,
                goodsColorArr: selectedGoodsColor.map(item => item._id),
            },
            callback: () => {
                this.setState({ mergeGoodsColorModalVisible: false, selectedGoodsColor: [] });
            },
        });
    }

    handleRemoveGoodsColor = (goodsColorId) => {
        const { goodsType: { detail } } = this.props;
        this.props.dispatch({
            type: 'goodsType/removeGoodsColor',
            payload: {
                id: detail._id,
                goodsColorId,
            },
        });
    }

    render() {
        const { series, mergeGoodsColorModalVisible, selectedGoodsColor, targetGoodsColorId } = this.state;
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
                                <Form.Item label="类目">
                                    {getFieldDecorator('category')(
                                        <Select style={{ width: '100%' }} placeholder="请输入类目" onChange={this.handleCategoryChange}>
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
                                <Form.Item label="子类目">
                                    {getFieldDecorator('sub_category')(
                                        <Select style={{ width: '100%' }} placeholder="请输入子类目">
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
                    <Button type="primary" style={{ marginBottom: '12px' }} onClick={this.handleMergeSelectedGoodsColor}>
                        合并配色
                    </Button>
                    <List
                        rowKey="id"
                        grid={{ lg: 6, md: 1, sm: 1, xs: 1 }}
                        dataSource={['', ...goodsColorArr]}
                        renderItem={item =>
                            (item ? (
                                <List.Item
                                    key={item._id}
                                    style={{ width: '120px', height: '240px' }}
                                >
                                    { item.number.join('\n') }
                                    <Row type="flex" justify="center" onClick={() => this.handleGoodsColorClick(item._id)}>
                                        <img style={{ width: '120px', height: '120px' }} alt={item.img} src={`${IMG_SERVER}/${item.img}`} />
                                        {
                                            item._id === targetGoodsColorId && <Icon type="smile" />
                                        }
                                    </Row>
                                    {
                                        item.hot_degree > 0 && (
                                            <Row type="flex" justify="center">
                                                <Tag color="magenta">热度:{ item.hot_degree }</Tag>
                                            </Row>
                                        )
                                    }
                                    <Row type="flex" justify="center">
                                        <Checkbox
                                            onChange={({ target: { checked } }) => this.handleGoodsColorCheckboxChange(item, checked)}
                                        >
                                            {item.color_name || 'no name'}
                                        </Checkbox>
                                    </Row>
                                    <Row type="flex" justify="center">
                                        <Popconfirm title="是否要删除配色数据？" onConfirm={() => this.handleRemoveGoodsColor(item._id)}>
                                            <Button type="danger">删除</Button>
                                        </Popconfirm>
                                    </Row>
                                </List.Item>
                            ) : (
                                <List.Item>
                                    <Button
                                        type="dashed"
                                        className={styles.newButton}
                                        style={{ width: '120px', height: '240px' }}
                                    >
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
                <Modal
                    title="合并配色"
                    visible={mergeGoodsColorModalVisible}
                    onOk={this.handleMergeGoodsColor}
                    onCancel={() => { this.setState({ mergeGoodsColorModalVisible: false }); }}
                >
                    <RadioGroup onChange={this.handleMergeTargetGoodsColorChange} value={this.state.mergeTargetGoodsColor}>
                        {
                            selectedGoodsColor.map(goodsColor => (
                                <Radio
                                    key={goodsColor.id}
                                    style={{
                                        display: 'block',
                                        height: '30px',
                                        lineHeight: '30px',
                                    }}
                                    value={goodsColor._id}
                                >
                                    {goodsColor.color_name}
                                </Radio>
                            ))
                        }
                    </RadioGroup>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
