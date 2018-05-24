import React from 'react';
// import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../components/StandardTable';

export default class NaiFenTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: '产品名称',
                dataIndex: 'name',
            },
            {
                title: '商品id',
                dataIndex: 'url',
                render: text => (
                    <a href={`http://www.naifen123.cn${text}`} target="_blank">
                        {text}
                    </a>
                ),
            },
            {
                title: '其他配方',
                dataIndex: 'qiTaPeiFang',
            },
            {
                title: '适用年龄',
                dataIndex: 'age',
            },
            {
                title: '是否有机',
                dataIndex: 'youJi',
            },
            {
                title: '奶类品牌数据',
                dataIndex: 'shuXing',
            },
            {
                title: '基础配方',
                dataIndex: 'peiFang',
            },
            {
                title: '品牌',
                dataIndex: 'pinPai',
            },
            {
                title: '原料要求',
                dataIndex: 'yaoQiu',
            },
            {
                title: '产地',
                dataIndex: 'changDi',
            },
            {
                title: '特殊奶粉',
                dataIndex: 'teShu',
            },
        ];
    };
}
