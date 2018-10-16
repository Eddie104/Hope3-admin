import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_platform`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/api/admin/detail_platform/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/api/admin/update_platform`, params);
}

export async function add(params) {
    return post(`${SERVER_URL}/api/admin/add_platform`, params);
}
