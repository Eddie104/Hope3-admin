import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class GoodsColorNumberTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: '编号',
                dataIndex: 'number',
                key: 'number',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'number', record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="请输入编号"
                            />
                        );
                    }
                    return text;
                },
            },
        ];
    }
}
