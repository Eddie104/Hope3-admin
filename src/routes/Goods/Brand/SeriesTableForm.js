import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class SeriesTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: '系列名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    console.log(record);
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
        ];
    }
}
