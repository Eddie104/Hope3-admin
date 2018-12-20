import React, { Component } from 'react';
import { Button, Row, List, Icon, Checkbox, Popconfirm, Tag } from 'antd';
import { IMG_SERVER } from '../../../config';

export default class GoodsColorListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteBtnShowing: false,
        };
    }

    showDeleteBtn(showing) {
        this.setState({ isDeleteBtnShowing: !!showing });
    }

    render() {
        const {
            goodsColor,
            targetGoodsColorId,
            handleGoodsColorClick,
            handleGoodsColorCheckboxChange,
            handleRemoveGoodsColor,
        } = this.props;
        const { isDeleteBtnShowing } = this.state;
        return (
            <List.Item
                key={goodsColor._id}
                style={{ width: '120px', height: '240px' }}
            >
                {goodsColor.number.join('\n')}
                <Row
                    type="flex"
                    justify="center"
                    onClick={(e) => {
                        if (e.target.type !== 'button') {
                            handleGoodsColorClick(goodsColor._id);
                        }
                    }}
                >
                    <div
                        onMouseEnter={() => {
                            this.showDeleteBtn(true);
                        }}
                        onMouseLeave={() => {
                            this.showDeleteBtn(false);
                        }}
                        onBlur={() => {
                            this.showDeleteBtn(false);
                        }}
                    >
                        <img
                            style={{ width: '120px', height: '120px' }}
                            alt={goodsColor.img}
                            src={`${IMG_SERVER}/${goodsColor.img}`}
                        />
                        {
                            isDeleteBtnShowing && (
                                <Popconfirm
                                    title="是否要删除配色数据？"
                                    onConfirm={() => handleRemoveGoodsColor(goodsColor._id)}
                                >
                                    <Button
                                        type="danger"
                                        style={{
                                            position: 'absolute',
                                            top: 80,
                                            left: 30,
                                        }}
                                    >
                                        删除
                                    </Button>
                                </Popconfirm>
                            )
                        }
                    </div>
                    {
                        goodsColor._id === targetGoodsColorId && <Icon type="smile" />
                    }
                </Row>
                {
                    goodsColor.hot_degree > 0 && (
                        <Row type="flex" justify="center">
                            <Tag color="magenta">热度:{goodsColor.hot_degree}</Tag>
                        </Row>
                    )
                }
                <Row type="flex" justify="center">
                    <Checkbox
                        onChange={({ target: { checked } }) => handleGoodsColorCheckboxChange(goodsColor, checked)}
                    >
                        {goodsColor.color_name || 'no name'}
                    </Checkbox>
                </Row>
                {
                    // isDeleteBtnShowing && (
                    //     <Row type="flex" justify="center">
                    // {
                    //         <Popconfirm title="是否要删除配色数据？" onConfirm={() => handleRemoveGoodsColor(goodsColor._id)}>
                    //             <Button type="danger">删除</Button>
                    //         </Popconfirm>
                    //     }
                    //     </Row>
                    // )
                }
            </List.Item>
        );
    }
}
