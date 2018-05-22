import React, { PureComponent } from 'react';
import { Card, Pagination, Button, Input, List, Icon, Row, Modal, Tooltip } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import Ellipsis from '../../../components/Ellipsis';
import { getGoodsTypeImg, getGoodsImg } from '../../../utils/utils';
import styles from '../../style.less';

const { Description } = DescriptionList;

export default class RelationGoodsTypeModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            goodsTypeKeyword: '',
            goodsType: props.goodsType,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { visible, goodsType } = nextProps;
        if (visible !== this.state.visible || goodsType !== this.state.goodsType) {
            this.setState({
                visible,
                goodsType,
            });
        }
    }

    handleGoodsTypePageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'goods/changeRelationGoodsTypeModalVisible',
            payload: {
                visible: true,
                params: {
                    name: this.state.goodsTypeKeyword,
                    fields: { _id: 1, name: 1 },
                    page: current,
                    count: pageSize,
                },
            },
        });
    }

    handleGoodsTypeKeywordChange = ({ target: { value } }) => {
        this.setState({
            goodsTypeKeyword: value,
        }, () => {
            this.props.dispatch({
                type: 'goods/changeRelationGoodsTypeModalVisible',
                payload: {
                    visible: true,
                    params: {
                        name: value,
                        fields: { _id: 1, name: 1 },
                        page: 1,
                        count: 18,
                    },
                },
            });
        });
    }

    handleRelationGoodsType = () => {
        const { goodsType } = this.state;
        this.props.dispatch({
            type: 'goods/updateGoodsType',
            payload: {
                goodsId: this.props.goods._id,
                goodsType,
            },
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

    handleGoodsType = (goodsType) => {
        if (this.state.goodsType === goodsType) {
            goodsType = 'none';
        }
        this.setState({
            goodsType,
        });
    }

    render() {
        const { visible, goodsTypeKeyword, goodsType } = this.state;
        const { goods, goodsTypeData } = this.props;
        return (
            <Modal
                title="关联款型"
                visible={visible}
                onOk={this.handleRelationGoodsType}
                onCancel={() => this.handleGoodsTypeModalVisible(false, {})}
                width={1200}
            >
                <Card bordered={false}>
                    <div className={styles.cardList}>
                        <DescriptionList size="small" col="3" style={{ marginBottom: '18px' }}>
                            <Description term="商品名称">
                                {goods.name}
                            </Description>
                            <Description term="商品图片">
                                <img alt={goods.name} src={getGoodsImg(goods._id)} style={{ width: '120px', height: '120px' }} />
                            </Description>
                            <Description term="款型名称">
                                {
                                    goods.goodsType// <img src={getGoodsTypeColorImg(goods.type, this.goodsTypeColorId)} alt="配色图片" style={{ width: '120px', height: '120px' }} />
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
                                        <Tooltip title={item.name}>
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
                                        </Tooltip>
                                    )}
                                />
                                <Row type="flex" justify="end">
                                    <Pagination current={goodsTypeData.pagination.current} total={goodsTypeData.pagination.total} pageSize={18} onChange={this.handleGoodsTypePageChange} />
                                </Row>
                            </Description>
                        </DescriptionList>
                    </div>
                </Card>
            </Modal>
        );
    }
}
