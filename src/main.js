// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import './common/css/index.scss';

//优化移动端300ms点击延迟
FastClick.attach(document.body)

//懒加载
Vue.use(VueLazyLoad, {
    preLoad : 1,
    loading : require('./common/image/default.jpg')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
