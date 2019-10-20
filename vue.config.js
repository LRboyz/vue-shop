module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            // '/api': {
            //     target: 'http://lrboy.live',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
        }
    }
};