/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-06-20 01:09:04
 * @Description: 全局入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Utils from './utils'
Vue.prototype.$utils = Utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#sun')
