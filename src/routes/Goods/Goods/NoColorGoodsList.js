import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import GoodsTable from './GoodsTable';
import RelationGoodsTypeModal from './RelationGoodsTypeModal';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FIELDS = {
    name: 1,
    type: 1,
    type_checked: 1,
};

@connect(state => ({
    goods: state.goods,
}))
export default class NoColorGoodsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 需要编辑的商品对象
            goods: null,
        };
    }

    componentDidMount() {
        this.handleSearch();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'goods/clearDetail',
        });
    }

    handleStandardTableChange = (pagination) => {
        const { dispatch } = this.props;
        const params = {
            fields: FIELDS,
            page: pagination.current,
            count: pagination.pageSize,
        };
        dispatch({
            type: 'goods/find',
            payload: params,
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, goods: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        dispatch({
            type: 'goods/findNoColor',
            payload: {
                fields: FIELDS,
                page: 1,
                count: 10,
            },
        });
    }

    handleGoodsTypeModalVisible = (flag, goods) => {
        const visible = !!flag;
        if (goods) {
            this.setState({ goods });
        }
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

    handleUpdateGoodsTypeChecked = (id) => {
        this.props.dispatch({
            type: 'goods/updateGoodsTypeChecked',
            payload: id,
        });
    }

    render() {
        const { goods } = this.state;
        const { goods: { loading, listData, relationGoodsTypeModalVisible, goodsTypeData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <GoodsTable
                            loading={loading}
                            data={listData}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                            handleGoodsTypeModalVisible={this.handleGoodsTypeModalVisible}
                            handleUpdateGoodsTypeChecked={this.handleUpdateGoodsTypeChecked}
                        />
                    </div>
                </Card>
                {
                    goods && (
                        <RelationGoodsTypeModal
                            dispatch={this.props.dispatch}
                            visible={relationGoodsTypeModalVisible}
                            goods={goods}
                            goodsType={goods.type}
                            goodsTypeData={goodsTypeData}
                        />
                    )
                }
            </PageHeaderLayout>
        );
    }
}
