import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import SeriesTable from './SeriesTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

@connect(state => ({
    brand: state.brand,
}))
export default class TopSeriesList extends PureComponent {
    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'brand/findTopSeries',
        });
    }

    handlerSetSeriesTop = (seriesId, isTop) => {
        this.props.dispatch({
            type: 'brand/setSeriesTop',
            payload: {
                isTop,
                seriesId,
                from: 'topSeriesList',
            },
        });
    }

    render() {
        const { brand: { topSeriesArr } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <SeriesTable
                            data={{
                                list: topSeriesArr,
                                pagination: {
                                    total: topSeriesArr.length,
                                    current: 1,
                                },
                            }}
                            handlerSetSeriesTop={this.handlerSetSeriesTop}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
