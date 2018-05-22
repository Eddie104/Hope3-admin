import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, Radio, message } from 'antd';
import GoodsTypeTable from './GoodsTypeTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { GENDER } from '../../../config';
import styles from '../../style.less';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIELDS = {
    name: 1,
    gender: 1,
    id: 1,
};

@connect(state => ({
    goodsType: state.goodsType,
}))
@Form.create()
export default class GoodsTypeList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mergeModalVisible: false,
            selectRows: [],
            mergeTargetValue: null,
        };
    }

    componentDidMount() {
        const { goodsType: { findFormValue }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: findFormValue.name,
            brand_id: findFormValue.brand_id,
            gender: findFormValue.gender,
        });
        this.handleSearch();
    }

    onMergeTargetChange = ({ target: { value } }) => {
        this.setState({
            mergeTargetValue: value,
        });
    }

    handleStandardTableChange = (pagination, filtersArg) => {
        const { dispatch, goodsType: { findFormValue } } = this.props;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            page: pagination.current,
            count: pagination.pageSize,
            ...findFormValue,
            ...filters,
        };
        dispatch({
            type: 'goodsType/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'goodsType/find',
            payload: {
                fields: FIELDS,
                page: 1,
                count: 10,
                resetFormValue: true,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form, goodsType: { listData } } = this.props;
        if (!e && listData.list.length > 0) return;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'goodsType/find',
                payload: {
                    fields: FIELDS,
                    page: 1,
                    count: 10,
                    ...values,
                },
            });
        });
    }

    handleCreateGoodsType = () => {
        this.props.dispatch({
            type: 'goodsType/createGoodsType',
        });
    }

    handleShowMergeGoodsType = (flag) => {
        this.setState({
            mergeModalVisible: !!flag,
            mergeTargetValue: null,
        });
    }

    handleMergeGoodsType = () => {
        const { mergeTargetValue, selectRows } = this.state;
        if (mergeTargetValue) {
            const idArr = selectRows.map(row => row._id).filter(item => item !== mergeTargetValue);
            this.props.dispatch({
                type: 'goodsType/merge',
                payload: {
                    idArr,
                    target: mergeTargetValue,
                },
                callback: () => {
                    this.handleShowMergeGoodsType();
                },
            });
        } else {
            message.error('亲，你还没有选择需要保留的款型!!!');
        }
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectRows: rows,
        });
    }

    // handleAddInput = (e) => {
    //     this.setState({
    //         addInputValue: e.target.value,
    //     });
    // }

    // handleAdd = () => {
    //     this.props.dispatch({
    //         type: 'goodsType/add',
    //         payload: {
    //             name: this.state.addInputValue,
    //         },
    //         callback: () => {
    //         },
    //     });
    // }

    handleRemove = (id) => {
        this.props.dispatch({
            type: 'goodsType/remove',
            payload: {
                id,
            },
        });
    }

    renderForm() {
        const { form: { getFieldDecorator }, goodsType: { formBrandArr } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                        <FormItem label="款型名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入款型名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="品牌名称">
                            {getFieldDecorator('brand_id', { initialValue: 'all' })(
                                <Select>
                                    {
                                        formBrandArr.map((item, i) => (
                                            <Option key={i} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="品牌性别">
                            {getFieldDecorator('gender', { initialValue: '-1' })(
                                <Select>
                                    <Option key={-1} value={-1}>
                                        所有
                                    </Option>
                                    {
                                        GENDER.map((item, i) => (
                                            <Option key={i} value={i}>
                                                {item}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { mergeModalVisible, selectRows, mergeTargetValue } = this.state;
        const { goodsType: { loading, listData } } = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.handleCreateGoodsType}>
                                新建
                            </Button>
                            {
                                selectRows.length > 1 && (
                                    <Button icon="plus-square-o" type="primary" onClick={this.handleShowMergeGoodsType}>
                                        合并
                                    </Button>
                                )
                            }
                        </div>
                        <GoodsTypeTable
                            loading={loading}
                            data={listData}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                            remove={this.handleRemove}
                        />
                    </div>
                </Card>
                <Modal
                    title="选择要保留的款型"
                    visible={mergeModalVisible}
                    onOk={this.handleMergeGoodsType}
                    onCancel={() => this.handleShowMergeGoodsType(false)}
                >
                    <RadioGroup onChange={this.onMergeTargetChange} value={mergeTargetValue}>
                        {
                            selectRows.map(row => (
                                <Radio style={radioStyle} key={row._id} value={row._id}>{row.name}</Radio>
                            ))
                        }
                    </RadioGroup>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
