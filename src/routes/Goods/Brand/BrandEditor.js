import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Form, message, Modal, List, Row, Pagination, Badge } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
import SeriesTableForm from './SeriesTableForm';
import { IMG_SERVER } from '../../../config';

const { TextArea } = Input;

@connect(state => ({
    brand: state.brand,
}))
@Form.create()
export default class BrandEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seriesImgModalVisible: false,
            seriedImg: '',
            seriesImgArr: {
                list: [],
                pagination: {
                    total: 0,
                    current: 1,
                },
            },
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'brand/detail',
            payload: id,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { form: { setFieldsValue }, brand: { detail } } = nextProps;
        if (detail._id !== this.props.brand.detail._id) {
            setFieldsValue({
                name: detail.name,
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'brand/clearDetail',
        });
    }

    handlerSubmit = () => {
        const { dispatch, form: { validateFieldsAndScroll }, brand: { detail } } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error(err.name.errors[0].message);
            } else {
                dispatch({
                    type: 'brand/update',
                    payload: {
                        ...values,
                        id: detail._id,
                    },
                });
            }
        });
    }

    handleShowSetSeriesImgModal = (seriesId) => {
        this.props.dispatch({
            type: 'brand/fetchGoodsImgBySeriesId',
            payload: {
                seriesId,
                page: 1,
                pageSize: 12,
            },
            callback: (imgArrData) => {
                this.seriesId = seriesId;
                this.setState({ seriesImgModalVisible: true, seriesImgArr: imgArrData, seriedImg: imgArrData.seriedImg });
            },
        });
    }

    handleSeriesImgPageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'brand/fetchGoodsImgBySeriesId',
            payload: {
                seriesId: this.seriesId,
                page: current,
                pageSize,
            },
            callback: (imgArrData) => {
                this.setState({ seriesImgModalVisible: true, seriesImgArr: imgArrData, seriedImg: imgArrData.seriedImg });
            },
        });
    }

    handleSeriesImgSelected = (img) => {
        this.setState({
            seriedImg: img,
        });
    }

    handleSetSeriesImg = (result = false) => {
        if (result) {
            this.props.dispatch({
                type: 'brand/setSeriesImg',
                payload: {
                    img: this.state.seriedImg,
                    brandId: this.props.brand.detail._id,
                    seriesId: this.seriesId,
                },
                callback: () => {
                    this.setState({ seriesImgModalVisible: false });
                },
            });
        }
    }

    handlerSetSeriesTop = (seriesId, isTop) => {
        this.props.dispatch({
            type: 'brand/setSeriesTop',
            payload: {
                isTop,
                seriesId,
                brandId: this.props.brand.detail._id,
            },
        });
    }

    render() {
        const { seriesImgModalVisible, seriesImgArr, seriedImg } = this.state;
        const { form: { getFieldDecorator }, brand: { detail } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label="品牌名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入品牌名称' }],
                            })(
                                <TextArea placeholder="请输入品牌名称" rows={2} />
                            )}
                        </Form.Item>
                    </Form>
                    {getFieldDecorator('series', {
                        initialValue: detail.series || [],
                    })(<SeriesTableForm
                        handleShowSetSeriesImgModal={this.handleShowSetSeriesImgModal}
                        handlerSetSeriesTop={this.handlerSetSeriesTop}
                    />)}
                    <FooterToolbar>
                        <Button type="primary" onClick={this.handlerSubmit} loading={false}>
                            提交
                        </Button>
                    </FooterToolbar>
                </Card>
                <Modal
                    title="设置系列配图"
                    visible={seriesImgModalVisible}
                    onOk={this.handleSetSeriesImg}
                    onCancel={this.handleSetSeriesImg}
                    width={1200}
                >
                    <List
                        rowKey="id"
                        grid={{ lg: 6, md: 1, sm: 1, xs: 1 }}
                        dataSource={seriesImgArr.list}
                        renderItem={item => (
                            <List.Item key={item._id}>
                                <Badge dot={seriedImg === item.img}>
                                    <Row type="flex" justify="center">
                                        <img
                                            style={{ width: '120px', height: '120px' }}
                                            alt={item.name}
                                            src={`${IMG_SERVER}/${item.img}`}
                                            onClick={() => this.handleSeriesImgSelected(item.img)}
                                        />
                                    </Row>
                                </Badge>
                            </List.Item>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination current={seriesImgArr.pagination.current} total={seriesImgArr.pagination.total} pageSize={12} onChange={this.handleSeriesImgPageChange} />
                    </Row>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
