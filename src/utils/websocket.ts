import {config} from "@/http";
import urls from "@/http/urls";

export const getWebSocketUrl = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        config().then(res => {
            resolve(res.develop.wsUrl + urls.ws);
        }).catch(err => {
            reject(err);
        })
    });
}
