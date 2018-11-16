import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

//版权信息
const pkg = require('../package.json');
window.NeteaseMusic = window.NeteaseMusic = `欢迎使用--网易云音乐，听见好时光!
当前版本为：V${pkg.version}
作者：Sun
歌曲来源于网易云音乐(http://music.163.com)`;
console.info(`%c${NeteaseMusic}`, `color : #e5473c`);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
