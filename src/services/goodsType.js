import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

// export async function add(params) {
//     return post(`${SERVER_URL}/api/admin/add_category`, params);
// }

export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_goods_type`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/api/admin/detail_goods_type/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/api/admin/update_goods_type`, params);
}

export async function fetchSubCategory(categoryId) {
    return get(`${SERVER_URL}/api/admin/fetch_sub_category/${categoryId}`);
}

export async function merge(params) {
    return post(`${SERVER_URL}/api/admin/merge_goods_type`, params);
}

export async function mergeGoodsColor(params) {
    return post(`${SERVER_URL}/api/admin/merge_goods_color`, params);
}

export async function removeGoodsColor(id, goodsColorId) {
    return get(`${SERVER_URL}/api/admin/remove_goods_color/${id}/${goodsColorId}`);
}
