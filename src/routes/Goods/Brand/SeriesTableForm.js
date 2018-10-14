import React from 'react';
import { Input, Button, Divider, Popconfirm } from 'antd';
import TableForm from '../../../components/TableForm';
import { IMG_SERVER } from '../../../config';

export default class SeriesTableForm extends TableForm {
    constructor(props) {
        super(props);
        this.initOperation();
    }

    createColumns = () => {
        return [
            {
                title: '系列名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入系列名称"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '系列图片',
                dataIndex: 'img',
                key: 'img',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.props.handleShowSetSeriesImgModal(record._id);
                                }}
                            >
                                替换
                            </Button>
                        );
                    }
                    return <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />;
                },
            },
        ];
    }

    initOperation = () => {
        // 操作栏
        this.operationCol = {
            title: '操作',
            key: 'action',
            width: '180px',
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
                            record.is_top && <a onClick={() => this.setTop(record._id, false)}>取消置顶</a>
                        }
                        {
                            !record.is_top && <a onClick={() => this.setTop(record._id, true)}>置顶</a>
                        }
                        <Divider type="vertical" />
                        <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.remove(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                );
            },
        };
    }

    setTop(seriesId, isTop) {
        this.props.handlerSetSeriesTop(seriesId, isTop);
    }
}
