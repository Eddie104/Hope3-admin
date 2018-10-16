import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function add(params) {
    return post(`${SERVER_URL}/api/admin/add_category`, params);
}
export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_category`, params);
}
export async function detail(id) {
    return get(`${SERVER_URL}/api/admin/detail_category/${id}`);
}
export async function update(params) {
    return post(`${SERVER_URL}/api/admin/update_category`, params);
}
export async function fetchSubCategory(categoryId) {
    return get(`${SERVER_URL}/api/admin/fetch_sub_category/${categoryId}`);
}
