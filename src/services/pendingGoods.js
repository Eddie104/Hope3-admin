import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_pending_goods`, params);
}

export async function fetchBrandAndCategory() {
    return get(`${SERVER_URL}/admin/fetch_brand_and_category`);
}

export async function addGoodsType(params) {
    return post(`${SERVER_URL}/admin/add_goods_type_by_pending_goods`, params);
}

export async function relationGoodsType(params) {
    return post(`${SERVER_URL}/admin/relation_goods_type_by_pending_goods`, params);
}

export async function autoRelation() {
    return get(`${SERVER_URL}/admin/auto_relation`);
}

export async function autoRelationByNumber() {
    return get(`${SERVER_URL}/admin/auto_relation_by_number`);
}
