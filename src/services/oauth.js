import { token } from '../utils/request';
import { SERVER_URL } from '../config';

export async function login(params) {
    const bodyStrArr = [];
    for (const key in params) {
        if (params[key]) {
            bodyStrArr.push(`${key}=${params[key]}`);
        }
    }
    return token(`${SERVER_URL}/oauth2/access_token`, `grant_type=password&${bodyStrArr.join('&')}`);
}
