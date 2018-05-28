import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/admin/find_pending_goods`, params);
}

export async function fetchBrandAndCategory() {
    return get(`${SERVER_URL}/admin/fetch_brand_and_category`);
}
