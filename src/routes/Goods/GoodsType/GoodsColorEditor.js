// import React, { PureComponent } from 'react';
// import { Modal, Input, Row, Form } from 'antd';
// import { IMG_SERVER } from '../../../config';
// // import GoodsColorNumberTableForm from './GoodsColorNumberTableForm';

// const FormItem = Form.Item;

// export default class GoodsColorEditor extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: !!props.visible,
//             goodsColorId: props.goodsColorId,
//             detail: {},
//         };
//     }

//     componentWillReceiveProps(nextProps) {
//         if (this.state.goodsColorId !== nextProps.goodsColorId || this.state.visible !== nextProps.visible) {
//             this.setState({
//                 visible: !!nextProps.visible,
//                 goodsColorId: nextProps.goodsColorId,
//             }, () => {
//                 if (nextProps.goodsColorId) {
//                     nextProps.dispatch({
//                         type: 'goodsColor/detail',
//                         payload: nextProps.goodsColorId,
//                     });
//                 }
//             });
//         } else if (nextProps.detail && this.state.detail._id !== nextProps.detail._id) {
//             this.setState({
//                 detail: nextProps.detail,
//             });
//         }
//     }

//     handleOk = () => {
//         const { handleOk } = this.props;
//         handleOk && handleOk(this.state.detail);
//     }

//     handleCancel = () => {
//         const { handleCancel } = this.props;
//         handleCancel && handleCancel();
//     }

//     handleGoodsColorName = ({ target: { value } }) => {
//         this.setState({
//             detail: {
//                 ...this.state.detail,
//                 color_name: value,
//             },
//         });
//     }

//     handleGoodsColorValue = ({ target: { value } }) => {
//         this.setState({
//             detail: {
//                 ...this.state.detail,
//                 color_value: value,
//             },
//         });
//     }

//     handleGoodsNumber = ({ target: { value } }) => {
//         this.setState({
//             detail: {
//                 ...this.state.detail,
//                 number: value.split(','),
//             },
//         });
//     }

//     render() {
//         const { visible, detail } = this.state;
//         return (
//             <Modal
//                 title="配色编辑"
//                 visible={visible}
//                 onOk={this.handleOk}
//                 onCancel={this.handleCancel}
//                 width={600}
//                 destroyOnClose
//             >
//                 <Row>
//                     <FormItem
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 15 }}
//                         label="名称"
//                     >
//                         <Input placeholder="请输入" onChange={this.handleGoodsColorName} value={detail ? detail.color_name : ''} />
//                     </FormItem>
//                 </Row>
//                 <Row>
//                     <FormItem
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 15 }}
//                         label="颜色"
//                     >
//                         <Input placeholder="请输入" onChange={this.handleGoodsColorValue} value={detail ? detail.color_value : ''} />
//                     </FormItem>
//                 </Row>
//                 <Row>
//                     <FormItem
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 15 }}
//                         label="编号"
//                     >
//                         <Input placeholder="请输入" onChange={this.handleGoodsNumber} value={detail && Array.isArray(detail.number) ? detail.number.join(',') : ''} />
//                     </FormItem>
//                 </Row>
//                 {
//                     detail && detail.img && (
//                         <FormItem
//                             labelCol={{ span: 5 }}
//                             wrapperCol={{ span: 15 }}
//                             label="图片"
//                         >
//                             <img
//                                 alt={detail.img}
//                                 src={`${IMG_SERVER}/${detail.img}`}
//                                 style={{ width: '120px' }}
//                             />
//                         </FormItem>
//                     )
//                 }
//             </Modal>
//         );
//     }
// }
