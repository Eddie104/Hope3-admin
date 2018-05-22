import React, { PureComponent } from 'react';
import { Upload, Icon, Input, Button, Row, Card } from 'antd';
import { beforeUpload, getBase64 } from '../../../utils/utils';
import styles from './style.less';

export default class ImgUpLoader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: props.imageUrl,
            webImgUrl: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imageUrl: nextProps.imageUrl,
        });
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            const { responseCallback } = this.props;
            responseCallback && responseCallback(info.file.response.data);
        }
    }

    handleDownload = () => {
        this.props.dispath({
            type: this.props.downloadType || 'goodsType/downloadImg',
            payload: {
                id: this.props.goodsTypeId,
                index: this.props.index,
                url: this.state.webImgUrl,
                colorId: this.props.colorId,
            },
        });
    }

    handleWebImgUrlChange = (e) => {
        this.setState({
            webImgUrl: e.target.value,
        });
    }

    render() {
        const { action } = this.props;
        const { imageUrl, loading, webImgUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Card>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={action}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img className={styles.goodsTypeImg} src={imageUrl} alt="" /> : uploadButton}
                </Upload>
                <Row type="flex" justify="start">
                    <Input className={styles.goodsTypeImg} value={webImgUrl} placeholder="图片网址" onChange={this.handleWebImgUrlChange} />
                    <Button className={styles.imgBtn} type="primary" onClick={this.handleDownload}>确定</Button>
                </Row>
            </Card>
        );
    }
}
