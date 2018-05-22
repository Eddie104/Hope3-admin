import React from 'react';
import { Input, Divider, Popconfirm, message } from 'antd';
// import moment from 'moment';
import TableForm from '../../../components/TableForm';
import { isWebUrl } from '../../../utils/reg';
// import { dateFormat } from '../../../utils/utils';

export default class SubscribeTableForm extends TableForm {
    constructor(props) {
        super(props);
        this.initOperation();
    }

    // lookUpGoods = (e, subscribeId) => {
    //     e && e.persist();
    //     const { handleLookUpGoods } = this.props;
    //     handleLookUpGoods && handleLookUpGoods(subscribeId);
    // }

    createColumns = () => {
        return [
            {
                title: '链接',
                dataIndex: 'url',
                key: 'url',
                // width: '60%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'url', record.key)}
                                // onBlur={e => this.saveRow(e, record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入订阅链接"
                            />
                        );
                    }
                    return text;
                },
            },
            // {
            //     title: '添加时间',
            //     dataIndex: 'addAt',
            //     key: 'addAt',
            //     width: '180px',
            //     render: (text) => {
            //         return dateFormat(new Date(parseInt(moment(new Date(text)).subtract(8, 'hours').format('x'), 10)));
            //     },
            // },
            // {
            //     title: '更新时间',
            //     dataIndex: 'lastUpdateAt',
            //     key: 'lastUpdateAt',
            //     width: '180px',
            //     render: (text) => {
            //         return dateFormat(new Date(parseInt(moment(new Date(text)).subtract(8, 'hours').format('x'), 10)));
            //     },
            // },
            // {
            //     title: '商家ID',
            //     dataIndex: 'shopId',
            //     key: 'shopId',
            //     width: '10%',
            //     render: (text, record) => {
            //         if (record.editable) {
            //             return (
            //                 <Input
            //                     value={text}
            //                     // onChange={e => this.handleFieldChange(e, 'link', record.key)}
            //                     // onBlur={e => this.saveRow(e, record.key)}
            //                     // onKeyPress={e => this.handleKeyPress(e, record.key)}
            //                     placeholder="请输入订阅链接"
            //                 />
            //             );
            //         }
            //         return text;
            //     },
            // },
        ];
    }

    initOperation = () => {
        // 操作栏
        this.operationCol = {
            title: '操作',
            key: 'action',
            width: '120px',
            render: (text, record) => {
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={(e) => { this.saveRow(e, record.key); }}>保存</a>
                                <Divider type="vertical" />
                                <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.remove(record.key)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={(e) => { this.saveRow(e, record.key); }}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancel(e, record.key)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        {
                            record.is_subscribe ? (
                                <a onClick={() => { this.props.subscribe(record._id, false); }}>暂定订阅</a>
                            ) : (
                                <a onClick={() => { this.props.subscribe(record._id, true); }}>开始订阅</a>
                            )
                        }
                        {/* <a onClick={(e) => { this.lookUpGoods(e, record._id); }}>查看商品</a> */}
                        {/* <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.remove(record.key)}>
                            <a>删除</a>
                        </Popconfirm> */}
                    </span>
                );
            },
        };
    }

    validate = (target) => {
        const { url } = target;
        if (isWebUrl(url)) {
            const { data } = this.state;
            let count = 0;
            for (let index = 0; index < data.length; index += 1) {
                const element = data[index];
                if (element.url === url) {
                    count += 1;
                }
            }
            if (count > 1) {
                message.error('请勿添加重复订阅地址');
                return false;
            }
            return true;
        }
        message.error('请输入正确的网址');
        return false;
    }
}
