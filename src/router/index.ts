/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-07-06 16:14:03
 * @Description: 路由
 */ 
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = []

const router = new VueRouter({
  mode: 'history', 
  base: process.env.BASE_URL,
  linkActiveClass : 'active',
  linkExactActiveClass : 'active',
  routes
})

export default router
