/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 02:09:15
 * @LastEditTime: 2020-06-23 18:12:12
 */ 
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
requireAll(req)
