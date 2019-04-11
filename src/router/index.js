import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/views/discover/discover.vue'

Vue.use(Router)

//路由懒加载（异步组件？）
/**
* 方法一 ：webpack + ES6 写法
*/
//const Friends = () => import(/* webpackChunkName: "friends" */ '@/views/friends/friends.vue')
//const Mine = () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue')
//const UserVideo = () => import(/* webpackChunkName: "userVideo" */ '@/views/user-video/user-video.vue')

/**
* 方法二 ：webpack 代码分割写法
*/ 
//const Friends = r => require.ensure([], () => r(require('@/views/friends/friends.vue')), 'friends')
//const Mine = r => require.ensure([], () => r(require('@/views/mine/mine.vue')), 'mine')
//const UserVideo = r => require.ensure([], () => r(require('@/views/user-video/user-video.vue')), 'userVideo')

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass : 'active',
    linkExactActiveClass : 'active',
    routes: [
        {
            path : '/',
            redirect : '/discover'
        }, 
        {
            path : '/discover',
            name : 'discover',
            component : Discover
        },
        {
            path : '/friends',
            name : 'friends',
            //方法三 ： 跟方法一一样（没区别）
            component : () => import(/* webpackChunkName: "friends" */ '@/views/friends/friends.vue')
        },
        {
            path : '/mine',
            name : 'mine',
            component : () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue')
        },
        {
            path : '/userVideo',
            name : 'userVideo',
            component : () => import(/* webpackChunkName: "userVideo" */ '@/views/user-video/user-video.vue')
        },
        {
            path : '/personalFM',
            name : 'personalFM',
            component : () => import(/* webpackChunkName: "personalFM" */ '@/components/personal-fm/personal-fm.vue')
        },
        {
            path : '/recommend',
            name : 'recommend',
            component : () => import(/* webpackChunkName: "recommend" */ '@/components/recommend/recommend.vue')
        },
        {
            path : '/musicList',
            name : 'musicList',
            component : () => import(/* webpackChunkName: "musicList" */ '@/components/music-list/music-list.vue')
        },
        {
            path : '/rank',
            name : 'rank',
            component : () => import(/* webpackChunkName: "rank" */ '@/components/rank/rank.vue')
        },
        {
            path : '/highQuality',
            name : 'highQuality',
            component : () => import(/* webpackChunkName: "highQuality" */ '@/components/highQuality/highQuality.vue')
        }
    ]
})