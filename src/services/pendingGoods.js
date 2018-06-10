import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_pending_goods`, params);
}

export async function fetchBrandAndCategory() {
    return get(`${SERVER_URL}/admin/fetch_brand_and_category`);
}

export async function addGoodsType(params) {
    return post(`${SERVER_URL}/admin/add_goods_type`, params);
}

export async function connectGoodsType(params) {
    return post(`${SERVER_URL}/admin/connect_goods_type`, params);
}

export async function setCheck(_id) {
    return get(`${SERVER_URL}/admin/set_pending_goods_check/${_id}`);
}
