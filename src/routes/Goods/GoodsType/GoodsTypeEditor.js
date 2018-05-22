import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, List, Button, Select, Input, Form, Row, Col, Tabs, message, Tooltip, Icon, Modal } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import Ellipsis from '../../../components/Ellipsis';
import FooterToolbar from '../../../components/FooterToolbar';
import SubscribeTableForm from './SubscribeTableForm';
import ImgUpLoader from './ImgUpLoader';
import styles from '../../style.less';
import { SERVER_URL, QINIU_DOMAIN, GENDER } from '../../../config';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Description } = DescriptionList;

@connect(state => ({
    goodsType: state.goodsType,
    category: state.category,
}))
@Form.create()
export default class GoodsTypeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandSeriesSource: [],
        };
        this.initedBrand = false;
        this.initedCategory = false;
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goodsType/detail',
            payload: id,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, goodsType: { detail, subscribeArr }, category: { subCategoryArr } } = nextProps;
        if (detail._id !== this.props.goodsType.detail._id) {
            setFieldsValue({
                name: detail.name,
                des: detail.des,
                brand_id: detail.brand_id,
                series_id: detail.series_id,
                category_id: detail.category_id,
                sub_category_id: detail.sub_category_id,
                gender: detail.gender,
            });
        }
        if (this.props.goodsType.brandArr && this.props.goodsType.brandArr.length > 0 && detail.brand_id) {
            if (!this.initedBrand) {
                if (this.props.goodsType.brandArr && this.props.goodsType.brandArr.length > 0 && detail.brand_id) {
                    this.handleBrandNameChange(detail.brand_id);
                    this.initedBrand = true;
                }
            }
        }
        if (!this.initedCategory) {
            if (detail.category_id) {
                this.initedCategory = true;
                this.handleCategoryChange(detail.category_id);
            }
        }
        if (!this.props.goodsType.subscribeArr && subscribeArr) {
            setFieldsValue({
                subscribe: subscribeArr,
            });
        }
        this.setState({
            subCategoryArr,
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goodsType/clear',
        });
    }

    handleBrandNameChange = (brandId) => {
        const { goodsType: { brandArr } } = this.props;
        for (let index = 0; index < brandArr.length; index += 1) {
            if (brandArr[index]._id === brandId) {
                this.setState({
                    brandSeriesSource: brandArr[index].series,
                });
                break;
            }
        }
    }

    handleCategoryChange = (categoryId) => {
        this.props.dispatch({
            type: 'category/fetchSubCategory',
            payload: categoryId,
        });
    }

    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, goodsType: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                // utils.cleanObject(values);
                // utils.cleanObject(values.condition);
                dispatch({
                    type: 'goodsType/update',
                    payload: {
                        ...values,
                        id: detail._id,
                    },
                });
            }
        });
    }

    handleTabChange = (val) => {
        if (val === '3') {
            this.props.dispatch({
                type: 'goodsType/findSubscribe',
                payload: this.props.goodsType.detail._id,
            });
        } else if (val === '2') {
            this.props.dispatch({
                type: 'goodsType/findGoodsTypeColor',
                payload: this.props.goodsType.detail._id,
            });
        }
    }

    /**
     * 通过订阅打开商品信息
     */
    // handleLookUpGoods = (subscribeId) => {
    //     this.props.dispatch({
    //         type: 'goodsType/lookUpGoods',
    //         payload: subscribeId,
    //     });
    // }

    handleSubscribe = (goodsId, isSubscribe) => {
        this.props.dispatch({
            type: 'goodsType/subscribe',
            payload: {
                isSubscribe,
                goodsId,
            },
        });
    }

    /**
     * 打开或者关闭新建配色的面板
     */
    handleColorModalVisible = (flag, colorId = 'tmp') => {
        if (flag) {
            let finded = false;
            const { goodsType: { detail: { color } } } = this.props;
            for (let i = 0; i < color.length; i += 1) {
                if (color[i]._id === colorId) {
                    this.tmpColorData = color[i];
                    finded = true;
                    break;
                }
            }
            if (!finded) {
                // 新建配色
                this.tmpColorData = { _id: 'tmp', name: '', number: '' };
            } else {
                // for (let i = 0; i < this.tmpColorData.imgs.length; i += 1) {
                //     this.tmpColorData.imgs[i] = `${QINIU_DOMAIN}/goodsTypeColor/${this.tmpColorData.imgs[i].split('_')[0]}/${this.tmpColorData.imgs[i]}`;
                // }
            }
            const t = setTimeout(() => {
                clearTimeout(t);
                this.props.form.setFieldsValue({
                    goodsTypeColorName: this.tmpColorData.name,
                    goodsTypeColorNumber: this.tmpColorData.number,
                    goodsTypeColor: this.tmpColorData.color,
                });
            }, 100);
        }
        this.props.dispatch({
            type: 'goodsType/changeColorModalVisible',
            payload: !!flag,
        });
    }

    /**
     * 新建配色
     */
    handleRelationColor = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { goodsTypeColorName, goodsTypeColorNumber, goodsTypeColor } = values;
                let { imgs } = this.tmpColorData;
                const { _id } = this.tmpColorData;
                imgs = imgs.map((item) => {
                    if (item) {
                        const a = item.split('/');
                        return a[a.length - 1];
                    }
                    return null;
                });
                this.props.dispatch({
                    type: 'goodsType/createNewColor',
                    payload: {
                        id: this.props.goodsType.detail._id,
                        colorId: _id === 'tmp' ? null : _id,
                        name: goodsTypeColorName,
                        number: goodsTypeColorNumber,
                        color: goodsTypeColor,
                        imgs,
                    },
                });
            }
        });
    }

    handleUploadResponseCallback = ({ colorId, index, fileName }) => {
        this.props.dispatch({
            type: 'goodsType/updateColorImg',
            payload: {
                colorId,
                index,
                fileName,
            },
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
        const { brandSeriesSource, subCategoryArr } = this.state;
        const { form: { getFieldDecorator }, goodsType: { detail, brandArr, subscribeArr, colorModalVisible, category } } = this.props;
        if (this.tmpColorData && Array.isArray(detail.color)) {
            for (let i = 0; i < detail.color.length; i += 1) {
                if (detail.color[i]._id === this.tmpColorData._id) {
                    this.tmpColorData = { ...detail.color[i] };
                    break;
                }
            }
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        return (
            <PageHeaderLayout>
                <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                    <TabPane tab="基本信息" key="1">
                        <Card bordered={false}>
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    {
                                        this.renderFormItem(
                                            '款型名称',
                                            'name',
                                            [{ required: true, message: '请输入款型名称' }],
                                            <Input placeholder="请输入款型名称" />,
                                            true
                                        )
                                    }
                                    {
                                        this.renderFormItem(
                                            '品牌名称',
                                            'brand_id',
                                            [{ required: true, message: '请选择品牌名称' }],
                                            <Select onChange={this.handleBrandNameChange}>
                                                {
                                                    brandArr.map((brand, i) => {
                                                        return (
                                                            <Option key={i} value={brand._id}>
                                                                {brand.name}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                    {
                                        this.renderFormItem(
                                            '品牌系列',
                                            'series_id',
                                            [{ required: false, message: '请选择品牌系列' }],
                                            <Select>
                                                {
                                                    brandSeriesSource && brandSeriesSource.map((series, i) => {
                                                        return (
                                                            <Option key={i} value={series._id}>
                                                                {series.name}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </Row>
                                <Row gutter={16}>
                                    {
                                        this.renderFormItem(
                                            '商品类目',
                                            'category_id',
                                            [{ required: false, message: '请选择商品类目' }],
                                            <Select onChange={this.handleCategoryChange}>
                                                {
                                                    category.map((item, i) => {
                                                        return (
                                                            <Option key={i} value={item._id}>
                                                                {item.name}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                            </Select>,
                                            true
                                        )
                                    }
                                    {
                                        this.renderFormItem(
                                            '商品子类目',
                                            'sub_category_id',
                                            [{ required: false, message: '请选择商品子类目' }],
                                            <Select>
                                                {
                                                    subCategoryArr && subCategoryArr.map((item, i) => {
                                                        return (
                                                            <Option key={i} value={item._id}>
                                                                {item.name}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                    {
                                        this.renderFormItem(
                                            '款型性别',
                                            'gender',
                                            [{ required: false, message: '请选择款型性别' }],
                                            <Select>
                                                {
                                                    GENDER.map((item, i) => {
                                                        return (
                                                            <Option key={i} value={i}>
                                                                {item}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </Row>
                                <Row gutter={16}>
                                    {
                                        // this.renderFormItem(
                                        //     '款型描述',
                                        //     'des',
                                        //     [{ required: true, message: '请输入款型描述' }],
                                        //     <TextArea rows={4} placeholder="请输入款型描述" />
                                        // )
                                    }
                                    <Form.Item label="款型描述">
                                        {getFieldDecorator('des')(
                                            <TextArea rows={4} placeholder="请输入款型描述" />
                                        )}
                                    </Form.Item>
                                </Row>
                                <Row gutter={16}>
                                    <DescriptionList size="large" style={{ marginBottom: 32 }} col={1}>
                                        <Description term="商品主图">
                                            <ImgUpLoader
                                                dispath={this.props.dispatch}
                                                action={`${SERVER_URL}/admin/upload_goods_type_index_img/${detail._id}/0`}
                                                index={0}
                                                goodsTypeId={detail._id}
                                                imageUrl={Array.isArray(detail.imgs) ? detail.imgs[0] : ''}
                                            />
                                        </Description>
                                    </DescriptionList>
                                </Row>
                                <Row gutter={16}>
                                    <DescriptionList size="large" style={{ marginBottom: 32 }} col={1}>
                                        <Description term="商品副图">
                                            {
                                                [1, 2, 3, 4, 5].map((i, index) => (
                                                    <ImgUpLoader
                                                        key={index}
                                                        dispath={this.props.dispatch}
                                                        action={`${SERVER_URL}/admin/upload_goods_type_index_img/${detail._id}/${i}`}
                                                        index={i}
                                                        goodsTypeId={detail._id}
                                                        imageUrl={Array.isArray(detail.imgs) ? detail.imgs[i] : ''}
                                                    />
                                                ))
                                            }
                                        </Description>
                                    </DescriptionList>
                                </Row>
                            </Form>
                        </Card>
                    </TabPane>
                    <TabPane tab="配色" key="2">
                        <Card bordered={false}>
                            <div className={styles.cardList}>
                                <List
                                    rowKey="_id"
                                    // loading={loading}
                                    grid={{ gutter: 6, lg: 6, md: 2, sm: 1, xs: 1 }}
                                    dataSource={detail.color ? ['', ...(detail.color)] : []}
                                    renderItem={item => (
                                        item ? (
                                            <List.Item key={item._id}>
                                                <Card hoverable className={styles.card} onClick={() => { this.handleColorModalVisible(true, item._id); }}>
                                                    <Card.Meta
                                                        description={(
                                                            <Ellipsis className={styles.item} lines={1}>{item.name}</Ellipsis>
                                                        )}
                                                    />
                                                    {
                                                        item.imgs.length > 0 && (
                                                            <Tooltip title={item.name}>
                                                                <img src={`${QINIU_DOMAIN}/goodsTypeColor/${item.imgs[0].split('_')[0]}/${item.imgs[0]}`} alt={item.name} style={{ width: '100%', height: '100%' }} />
                                                            </Tooltip>
                                                        )
                                                    }
                                                </Card>
                                            </List.Item>
                                        ) : (
                                            <List.Item>
                                                <Button type="dashed" className={styles.newButton} onClick={() => { this.handleColorModalVisible(true); }}>
                                                    <Icon type="plus" /> 新增配色
                                                </Button>
                                            </List.Item>
                                        )
                                    )}
                                />
                            </div>
                        </Card>
                    </TabPane>
                    <TabPane tab="订阅" key="3">
                        <Card bordered={false}>
                            {getFieldDecorator('subscribe', {
                                initialValue: subscribeArr ? subscribeArr.map((item) => { item.key = item._id; return item; }) : [],
                            })(<SubscribeTableForm
                                // handleLookUpGoods={this.handleLookUpGoods}
                                subscribe={(goodsId, isSubscribe) => this.handleSubscribe(goodsId, isSubscribe)}
                            />)}
                        </Card>
                    </TabPane>
                </Tabs>
                <FooterToolbar>
                    <Button type="primary" onClick={this.handlerSubmit} loading={false}>
                        提交
                    </Button>
                </FooterToolbar>
                {
                    this.tmpColorData && (
                        <Modal
                            title="新建配色"
                            width={1100}
                            visible={colorModalVisible}
                            onOk={this.handleRelationColor}
                            onCancel={() => this.handleColorModalVisible(false)}
                        >
                            <Card bordered={false}>
                                <Form
                                    onSubmit={this.handleRelationColor}
                                    hideRequiredMark
                                    style={{ marginTop: 8 }}
                                >
                                    <FormItem
                                        {...formItemLayout}
                                        label="配色名称"
                                    >
                                        {getFieldDecorator('goodsTypeColorName', {
                                            rules: [{
                                                required: false, message: '请输入配色名称',
                                            }],
                                        })(
                                            <Input placeholder="请输入配色名称" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="配色编号"
                                    >
                                        {getFieldDecorator('goodsTypeColorNumber', {
                                            rules: [{
                                                required: false, message: '请输入配色编号',
                                            }],
                                        })(
                                            <Input placeholder="请输入配色编号" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="颜色内容"
                                    >
                                        {getFieldDecorator('goodsTypeColor', {
                                            rules: [{
                                                required: false, message: '请输入颜色内容',
                                            }],
                                        })(
                                            <Input placeholder="请输入颜色内容" />
                                        )}
                                    </FormItem>
                                </Form>
                                {
                                    [[0, 1, 2], [3, 4, 5]].map((item, index) => (
                                        <Row type="flex" justify="space-between" key={`row${index}`}>
                                            {
                                                item.map((i, j) => (
                                                    <Col key={j}>
                                                        <ImgUpLoader
                                                            responseCallback={this.handleUploadResponseCallback}
                                                            colorId={this.tmpColorData._id}
                                                            downloadType="goodsType/downloadColorImg"
                                                            dispath={this.props.dispatch}
                                                            action={`${SERVER_URL}/admin/upload_goods_type_color_img/${detail._id}/${this.tmpColorData._id}/${i}`}
                                                            index={i}
                                                            goodsTypeId={detail._id}
                                                            // imageUrl={Array.isArray(this.tmpColorData.imgs) ? this.tmpColorData.imgs[i] : ''}
                                                            imageUrl={Array.isArray(this.tmpColorData.imgs) && this.tmpColorData.imgs.length > i ? `${QINIU_DOMAIN}/goodsTypeColor/${this.tmpColorData.imgs[i].split('_')[0]}/${this.tmpColorData.imgs[i]}` : ''}
                                                        />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    ))
                                }
                            </Card>
                        </Modal>
                    )
                }
            </PageHeaderLayout>
        );
    }
}
