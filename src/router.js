import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import * as storage from './utils/storage';

import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const UserLayout = routerData['/user'].component;
    const BasicLayout = routerData['/'].component;

    /**
     * 验证登录
     */
    const checkAuth = () => {
        const user = storage.getItem(storage.USER);
        return user;
    };

    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path="/user" render={props => <UserLayout {...props} />} />
                    {/* <Route path="/" render={props => <BasicLayout {...props} />} /> */}
                    <Route
                        path="/"
                        render={(props) => {
                            return checkAuth() ? <BasicLayout {...props} /> : <Redirect to={{ pathname: '/user/login' }} />;
                        }}
                    />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
