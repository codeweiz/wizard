const urls = {

    // config.json 地址
    configJson: '/wizard/config.json',

    // 登陆相关
    system: {
        user: {
            register: 'api/auth/auth/register',
            login: 'api/auth/auth/login',
            captchaCode: 'api/code',
            logout: 'api/auth/auth/logout',
        }
    },

    // ws 相关
    ws: 'api/websocket/ws?userId='
}

export default urls;
