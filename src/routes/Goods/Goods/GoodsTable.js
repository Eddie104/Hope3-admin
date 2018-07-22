import React from 'react';
import { Divider, Popconfirm } from 'antd';
import { Link } from 'dva/router';
import StandardTable from '../../../components/StandardTable';
import { IMG_SERVER } from '../../../config';

export default class GoodsTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        const { from } = this.props;
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
                render: (text, record) => (
                    <a href={record.url} target="_blank">
                        {text}
                    </a>
                ),
            },
            {
                title: '图片',
                render: (text, record) => (
                    <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />
                ),
            },
            from === 'goodsColorEditor' ? {
                title: '操作',
                width: '120px',
                render: (_, record) => (
                    <div>
                        <Link to={`/goods/goods-editor/${record._id}`}>
                            编辑
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除配色里的商品数据？" onConfirm={() => this.props.onRemoveGoods(record._id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                ),
            } : {
                title: '操作',
                width: '100px',
                render: (_, record) => (
                    <Link to={`/goods/goods-editor/${record._id}`}>
                        编辑
                    </Link>
                ),
            },
        ];
    };
}
