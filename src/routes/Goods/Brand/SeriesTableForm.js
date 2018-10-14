import React from 'react';
import { Input, Button } from 'antd';
import TableForm from '../../../components/TableForm';
import { IMG_SERVER } from '../../../config';

export default class SeriesTableForm extends TableForm {
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
}
