import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function detail(params) {
    return post(`${SERVER_URL}/admin/detail_goods_color`, params);
}

export async function update(params) {
    return post(`${SERVER_URL}/admin/update_goods_color`, params);
}

export async function removeGoods(_id, goodsId) {
    return get(`${SERVER_URL}/admin/remove_goods/${_id}/${goodsId}`);
}
