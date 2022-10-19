import urls from "@/http/urls";
import {get, post} from "@/http/index";
import {LoginModel} from "@/components/login/LoginModel";

/**
 * 登陆 login
 *
 * @param loginModel LoginModel
 * @return Promise<any>
 * */
export const login = (loginModel: LoginModel): Promise<any> => {
  return new Promise((resolve, reject) => {
      post(urls.system.user.login, loginModel).then((res) => {
          resolve(res);
      }).catch((err) => {
          reject(err);
      });
  })
}

/**
 * 测试 test1
 *
 * @return Promise<any>
 * */
export const test1 = (): Promise<any> => {
  return new Promise((resolve, reject) => {
      get(urls.system.test.test1).then((res) => {
          resolve(res);
      }).catch((err) => {
          reject(err);
      });
  })
}
