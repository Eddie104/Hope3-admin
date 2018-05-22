const menuData = [
    {
        name: '商品',
        icon: 'user',
        path: 'goods',
        children: [
            {
                name: '品牌列表',
                path: 'brand-list',
            },
            {
                name: '类目列表',
                path: 'category-list',
            },
            // {
            //     name: '款型列表',
            //     path: 'goods-type-list',
            // },
            // {
            //     name: '商品列表',
            //     path: 'goods-list',
            // },
            {
                name: '待处理商品列表',
                path: 'pending-goods-list',
            },
            // {
            //     path: 'edit-goods-type',
            // },
            // {
            //     name: '编号相似的待处理商品列表',
            //     path: 'similar-number-goods-list',
            // },
        ],
    },
];

function formatter(data, parentPath = '') {
    return data.map((item) => {
        const result = {
            ...item,
            path: `${parentPath}${item.path}`,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
