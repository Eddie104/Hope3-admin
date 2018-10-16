import { post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_naifen`, params);
}
