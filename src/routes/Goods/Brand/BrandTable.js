import React from 'react';
import { Link } from 'dva/router';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';

export default class BrandTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '100px',
            },
            {
                title: '品牌名称',
                dataIndex: 'name',
                // width: '100%',
            },
            {
                title: '操作',
                width: '120px',
                render: (text, record) => (
                    <div>
                        <Link to={`/goods/edit-brand/${record._id}`}>
                            编辑
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.props.onRemove(record._id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    };
}
