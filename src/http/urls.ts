import {getCaptchaCode} from "@/http/services";

const urls = {

    // config.json 地址
    configJson: '/wizard/config.json',

    // 登陆相关
    system: {
        user: {
            register: 'api/auth/auth/register',
            login: 'api/auth/auth/login',
            captchaCode: 'code',
            logout: 'api/auth/auth/logout',
        }
    }
}

export default urls;
