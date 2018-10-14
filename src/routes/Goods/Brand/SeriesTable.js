import React from 'react';
// import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';
import { IMG_SERVER } from '../../../config';

export default class SeriesTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: '系列名称',
                dataIndex: 'name',
                // width: '100%',
            },
            {
                title: '系列图片',
                dataIndex: 'img',
                key: 'img',
                render: (text, record) => {
                    // if (record.editable) {
                    //     return (
                    //         <Button
                    //             type="primary"
                    //             onClick={() => {
                    //                 this.props.handleShowSetSeriesImgModal(record._id);
                    //             }}
                    //         >
                    //             替换
                    //         </Button>
                    //     );
                    // }
                    return <img style={{ width: '130px' }} alt={record.name} src={`${IMG_SERVER}/${record.img}`} />;
                },
            },
            {
                title: '操作',
                width: '120px',
                render: (text, record) => (
                    <div>
                        {
                            record.is_top && <a onClick={() => this.setTop(record._id, false)}>取消置顶</a>
                        }
                        {
                            !record.is_top && <a onClick={() => this.setTop(record._id, true)}>置顶</a>
                        }
                        {/* <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.props.onRemove(record._id)}>
                            <a>删除</a>
                        </Popconfirm> */}
                    </div>
                ),
            },
        ];
    };

    setTop(seriesId, isTop) {
        this.props.handlerSetSeriesTop(seriesId, isTop);
    }
}
