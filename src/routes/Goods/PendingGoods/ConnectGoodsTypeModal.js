import React, { PureComponent } from 'react';
import { Modal, Form, Input, Row, List, Tooltip, Badge, Pagination } from 'antd';
import Ellipsis from '../../../components/Ellipsis';
import { IMG_SERVER } from '../../../config';
import styles from '../../style.less';

const FormItem = Form.Item;

export default class ConnectGoodsTypeModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible,
            pendingGoods: props.pendingGoods,
            goodsTypeNameKeyWord: '',
            goodsTypeListData: props.goodsTypeListData || { pagination: 1, total: 1 },
            selectedGoodsTypeId: 0,
        };
    }

    componentDidMount() {
        this.fetchGoodsType();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: !!nextProps.visible,
            pendingGoods: { ...nextProps.pendingGoods },
        });
    }

    fetchGoodsType = () => {
        this.props.dispatch({
            type: 'pendingGoods/findGoodsType',
            payload: {
                name: this.state.goodsTypeNameKeyWord,
                page: 1,
                count: 12,
                fields: { _id: 1, name: 1, img: 1 },
            },
            callback: (goodsTypeListData) => {
                this.setState({ goodsTypeListData });
            },
        });
    }

    handleGoodsTypeNameChange = ({ target: { value } }) => {
        this.setState({
            goodsTypeNameKeyWord: value,
        }, () => {
            this.fetchGoodsType();
        });
    }

    handleGoodsTypePageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'pendingGoods/findGoodsType',
            payload: {
                name: this.state.goodsTypeNameKeyWord,
                page: current,
                count: pageSize,
                fields: { _id: 1, name: 1, img: 1 },
            },
            callback: (goodsTypeListData) => {
                this.setState({ goodsTypeListData });
            },
        });
    }

    handleGoodsTypeSelected = (value) => {
        this.setState({
            selectedGoodsTypeId: value,
        });
    }

    handleOk = () => {
        const { handleOk } = this.props;
        handleOk && handleOk(this.state.selectedGoodsTypeId);
    }

    handleCancel = () => {
        const { handleCancel } = this.props;
        handleCancel && handleCancel();
    }

    render() {
        const { visible, pendingGoods, goodsTypeNameKeyWord, goodsTypeListData, selectedGoodsTypeId } = this.state;
        return (
            <Modal
                title="关联款型"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={1200}
                destroyOnClose
            >
                {
                    pendingGoods && pendingGoods.platform && (
                        <Row>
                            <img style={{ width: '130px' }} alt={pendingGoods.name} src={`${IMG_SERVER}/${pendingGoods.platform}/${pendingGoods.imgs[0]}`} />
                            {pendingGoods.name}
                        </Row>
                    )
                }
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="款型名称"
                >
                    <Input placeholder="请输入" onChange={this.handleGoodsTypeNameChange} value={goodsTypeNameKeyWord} />
                </FormItem>
                <List
                    rowKey="id"
                    grid={{ lg: 6, md: 1, sm: 1, xs: 1 }}
                    dataSource={goodsTypeListData.list}
                    renderItem={item => (
                        <Tooltip title={item.name}>
                            <List.Item key={item._id}>
                                <Badge dot={selectedGoodsTypeId === item._id}>
                                    <Row type="flex" justify="center">
                                        <img
                                            style={{ width: '120px', height: '120px' }}
                                            alt={item.name}
                                            src={`${IMG_SERVER}/${item.img}`}
                                            onClick={() => this.handleGoodsTypeSelected(item._id)}
                                        />
                                    </Row>
                                    <Row type="flex" justify="center">
                                        <Ellipsis className={styles.item} lines={3}>{item.name}</Ellipsis>
                                    </Row>
                                </Badge>
                            </List.Item>
                        </Tooltip>
                    )}
                />
                <Row type="flex" justify="end">
                    <Pagination current={goodsTypeListData.pagination.current} total={goodsTypeListData.pagination.total} pageSize={12} onChange={this.handleGoodsTypePageChange} />
                </Row>
            </Modal>
        );
    }
}
