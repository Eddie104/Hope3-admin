import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function detail(id) {
    return get(`${SERVER_URL}/admin/detail_goods_color/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/admin/update_goods_color`, params);
}
