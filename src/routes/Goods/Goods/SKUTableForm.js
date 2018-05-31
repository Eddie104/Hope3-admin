import React from 'react';
import { Input, Divider } from 'antd';
import TableForm from '../../../components/TableForm';
import MyCheckbox from '../../../components/MyCheckbox';

export default class SKUTableForm extends TableForm {
    constructor(props) {
        super(props);
        this.initOperation();
    }
    createColumns = () => {
        return [
            {
                title: '鞋码',
                dataIndex: 'size',
                key: 'size',
                // width: '60%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'size', record.key)}
                                // onBlur={e => this.saveRow(e, record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入鞋码"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'price', record.key)}
                                // onBlur={e => this.saveRow(e, record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入价格"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '库存',
                dataIndex: 'isInStock',
                key: 'isInStock',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <MyCheckbox
                                value={text}
                                onChange={e => this.handleFieldChange({ target: { value: e.target.checked } }, 'isInStock', record.key)}
                            />
                        );
                    }
                    return text ? '有' : '没有';
                },
            },
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
                        <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                    </span>
                );
            },
        };
    }
    validate = () => {
        return true;
    }
}
