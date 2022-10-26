module.exports = {
    // 解决打包部署在 nginx 上加载不了资源的问题
    publicPath: './',

    // 代理，防跨域
    devServer: {
        // 后端 gateway 地址
        proxy: 'http://192.168.0.37:9000/',
        ws: true
    }
}
