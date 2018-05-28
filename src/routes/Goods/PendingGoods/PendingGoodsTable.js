import React from 'react';
// import { Divider } from 'antd';
import StandardTable from '../../../components/StandardTable';
import { QINIU_DOMAIN } from '../../../config';

export default class PendingGoodsTable extends StandardTable {
    createRowSelection = () => null;

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
                render: (text, record) => (
                    <a href={record.url} target="_blank">{record.name}</a>
                ),
            },
            {
                title: '主图',
                render: (text, record) => (
                    <img style={{ width: '130px' }} alt={record.name} src={`${QINIU_DOMAIN}/goods/${record.number.replace(/[ /]/g, '_')}/${record.imgs[0]}`} />
                ),
            },
            // {
            //     title: '操作',
            //     width: '180px',
            //     render: (text, record) => (
            //         record.is_checked ? (
            //             '已处理'
            //         ) : (
            //             <div>
            //                 {
            //                     !record.has_same_goods_type_name && <a onClick={() => this.props.onAddGoodsType(record)}>添加款型</a>
            //                 }
            //                 {
            //                     !record.has_same_goods_type_name && <Divider type="vertical" />
            //                 }
            //                 <a onClick={() => this.props.onRelationGoodsType(record)}>关联款型</a>
            //             </div>
            //         )
            //     ),
            // },
        ];
    };
}
