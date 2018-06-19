import React from 'react';
import { Link } from 'dva/router';
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
                title: '图片',
                render: (text, record) => (
                    <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />
                ),
            },
            {
                title: '操作',
                width: '100px',
                render: (_, record) => (
                    <Link to={`/goods/goods-type-editor/${record._id}`}>
                        编辑
                    </Link>
                ),
            },
        ];
    };
}
