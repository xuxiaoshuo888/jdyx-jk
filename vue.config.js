const target = 'http://192.168.0.19:8080';

module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/assets/scss/index.scss";`
            }
        }
    },
    devServer: {
        port: 8888,
        disableHostCheck: true,
        proxy: {
            '/proxy': {
                target: target,
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        },
    }
}