import * as storage from '../utils/storage';

const menuData1 = [
    {
        name: '商品',
        icon: 'user',
        path: 'goods',
        children: [
            {
                name: '奶粉',
                path: 'naifen',
            },
        ],
    },
];

const menuData = [
    {
        name: '商品',
        icon: 'desktop',
        path: 'goods',
        children: [
            {
                name: '平台列表',
                path: 'platform-list',
            },
            {
                name: '品牌列表',
                path: 'brand-list',
            },
            {
                name: '类目列表',
                path: 'category-list',
            },
            {
                name: '款型列表',
                path: 'goods-type-list',
            },
            {
                name: '商品列表',
                path: 'goods-list',
            },
            {
                name: '待处理商品列表',
                path: 'pending-goods-list',
            },
        ],
    },
    {
        name: 'APP',
        icon: 'mobile',
        path: 'app',
        children: [
            {
                name: '置顶系列',
                path: 'top-series-list',
            },
            {
                name: '流行配色',
                path: 'popular-goods-color-list',
            },
            {
                name: '推荐配色',
                path: 'recommend-goods-color-list',
            },
        ],
    },
];

let menuDataLast = null;
const userStr = storage.getItem(storage.USER);
if (userStr) {
    try {
        const userJson = JSON.parse(userStr);
        if (userJson.userName === 'admin') {
            menuDataLast = menuData1;
        } else {
            menuDataLast = menuData;
        }
    } catch (error) {
        menuDataLast = menuData;
    }
} else {
    menuDataLast = menuData;
}

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

export const getMenuData = () => formatter(menuDataLast);
