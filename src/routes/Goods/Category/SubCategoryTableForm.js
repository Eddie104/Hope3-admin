import React from 'react';
import { Input, Divider } from 'antd';
import TableForm from '../../../components/TableForm';
export default class SubCategoryTableForm extends TableForm {
    constructor(props) {
        super(props);
        this.initOperation();
    }
    createColumns = () => {
        return [
            {
                title: '子类目',
                dataIndex: 'name',
                key: 'name',
                // width: '60%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                                // onBlur={e => this.saveRow(e, record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入子类目名称"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '子类目ID',
                dataIndex: '_id',
                key: '_id',
                render: (text) => {
                    return text;
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
