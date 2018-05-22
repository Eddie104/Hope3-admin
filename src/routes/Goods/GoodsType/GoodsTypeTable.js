import React from 'react';
import { Link } from 'dva/router';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';
import { GENDER } from '../../../config';

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
                title: '款型名称',
                dataIndex: 'name',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: (text) => {
                    return GENDER[text];
                },
            },
            // {
            //     title: '商品数量',
            //     render: (text, record) => (record.goodsArr ? record.goodsArr.length : 0),
            // },
            {
                title: '操作',
                render: (text, record) => (
                    <div>
                        <Link to={`/goods/edit-goods-type/${record._id}`}>
                            编辑
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.props.remove(record._id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    };
}
