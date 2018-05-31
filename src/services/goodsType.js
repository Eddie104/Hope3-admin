import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

// export async function add(params) {
//     return post(`${SERVER_URL}/admin/add_category`, params);
// }

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_goods_type`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/admin/detail_goods_type/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/admin/update_goods_type`, params);
}

export async function fetchSubCategory(categoryId) {
    return get(`${SERVER_URL}/admin/fetch_sub_category/${categoryId}`);
}
