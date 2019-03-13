import React from 'react';
import { Link } from 'dva/router';
import { Tag, Divider } from 'antd';
import StandardTable from '../../../components/StandardTable';
import { IMG_SERVER } from '../../../config';

export default class GoodsTypeTable extends StandardTable {
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
                dataIndex: 'name',
                width: '250px',
            },
            {
                title: '标签',
                dataIndex: 't',
                render: (_, record) => {
                    if (record.is_hot) {
                        return <Tag color="#f50">热门</Tag>;
                    }
                    return null;
                },
            },
            {
                title: '图片',
                render: (text, record) => (
                    <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />
                ),
            },
            {
                title: '系列',
                dataIndex: 'seriesName',
            },
            {
                title: '子类目',
                dataIndex: 'subCategory',
            },
            {
                title: '操作',
                width: '100px',
                render: (_, record) => (
                    <div>
                        <Link to={`/goods/goods-type-editor/${record._id}`}>
                            编辑
                        </Link>
                        <Divider type="vertical" />
                        {
                            record.is_showing_on_app ? (
                                <a onClick={() => { this.props.setShowingInApp(record._id, false); }}>
                                    在APP上隐藏
                                </a>
                            ) : (
                                <a onClick={() => { this.props.setShowingInApp(record._id, true); }}>
                                    在APP上显示
                                </a>
                            )
                        }
                    </div>
                ),
            },
        ];
    };
}
