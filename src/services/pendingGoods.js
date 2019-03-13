import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_pending_goods`, params);
}

export async function fetchBrandAndCategory() {
    return get(`${SERVER_URL}/api/admin/fetch_brand_and_category`);
}

export async function addGoodsType(params) {
    return post(`${SERVER_URL}/api/admin/add_goods_type`, params);
}

export async function connectGoodsType(params) {
    return post(`${SERVER_URL}/api/admin/connect_goods_type`, params);
}

export async function setCheck(idArr) {
    return post(`${SERVER_URL}/api/admin/set_pending_goods_check`, { idArr });
}

export async function autoConnectByNumber() {
    return get(`${SERVER_URL}/api/admin/auto_connect_by_number`);
}

export async function autoConnectByName() {
    return get(`${SERVER_URL}/api/admin/auto_connect_by_name`);
}

export async function deletePendingGoods(_id) {
    return get(`${SERVER_URL}/api/admin/delete_pending_goods/${_id}`);
}

export async function deletePendingGoodsBatch(idArr) {
    return post(`${SERVER_URL}/api/admin/delete_pending_goods_batch`, { idArr });
}
