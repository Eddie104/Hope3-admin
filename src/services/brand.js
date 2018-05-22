import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_brand`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/admin/detail_brand/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/admin/update_brand`, params);
}

export async function add(params) {
    return post(`${SERVER_URL}/admin/add_brand`, params);
}

export async function remove(id) {
    return get(`${SERVER_URL}/admin/remove_brand/${id}`);
}
