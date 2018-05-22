import React from 'react';
import { Link } from 'dva/router';
import StandardTable from '../../../components/StandardTable';

export default class PlatformTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: '平台名称',
                dataIndex: 'name',
            },
            {
                title: '平台域名',
                dataIndex: 'domain',
            },
            {
                title: '操作',
                render: (text, record) => (
                    <div>
                        <Link to={`/goods/edit-platform/${record._id}`}>
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
