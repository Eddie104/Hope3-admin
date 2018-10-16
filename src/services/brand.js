import { get, post } from '../utils/request';
import { SERVER_URL } from '../config';

export async function find(params) {
    return post(`${SERVER_URL}/api/admin/find_brand`, params);
}

export async function detail(id) {
    return get(`${SERVER_URL}/api/admin/detail_brand/${id}`);
}

export async function update(params) {
    return post(`${SERVER_URL}/api/admin/update_brand`, params);
}

export async function add(params) {
    return post(`${SERVER_URL}/api/admin/add_brand`, params);
}

export async function remove(id) {
    return get(`${SERVER_URL}/api/admin/remove_brand/${id}`);
}

export async function fetchGoodsImgBySeriesId(seriesId, page, pageSize) {
    return get(`${SERVER_URL}/api/admin/fetch_goods_img_by_seriesId/${seriesId}/${page}/${pageSize}`);
}

export async function setSeriesImg(params) {
    return post(`${SERVER_URL}/api/admin/set_seried_img`, params);
}

export async function setSeriesTop(params) {
    return post(`${SERVER_URL}/api/admin/set_series_top`, params);
}

export async function getTopSeries() {
    return get(`${SERVER_URL}/api/admin/get_top_series`);
}
