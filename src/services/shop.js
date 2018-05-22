import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_shop`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/admin/detail_shop/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/admin/update_shop`, params);
}
