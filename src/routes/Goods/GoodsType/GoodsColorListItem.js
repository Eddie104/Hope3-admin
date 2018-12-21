import React, { Component } from 'react';
import { Button, Row, List, Icon, Checkbox, Popconfirm, Tag } from 'antd';
import { IMG_SERVER } from '../../../config';

export default class GoodsColorListItem extends Component {
    render() {
        const {
            goodsColor,
            targetGoodsColorId,
            onGoodsColorClick,
            onGoodsColorCheckboxChange,
            onRemoveGoodsColor,
        } = this.props;
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
                            onGoodsColorClick(goodsColor._id);
                        }
                    }}
                >
                    <img
                        style={{ width: '120px', height: '120px' }}
                        alt={goodsColor.img}
                        src={`${IMG_SERVER}/${goodsColor.img}`}
                    />
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
                        onChange={({ target: { checked } }) => onGoodsColorCheckboxChange(goodsColor, checked)}
                    >
                        {goodsColor.color_name || 'no name'}
                    </Checkbox>
                </Row>
                <Row type="flex" justify="center">
                    <Popconfirm
                        title="是否要删除配色数据？"
                        onConfirm={() => onRemoveGoodsColor(goodsColor._id)}
                    >
                        <Button type="danger">
                            删除
                        </Button>
                    </Popconfirm>
                </Row>
            </List.Item>
        );
    }
}
