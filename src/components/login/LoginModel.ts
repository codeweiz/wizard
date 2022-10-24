export class LoginModel {

    // 用户名
    username: string | undefined;

    // 密码
    password: string | undefined;

    LoginModel() {
        this.username = '';
        this.password = '';
    }
}
