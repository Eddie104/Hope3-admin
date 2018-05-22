import React from 'react';
import { Link } from 'dva/router';
import StandardTable from '../../../components/StandardTable';

export default class CategoryTable extends StandardTable {
    createRowSelection = () => null;
    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '100px',
            },
            {
                title: '类目名字',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: (text, record) => (
                    <div>
                        <Link to={`/goods/edit-category/${record._id}`}>
                            编辑
                        </Link>
                        {/* <Divider type="vertical" />
                        <a href="">订阅警报</a> */}
                    </div>
                ),
            },
        ];
    };
}
