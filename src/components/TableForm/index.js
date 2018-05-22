import React, { PureComponent } from 'react';
import { Table, Button, Popconfirm, Divider } from 'antd';
import styles from './index.less';

export default class TableForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
        };

        this.index = 0;
        this.cacheOriginData = {};
        this.initOperation();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }

    getRowByKey(key) {
        return this.state.data.filter(item => item.key === key)[0];
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             this.props.dispatch({
    //                 type: 'form/submit',
    //                 payload: values,
    //             });
    //         }
    //     });
    // }

    toggleEditable(e, key) {
        e.preventDefault();
        const target = this.getRowByKey(key);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[key] = { ...target };
            }
            target.editable = !target.editable;
            this.setState({ data: [...this.state.data] });
        }
    }

    remove(key) {
        const newData = this.state.data.filter(item => item.key !== key);
        this.setState({ data: newData });
        this.props.onChange(newData);
    }

    newMember = () => {
        const newData = [...this.state.data];
        newData.push({
            key: `NEW_TEMP_ID_${this.index}`,
            workId: '',
            name: '',
            department: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    }

    handleKeyPress(e, key) {
        if (e.key === 'Enter') {
            this.saveRow(e, key);
        }
    }

    handleFieldChange(e, fieldName, key) {
        const newData = [...this.state.data];
        const target = this.getRowByKey(key);
        if (target) {
            target[fieldName] = e.target.value;
            target.changed = true;
            this.setState({ data: newData });
        }
    }

    saveRow(e, key) {
        e && e.persist();
        // save field when blur input
        const t = setTimeout(() => {
            clearTimeout(t);
            const arr = ['TEXTAREA', 'INPUT'];
            if (arr.includes(document.activeElement.tagName) && document.activeElement !== e.target) {
                return;
            }
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowByKey(key) || {};
            if (this.validate(target)) {
                delete target.isNew;
                this.toggleEditable(e, key);
                this.props.onChange && this.props.onChange(this.state.data);
            }
        }, 10);
    }

    createColumns = () => {
        return [];
    }

    validate = (target) => { // eslint-disable-line no-unused-vars
        return true;
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

    cancel(e, key) {
        this.clickedCancel = true;
        e && e.preventDefault();
        const target = this.getRowByKey(key);
        if (this.cacheOriginData[key]) {
            Object.assign(target, this.cacheOriginData[key]);
            target.editable = false;
            delete this.cacheOriginData[key];
        }
        this.setState({ data: [...this.state.data] });
    }

    render() {
        let columns = this.createColumns();
        columns = columns.concat(this.operationCol);
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={(record) => {
                        return record.editable ? styles.editable : '';
                    }}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增一行数据
                </Button>
            </div>
        );
    }
}
