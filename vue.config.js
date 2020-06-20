/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 11:09:06
 * @LastEditTime: 2020-06-20 11:48:06
 * @Description: 配置文件
 */
// eslint-disable-next-line
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: process.env.VUE_APP_TITLE === 'production' ? 'dist' : 'test',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  configureWebpack:{ 
    resolve:{   
      alias:{
        '@': resolve('src'),
      } 
    }
  },
  devServer:{
    // 跨域  
    port: 8080,
    host: '0.0.0.0',
    open: true,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })
      .end()

    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
    }
  }
}
