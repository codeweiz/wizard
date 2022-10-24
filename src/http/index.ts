import axios, {AxiosResponse} from 'axios';
import urls from "@/http/urls";
import {getCookie} from "@/utils/cookie";

const config = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(urls.configJson).then((res: AxiosResponse) => {
            if (res.status === 200) {
                resolve(res.data);
            } else {
                reject();
            }
        });
    });
}

/**
 * Get 方法
 *
 * @param url 路径
 * @return Promise
 * */
export const getPromise = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.get(resp.develop.baseUrl + url, {
                headers: {
                    'Authorization': getCookie('userInfo')
                }
            })
                .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    }
                })
                .catch((err) => reject(err));
        });
    })
}


/**
 * Post 方法
 *
 * @param url 路径
 * @param data 数据
 * @return Promise
 * */
export const postPromise = (url: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.post(resp.develop.baseUrl + url, data, {
                headers: {
                    'Authorization': getCookie('userInfo')
                }
            })
                .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    }
                })
                .catch((err) => reject(err));
        });
    })
}

/**
 * PUT 方法
 *
 * @param url 路径
 * @param data 数据
 * @return Promise
 * */
export const putPromise = (url: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.put(resp.develop.baseUrl + url, data, {
                headers: {
                    'Authorization': getCookie('userInfo')
                }
            })
                .then((res: AxiosResponse) => resolve(res))
                .catch((err) => reject(err));
        });
    })
}

/**
 * DELETE 方法
 *
 * @param url 路径
 * @return Promise
 * */
export const deletePromise = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.delete(resp.develop.baseUrl + url, {
                headers: {
                    'Authorization': getCookie('userInfo')
                }
            })
                .then((res: AxiosResponse) => resolve(res))
                .catch((err) => reject(err));
        });
    })
}

