/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-06-24 00:54:14
 * @Description: 全局入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './styles/index.scss'

//优化移动端300ms点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad : 1,
  loading : require('./assets/image/default.png')
})

// 引入全局utils
import Utils from '@/utils'
Vue.prototype.$utils = Utils

// 引入全局过滤器
import globalFilters from '@/filters'
globalFilters(Vue)

// 引入全局自定义指令
import globalDirectives from './directives'
globalDirectives(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#sun')
