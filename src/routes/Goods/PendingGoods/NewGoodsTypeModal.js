import React, { PureComponent } from 'react';
import { Modal, Form, Input, Row, Col, Select, Spin } from 'antd';
import { GENDER } from '../../../config';

const FormItem = Form.Item;
const { Option } = Select;

export default class NewGoodsTypeModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible,
            isShowingSpin: true,
            brands: [],
            series: [],
            category: [],
            subCategory: [],
            pendingGoods: {},
        };
    }

    componentDidMount() {
        this.handleFetchCategory();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            brands: nextProps.brands,
            category: nextProps.category,
            subCategory: nextProps.subCategory,
            visible: !!nextProps.visible,
            pendingGoods: nextProps.pendingGoods,
            isShowingSpin: false,
        });
    }

    handleFetchCategory = () => {
        this.props.dispatch({
            type: 'pendingGoods/fetchBrandAndCategory',
        });
    }

    handleOk = () => {
        const { handleOk } = this.props;
        handleOk && handleOk();
    }

    handleCancel = () => {
        const { handleCancel } = this.props;
        handleCancel && handleCancel();
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

    handleBrandChange = (value) => {
        const { brands } = this.state;
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
                series: 'null',
            },
            series,
        });
    }

    render() {
        const { visible, isShowingSpin, brands, series, category, subCategory, pendingGoods } = this.state;
        return (
            <Modal
                title="添加款型"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={800}
                destroyOnClose
            >
                <Spin spinning={isShowingSpin} tip="请稍候。。。">
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
                                    <Option key="null" value="null">无系列</Option>
                                    {
                                        series.map((s, i) => (
                                            <Option key={i} value={s._id}>{s.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    {/* {
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
                    } */}
                </Spin>
            </Modal>
        );
    }
}
