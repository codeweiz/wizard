import {config} from "@/http";
import urls from "@/http/urls";

export const getWebSocketUrl = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then(res => {
            resolve(res.develop.wsUrl + urls.ws + id);
        }).catch(err => {
            reject(err);
        })
    });
}
