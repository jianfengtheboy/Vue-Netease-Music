import Vue from 'vue'
import Router from 'vue-router'
import Discover from './views/Discover/Discover.vue'

Vue.use(Router)

//路由懒加载（异步组件？）
/**
* 方法一 ：webpack + ES6 写法
*/
//const Friends = () => import(/* webpackChunkName: "friends" */ './views/Friends/Friends.vue')
//const Music = () => import(/* webpackChunkName: "music" */ './views/Music/Music.vue')
//const UserVideo = () => import(/* webpackChunkName: "userVideo" */ './views/UserVideo/UserVideo.vue')

/**
* 方法二 ：webpack 代码分割写法
*/ 
//const Friends = r => require.ensure([], () => r(require('./views/Friends/Friends.vue')), 'friends')
//const Music = r => require.ensure([], () => r(require('./views/Music/Music.vue')), 'music')
//const UserVideo = r => require.ensure([], () => r(require('./views/UserVideo/UserVideo.vue')), 'userVideo')

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
            component : () => import(/* webpackChunkName: "friends" */ './views/Friends/Friends.vue')
        },
        {
            path : '/music',
            name : 'music',
            component : () => import(/* webpackChunkName: "music" */ './views/Music/Music.vue')
        },
        {
            path : '/userVideo',
            name : 'userVideo',
            component : () => import(/* webpackChunkName: "userVideo" */ './views/UserVideo/UserVideo.vue')
        },
        {
            path : '/personalFM',
            name : 'personalFM',
            component : () => import(/* webpackChunkName: "personalFM" */ './components/PersonalFM/PersonalFM.vue')
        },
        {
            path : '/recommend',
            name : 'recommend',
            component : () => import(/* webpackChunkName: "recommend" */ './components/Recommend/Recommend.vue')
        },
        {
            path : '/musicList',
            name : 'musicList',
            component : () => import(/* webpackChunkName: "musicList" */ './components/MusicList/MusicList.vue')
        },
        {
            path : '/rank',
            name : 'rank',
            component : () => import(/* webpackChunkName: "rank" */ './components/Rank/Rank.vue')
        }
    ]
})