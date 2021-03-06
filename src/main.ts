/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-07-31 00:40:21
 * @Description: 全局入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './styles/index.scss'

// 引入svg
import './icons'

//优化移动端300ms点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad : 1,
  loading : require('./assets/image/default.png')
})

// 引入toast组件
import Toast from '@/baseComponents/Toast'
Vue.use(Toast)

// 引入confirm组件
import Confirm from '@/baseComponents/Confirm'
Vue.prototype.$confirm = Confirm

// 引入全局utils
import Utils from '@/utils'
Vue.prototype.$utils = Utils

// 引入全局过滤器
import globalFilters from '@/filters'
globalFilters(Vue)

// 引入全局自定义指令
import globalDirectives from './directives'
globalDirectives(Vue)

// 引入api
import Apis from '@/api'
Vue.prototype.$api = Apis

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#sun')
