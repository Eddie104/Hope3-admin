import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Pagination, Button, Table, Input, Form, List, Icon, Row, Modal, message } from 'antd';
import RelationGoodsTypeModal from './RelationGoodsTypeModal';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Ellipsis from '../../../components/Ellipsis';
import FooterToolbar from '../../../components/FooterToolbar';
import DescriptionList from '../../../components/DescriptionList';
// import SubscribeTableForm from './SubscribeTableForm';
import styles from '../../style.less';
import { getGoodsTypeColorImg, getGoodsImg } from '../../../utils/utils';

const { TextArea } = Input;
const { Description } = DescriptionList;
// const TabPane = Tabs.TabPane;

@connect(state => ({
    goods: state.goods,
}))
@Form.create()
export default class GoodsEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 物品配色的id
            colorId: 'none',
            curColorArr: [],
            pageCurrent: 1,
            pageTotal: 1,
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'goods/detail',
            payload: id,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, goods: { detail, colorArr } } = nextProps;
        if (detail._id !== this.props.goods.detail._id) {
            setFieldsValue({
                name: detail.name,
            });
        }
        const newState = {};
        if (colorArr.length > 0) {
            const pageCurrent = 1;
            const pageTotal = colorArr.length;
            newState.pageCurrent = pageCurrent;
            newState.pageTotal = pageTotal;
            // 一页18个
            newState.curColorArr = colorArr.slice((pageCurrent - 1) * 18, 18);
        }
        this.setState(newState);
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goods/clearDetail',
        });
    }

    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, goods: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                // utils.cleanObject(values);
                // utils.cleanObject(values.condition);
                dispatch({
                    type: 'goods/update',
                    payload: {
                        ...values,
                        id: detail._id,
                    },
                });
            }
        });
    }

    // 处理关联配色
    handleRelationColor = () => {
        const { colorId } = this.state;
        this.props.dispatch({
            type: 'goods/updateColor',
            payload: {
                goodsId: this.props.goods.detail._id,
                goodsColor: this.goodsColor,
                colorId,
            },
        });
    }

    handleModalVisible = (flag, { color, goods_type_color_id }) => {// eslint-disable-line
        const visible = !!flag;
        if (visible) {
            this.goodsColor = color;
            this.goodsTypeColorId = goods_type_color_id;// eslint-disable-line
            this.setState({
                colorId: goods_type_color_id,
            });
        }
        this.props.dispatch({
            type: 'goods/changeRelationColorModalVisible',
            payload: {
                visible,
                goods_id: this.props.goods.detail._id,
            },
        });
    }

    handleColorId = (colorId) => {
        if (this.state.colorId === colorId) {
            colorId = 'none';
        }
        this.setState({
            colorId,
        });
    }

    handlePageChange = (current, pageSize) => {
        const { goods: { colorArr } } = this.props;
        this.setState({
            pageCurrent: current,
            // 一页18个
            curColorArr: colorArr.slice((current - 1) * pageSize, current * pageSize),
        });
    }

    handleGoodsTypeModalVisible = (flag) => {
        const visible = !!flag;
        this.props.dispatch({
            type: 'goods/changeRelationGoodsTypeModalVisible',
            payload: {
                visible,
                params: {
                    // name,
                    fields: { _id: 1, name: 1 },
                    page: 1,
                    count: 18,
                },
            },
        });
    }

    render() {
        const { colorId, pageCurrent, pageTotal, curColorArr } = this.state;
        const { form: { getFieldDecorator }, goods: { detail, relationColorModalVisible, relationGoodsTypeModalVisible, goodsTypeData } } = this.props;
        // console.log(detail);
        const columns = [{
            title: '颜色/尺寸',
            dataIndex: 'color',
            key: 'color',
        }];
        const dataSource = [];
        if (detail.size_color) {
            const createColorData = (color) => {
                for (let index = 0; index < dataSource.length; index += 1) {
                    if (dataSource[index].color === color) return dataSource[index];
                }
                const colorData = {
                    color,
                };
                dataSource.push(colorData);
                return colorData;
            };
            let hasSize = false;
            for (let index = 0; index < detail.size_color.length; index += 1) {
                const { color, size, value, goods_type_color_id } = detail.size_color[index];// eslint-disable-line
                const colorData = createColorData(color);
                colorData[size] = value;
                colorData.goods_type_color_id = goods_type_color_id;// eslint-disable-line
                colorData.key = `${color}-${size}`;
                // 下面开始处理列头的数据
                hasSize = false;
                for (let i = 0; i < columns.length; i += 1) {
                    if (columns[i].title === size) {
                        hasSize = true;
                        break;
                    }
                }
                if (!hasSize) {
                    columns.push({
                        title: size,
                        dataIndex: size,
                        key: `${size}-${index}`,
                    });
                }
            }
            columns.push({
                title: '配色图',
                dataIndex: 'goods_type_color_id',
                render: (text, record) => (
                    text ? (
                        <img src={getGoodsTypeColorImg(detail.type, text)} alt={record.name} style={{ width: '120px', height: '120px' }} />
                    ) : (
                        '尚未关联'
                    )
                    // <div>
                    //     <a onClick={() => this.handleModalVisible(true, record)}>关联配色</a>
                    // </div>
                ),
            });
            columns.push({
                title: '操作',
                render: (text, record) => (
                    <div>
                        <a onClick={() => this.handleModalVisible(true, record)}>关联配色</a>
                    </div>
                ),
            });
        }
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label="商品名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入商品名称' }],
                            })(
                                <TextArea placeholder="请输入商品名称" rows={2} />
                            )}
                        </Form.Item>
                        <DescriptionList size="large" style={{ marginBottom: 32 }} col={3}>
                            <Description term="商品价格">{detail.price}日元</Description>
                            <Description term="商品款型">
                                {detail.goodsType}
                                <Button type="primary" onClick={() => { this.handleGoodsTypeModalVisible(true); }}>修改款型</Button>
                            </Description>
                            <Description term="订阅地址">
                                <Link to="route" target="_blank" onClick={(event) => { event.preventDefault(); window.open(detail.subscribeUrl); }}>
                                    {detail.subscribeUrl}
                                </Link>
                            </Description>
                        </DescriptionList>
                        <DescriptionList size="large" style={{ marginBottom: 32 }} col={2}>
                            <Description term="商品图片">
                                {
                                    detail._id && <img alt={detail.name} src={getGoodsImg(detail._id)} style={{ width: '120px', height: '120px' }} />
                                }
                            </Description>
                        </DescriptionList>
                    </Form>
                    {/* <Divider /> */}
                    <Card title="库存情况" >
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </Card>
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handlerSubmit} loading={false}>
                        提交
                        </Button>
                    </FooterToolbar>
                </Card>
                <Modal
                    title="关联配色"
                    visible={relationColorModalVisible}
                    onOk={this.handleRelationColor}
                    onCancel={() => this.handleModalVisible(false, {})}
                    width={1200}
                >
                    <Card bordered={false}>
                        <div className={styles.cardList}>
                            <DescriptionList size="small" col="2">
                                <Description term="商品图片">
                                    <img alt={detail.name} src={getGoodsImg(detail._id)} style={{ width: '120px', height: '120px' }} />
                                </Description>
                                <Description term="配色图片">
                                    {
                                        <img src={getGoodsTypeColorImg(detail.type, this.goodsTypeColorId)} alt="配色图片" style={{ width: '120px', height: '120px' }} />
                                    }
                                </Description>
                            </DescriptionList>
                            <DescriptionList size="small" col="1">
                                <Description term="配色数据">
                                    <List
                                        rowKey="_id"
                                        // loading={loading}
                                        grid={{ gutter: 8, lg: 6, md: 2, sm: 1, xs: 1 }}
                                        dataSource={curColorArr}
                                        renderItem={item => (
                                            // 这个item是goodsType里的color
                                            <List.Item key={item._id}>
                                                <Card hoverable className={styles.card} onClick={() => { this.handleColorId(item._id); }}>
                                                    <Card.Meta
                                                        description={(
                                                            <Ellipsis className={styles.item} lines={1}>{item.name}</Ellipsis>
                                                        )}
                                                    />
                                                    <div>
                                                        <img src={getGoodsTypeColorImg(detail.type, item._id)} alt={item.name} style={{ width: '100%', height: '100%' }} />
                                                        {
                                                            colorId === item._id && <Icon type="check" style={{ fontSize: 40, color: '#08c', position: 'absolute', left: '80%', top: '20%' }} />
                                                        }
                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                    <Row type="flex" justify="end">
                                        <Pagination current={pageCurrent} total={pageTotal} pageSize={18} onChange={this.handlePageChange} />
                                    </Row>
                                </Description>
                            </DescriptionList>
                        </div>
                    </Card>
                </Modal>
                {/* 关联款型的modal */}
                <RelationGoodsTypeModal
                    dispatch={this.props.dispatch}
                    visible={relationGoodsTypeModalVisible}
                    goods={detail}
                    goodsType={detail.type}
                    goodsTypeData={goodsTypeData}
                />
                {/* <Modal
                    title="关联款型"
                    visible={relationGoodsTypeModalVisible}
                    onOk={this.handleRelationGoodsType}
                    onCancel={() => this.handleGoodsTypeModalVisible(false, {})}
                    width={1200}
                >
                    <Card bordered={false}>
                        <div className={styles.cardList}>
                            <DescriptionList size="small" col="3" style={{ marginBottom: '18px' }}>
                                <Description term="商品名称">
                                    {detail.name}
                                </Description>
                                <Description term="商品图片">
                                    <img alt={detail.name} src={getGoodsImg(detail._id)} style={{ width: '120px', height: '120px' }} />
                                </Description>
                                <Description term="款型名称">
                                    {
                                        detail.goodsType// <img src={getGoodsTypeColorImg(detail.type, this.goodsTypeColorId)} alt="配色图片" style={{ width: '120px', height: '120px' }} />
                                    }
                                </Description>
                            </DescriptionList>
                            <DescriptionList size="small" col="1" style={{ marginBottom: '18px' }}>
                                <Description term="款型名称查询">
                                    <Input placeholder="请输入款型名称" value={goodsTypeKeyword} onChange={this.handleGoodsTypeKeywordChange} style={{ width: '200px', marginRight: '18px' }} />
                                    <Button type="primary">查询</Button>
                                </Description>
                            </DescriptionList>
                            <DescriptionList size="small" col="1" style={{ marginBottom: '18px' }}>
                                <Description term="款型数据">
                                    <List
                                        rowKey="_id"
                                        // loading={loading}
                                        grid={{ gutter: 8, lg: 6, md: 2, sm: 1, xs: 1 }}
                                        dataSource={goodsTypeData.list}
                                        renderItem={item => (
                                            // 这个item是goodsType
                                            <List.Item key={item._id}>
                                                <Card hoverable className={styles.card} style={{ height: '160px' }} onClick={() => { this.handleGoodsType(item._id); }}>
                                                    <Card.Meta
                                                        description={(
                                                            <Ellipsis className={styles.item} lines={1}>{item.name}</Ellipsis>
                                                        )}
                                                    />
                                                    <div>
                                                        <img src={getGoodsTypeImg(item._id)} alt={item.name} style={{ width: '100%', height: '100%' }} />
                                                        {
                                                            goodsType === item._id && <Icon type="check" style={{ fontSize: 40, color: '#08c', position: 'absolute', left: '80%', top: '20%' }} />
                                                        }
                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                    <Row type="flex" justify="end">
                                        <Pagination current={goodsTypeData.pagination.current} total={goodsTypeData.pagination.total} pageSize={18} onChange={this.handleGoodsTypePageChange} />
                                    </Row>
                                </Description>
                            </DescriptionList>
                        </div>
                    </Card>
                </Modal> */}
            </PageHeaderLayout>
        );
    }
}
