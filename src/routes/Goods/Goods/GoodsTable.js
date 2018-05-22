import React from 'react';
import { Link } from 'dva/router';
import { Tag, Divider, message } from 'antd';
import StandardTable from '../../../components/StandardTable';
import { getGoodsImg, getGoodsTypeImg } from '../../../utils/utils';

export default class GoodsTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: '50%',
                render: (text, record) => {
                    return (
                        <div>
                            <Link to="route" target="_blank" onClick={(event) => { event.preventDefault(); window.open(record.subscribeUrl); }}>
                                {text}
                            </Link>
                            {!record.type && <Tag color="#f50">款型未匹配</Tag>}
                            {!record.type_checked && <Tag color="#f50">匹配款型未确认</Tag>}
                        </div>
                    );
                },
            },
            {
                title: '商品图片',
                dataIndex: 'img',
                width: '80px',
                render: (text, record) => (
                    <img alt={record.name} src={getGoodsImg(record._id)} style={{ width: '80px', height: '80px' }} />
                ),
            },
            {
                title: '款型名称',
                dataIndex: 'goodsTypeName',
            },
            // {
            //     title: '款型图片',
            //     dataIndex: 'goodsTypeImg',
            //     width: '80px',
            //     render: (text, record) => (
            //         <img alt={record.goodsTypeName} src={getGoodsTypeImg(record.type)} style={{ width: '80px', height: '80px' }} />
            //     ),
            // },
            {
                title: '操作',
                width: '220px',
                render: (text, record) => (
                    <div>
                        <a
                            onClick={() => {
                                const { handleGoodsTypeModalVisible } = this.props;
                                if (typeof handleGoodsTypeModalVisible === 'function') {
                                    handleGoodsTypeModalVisible(true, record);
                                } else {
                                    message.error('该页面不支持关联款型的功能');
                                }
                            }}
                        >关联款型
                        </a>
                        <Divider type="vertical" />
                        {
                            record.type && !record.type_checked && (
                                <a
                                    onClick={() => {
                                        const { handleUpdateGoodsTypeChecked } = this.props;
                                        if (typeof handleUpdateGoodsTypeChecked === 'function') {
                                            handleUpdateGoodsTypeChecked(record._id);
                                        } else {
                                            message.error('该页面不支持确认款型的功能');
                                        }
                                    }}
                                >确认款型
                                </a>
                            )
                        }
                        {
                            record.type && !record.type_checked && <Divider type="vertical" />
                        }
                        <Link to={`/goods/edit-goods/${record._id}`}>
                            编辑
                        </Link>
                    </div>
                ),
            },
        ];
    };
}
