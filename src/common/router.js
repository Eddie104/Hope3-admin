import React from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
    app,
    // eslint-disable-next-line no-underscore-dangle
    models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
        const routerData = getRouterData(app);
        return component().then((raw) => {
            const Component = raw.default || raw;
            return props => <Component {...props} routerData={routerData} />;
        });
    },
});

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = item.name;
            keys = { ...keys, ...getFlatMenuData(item.children) };
        } else {
            keys[item.path] = item.name;
        }
    });
    return keys;
}

export const getRouterData = (app) => {
    const routerData = {
        '/': {
            component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
        },
        '/result/success': {
            component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
        },
        '/result/fail': {
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
        },
        '/exception/403': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
        },
        '/exception/404': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
        },
        '/exception/500': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
        },
        '/exception/trigger': {
            component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
        },
        '/user': {
            component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
        },
        '/user/login': {
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
        },
        '/goods/platform-list': {
            component: dynamicWrapper(app, ['platform'], () => import('../routes/Goods/Platform/PlatformList')),
        },
        '/goods/edit-platform/:id': {
            component: dynamicWrapper(app, ['platform'], () => import('../routes/Goods/Platform/PlatformEditor')),
        },
        // '/goods/goods-type-list': {
        //     component: dynamicWrapper(app, ['goodsType'], () => import('../routes/Goods/GoodsType/GoodsTypeList')),
        // },
        // '/goods/edit-goods-type/:id': {
        //     component: dynamicWrapper(app, ['goodsType', 'category'], () => import('../routes/Goods/GoodsType/GoodsTypeEditor')),
        // },
        '/goods/brand-list': {
            component: dynamicWrapper(app, ['brand'], () => import('../routes/Goods/Brand/BrandList')),
        },
        '/goods/goods-type-list': {
            component: dynamicWrapper(app, ['goodsType'], () => import('../routes/Goods/GoodsType/GoodsTypeList')),
        },
        '/goods/goods-type-editor/:id': {
            component: dynamicWrapper(app, ['goodsType', 'goodsColor'], () => import('../routes/Goods/GoodsType/GoodsTypeEditor')),
        },
        '/goods/naifen': {
            component: dynamicWrapper(app, ['naifen'], () => import('../routes/Tmp/NaiFenList')),
        },
        '/goods/edit-brand/:id': {
            component: dynamicWrapper(app, ['brand'], () => import('../routes/Goods/Brand/BrandEditor')),
        },
        // '/goods/goods-list': {
        //     component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Goods/GoodsList')),
        // },
        // '/goods/edit-goods/:id': {
        //     component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Goods/GoodsEditor')),
        // },
        '/goods/goods-list': {
            component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Goods/GoodsList')),
        },
        '/goods/goods-editor/:id': {
            component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Goods/GoodsEditor')),
        },
        '/goods/goods-color-editor/:id': {
            component: dynamicWrapper(app, ['goodsColor'], () => import('../routes/Goods/GoodsColor/GoodsColorEditor')),
        },
        '/goods/pending-goods-list': {
            component: dynamicWrapper(app, ['pendingGoods'], () => import('../routes/Goods/PendingGoods/PendingGoodsList')),
        },
        // '/goods/similar-number-goods-list': {
        //     component: dynamicWrapper(app, ['similarNumberGoods'], () => import('../routes/Goods/PendingGoods/SimilarNumberGoodsList')),
        // },
        // '/goods/shop-list': {
        //     component: dynamicWrapper(app, ['shop'], () => import('../routes/Goods/Shop/ShopList')),
        // },
        // '/goods/edit-shop/:id': {
        //     component: dynamicWrapper(app, ['shop'], () => import('../routes/Goods/Shop/ShopEditor')),
        // },
        '/goods/category-list': {
            component: dynamicWrapper(app, ['category'], () => import('../routes/Goods/Category/CategoryList')),
        },
        '/goods/edit-category/:id': {
            component: dynamicWrapper(app, ['category'], () => import('../routes/Goods/Category/CategoryEditor')),
        },
        '/app/top-series-list': {
            component: dynamicWrapper(app, ['brand'], () => import('../routes/Goods/Brand/TopSeriesList')),
        },
        '/app/popular-goods-color-list': {
            component: dynamicWrapper(app, ['goodsColor'], () => import('../routes/Goods/GoodsColor/PopularGoodsColorList')),
        },
    };
    // Get name from ./menu.js or just set it in the router data.
    const menuData = getFlatMenuData(getMenuData());
    const routerDataWithName = {};
    Object.keys(routerData).forEach((item) => {
        routerDataWithName[item] = {
            ...routerData[item],
            name: routerData[item].name || menuData[item.replace(/^\//, '')],
        };
    });
    return routerDataWithName;
};
