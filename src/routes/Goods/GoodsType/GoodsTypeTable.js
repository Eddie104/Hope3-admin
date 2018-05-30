import React from 'react';
import StandardTable from '../../../components/StandardTable';

export default class GoodsTypeTable extends StandardTable {
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
                // render: (text, record) => (
                //     <a href={record.url} target="_blank">{record.name}</a>
                // ),
            },
            // {
            //     title: '主图',
            //     render: (text, record) => (
            //         <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.platform}/${record.imgs[0]}`} />
            //     ),
            // },
            {
                title: '操作',
                width: '100px',
                render: () => (
                    <a>详情</a>
                ),
            },
        ];
    };
}
