import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import GoodsColorTable from './GoodsColorTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

@connect(state => ({
    goodsColor: state.goodsColor,
}))
@Form.create()
export default class PopularGoodsColorList extends PureComponent {
    componentDidMount() {
        this.handleSearch();
    }

    handleStandardTableChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'goodsColor/findPopular',
            payload: {
                page: pagination.current,
                count: pagination.pageSize,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, goodsColor: { popularListData } } = this.props;
        if (!e && popularListData.list.length > 0) return;
        dispatch({
            type: 'goodsColor/findPopular',
            payload: {
                page: 1,
                count: 10,
            },
        });
    }

    handlerSetPopular = (id, isPopular) => {
        this.props.dispatch({
            type: 'goodsColor/update',
            payload: {
                _id: id,
                is_popular: isPopular,
                from: 'popularGoodsColorList',
            },
        });
    }

    render() {
        const { goodsColor: { loading, popularListData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <GoodsColorTable
                            loading={loading}
                            data={popularListData}
                            onChange={this.handleStandardTableChange}
                            setPopular={this.handlerSetPopular}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
