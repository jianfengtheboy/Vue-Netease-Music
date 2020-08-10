/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-08-10 23:25:27
 * @Description: 路由
 */ 
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import BasicLayout from '@/layout/BasicLayout.vue'

import { recommendRoutes } from '@/router/modules/recommend'
import { playlistRoutes } from '@/router/modules/playlist'
import { rankRoutes } from '@/router/modules/rank'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'basicLayout',
    component: BasicLayout,
    redirect: '/discover',
    children: [
      ...recommendRoutes,
      ...playlistRoutes,
      ...rankRoutes
    ]
  }
]

const router = new VueRouter({
  mode: 'history', 
  base: process.env.BASE_URL,
  linkActiveClass : 'active',
  linkExactActiveClass : 'active',
  routes
})

export default router
