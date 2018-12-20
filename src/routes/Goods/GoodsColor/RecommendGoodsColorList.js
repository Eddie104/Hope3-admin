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
export default class RecommendGoodsColorList extends PureComponent {
    componentDidMount() {
        this.handleSearch();
    }

    handleStandardTableChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'goodsColor/findRecommend',
            payload: {
                page: pagination.current,
                count: pagination.pageSize,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, goodsColor: { recommendListData } } = this.props;
        if (!e && recommendListData.list.length > 0) return;
        dispatch({
            type: 'goodsColor/findRecommend',
            payload: {
                page: 1,
                count: 10,
            },
        });
    }

    handlerSetRecommend = (id, isRecommend) => {
        this.props.dispatch({
            type: 'goodsColor/update',
            payload: {
                _id: id,
                is_recommend: isRecommend,
                from: 'recommendGoodsColorList',
            },
        });
    }

    render() {
        const { goodsColor: { loading, recommendListData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <GoodsColorTable
                            loading={loading}
                            data={recommendListData}
                            onChange={this.handleStandardTableChange}
                            setRecommend={this.handlerSetRecommend}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
