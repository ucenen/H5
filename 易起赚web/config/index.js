// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../ylYqzWebBuild/index.html'),
        assetsRoot: path.resolve(__dirname, '../../ylYqzWebBuild'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 3333,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/yl-ms-platform': {

                // target: 'http://127.0.0.1:20001/',
                target: 'https://ykz.ylgyl.com/api/',
               
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/yl-ms-product': {
                // target: 'http://127.0.0.1:20001/',
                target:'https://ykz.ylgyl.com/api/',
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/school': {
                // target: 'http://127.0.0.1:20001/',
                // target: 'http://192.168.1.31:11000/', 
                target: 'https://ykz.ylgyl.com/api/',
               
                changeOrigin: true,
                logLevel: 'debug'
            },
            // '/open': {

            //     target: 'https://www.ylgyl.com/',
            //     // target: 'https://ykz.ylgyl.com/api/',
            //     contentType: "application/json; charset=utf-8",
            //     dataType: 'json',
            //     changeOrigin: true,
            //     logLevel: 'debug'
            // },
       //      //采购服务
       //      '/banyan-procurement': {
                
       //          target: 'http://127.0.0.1:11000/',
       
       //          changeOrigin: true,
       //          logLevel: 'debug'
       //      },
       //      //库存服务
       //      '/banyan-inventory': {
             
       //          target: 'http://127.0.0.1:11000/',
          
       //          changeOrigin: true,
       //          logLevel: 'debug'
       //      },
       //      //门店
       //      '/polaris': {
               
       //          target: 'http://127.0.0.1:11000/',
       //          changeOrigin: true,
       //          logLevel: 'debug'
       //      },
          
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
