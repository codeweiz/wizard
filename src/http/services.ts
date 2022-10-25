import urls from "@/http/urls";
import {postPromise} from "@/http/index";

/**
 * 注册
 *
 * @param registerModel 用户名、密码
 * @return Promise
 * */
export const register = (registerModel: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        postPromise(urls.system.user.register, registerModel).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    })
}

/**
 * 登陆 login
 *
 * @param loginModel LoginModel
 * @return Promise<any>
 * */
export const login = (loginModel: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        postPromise(urls.system.user.login, loginModel).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    })
}


/**
 * 登出 logout
 *
 * @return Promise<any>
 * */
export const logout = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        postPromise(urls.system.user.logout, {}).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    })
}
