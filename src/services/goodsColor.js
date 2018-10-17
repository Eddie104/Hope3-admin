import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function detail(params) {
    return post(`${SERVER_URL}/api/admin/detail_goods_color`, params);
}

export async function update(params) {
    return post(`${SERVER_URL}/api/admin/update_goods_color`, params);
}

export async function removeGoods(_id, goodsId) {
    return get(`${SERVER_URL}/api/admin/remove_goods/${_id}/${goodsId}`);
}

export async function findPopular(page, count) {
    return get(`${SERVER_URL}/api/admin/find_popular/${page}/${count}`);
}
