const menuData = [
    {
        name: '商品',
        icon: 'user',
        path: 'goods',
        children: [
            // {
            //     name: '平台列表',
            //     path: 'platform-list',
            // },
            // {
            //     name: '品牌列表',
            //     path: 'brand-list',
            // },
            // {
            //     name: '类目列表',
            //     path: 'category-list',
            // },
            // {
            //     name: '待处理商品列表',
            //     path: 'pending-goods-list',
            // },
            {
                name: '奶粉',
                path: 'naifen',
            },
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
