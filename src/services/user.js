import { get } from '../utils/request';
import { getItem, USER } from '../utils/storage';

export async function query() {
    return get('/api/users');
}

export async function queryCurrent() {
    const user = JSON.parse(getItem(USER));
    return {
        notifyCount: 0,
        name: user.userName,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: user.userId,
    };
}
