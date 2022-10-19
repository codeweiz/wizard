import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import urls from "@/http/urls";

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
export const get = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.get(resp.develop.baseUrl + url, {
                // 是否可以携带 cookie
                withCredentials: true
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
 * getWithHeaders 方法
 *
 * @param url 路径
 * @param param 参数
 * @return Promise
 * */
export const getWithHeaders = (url: string, param: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.get(resp.develop.baseUrl + url, param)
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
export const post = (url: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then((resp) => {
            axios.post(resp.develop.baseUrl + url, data)
                .then((res: AxiosResponse) => resolve(res))
                .catch((err) => reject(err));
        });
    })
}
