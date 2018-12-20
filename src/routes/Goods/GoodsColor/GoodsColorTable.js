import React from 'react';
// import { Divider } from 'antd';
// import { Link } from 'dva/router';
import StandardTable from '../../../components/StandardTable';
import { IMG_SERVER } from '../../../config';

export default class GoodsColorTable extends StandardTable {
    // createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '100px',
            },
            {
                title: '名称',
                dataIndex: 'color_name',
                width: '250px',
            },
            {
                title: '图片',
                render: (text, record) => (
                    <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />
                ),
            },
            {
                title: '操作',
                width: '120px',
                render: (_, record) => (
                    <div>
                        {
                            this.props.setPopular && record.is_popular && <a onClick={() => { this.props.setPopular(record._id, false); }}>设为不流行</a>
                        }
                        {
                            this.props.setPopular && !record.is_popular && <a onClick={() => { this.props.setPopular(record._id, true); }}>设为流行</a>
                        }
                        {
                            // <Divider type="vertical" />
                        }
                        {
                            this.props.setRecommend && record.is_recommend && <a onClick={() => { this.props.setRecommend(record._id, false); }}>设为不推荐</a>
                        }
                        {
                            this.props.setRecommend && !record.is_recommend && <a onClick={() => { this.props.setRecommend(record._id, true); }}>设为推荐</a>
                        }
                    </div>
                ),
            },
        ];
    };
}
