import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载（异步组件？）
// base Router 
/**
* 方法一 ：webpack + ES6 写法 ->> 官网推荐写法
*/
const Discover = () => import('../views/Discover/Discover.vue')
const Friends = () => import('../views/Friends/Friends.vue')
const Music = () => import('../views/Music/Music.vue')
const UserVideo = () => import('../views/UserVideo/UserVideo.vue')
const PersonalFM = () => import('../components/PersonalFM/PersonalFM.vue')
const Recommend = () => import('../components/Recommend/Recommend.vue')
const MusicList = () => import('../components/MusicList/MusicList.vue')
const Rank = () => import('../components/Rank/Rank.vue')

/**
* 方法二 ：webpack 代码分割写法
*/ 
//const Discover = r => require.ensure([], () => r(require('../views/Discover/Discover.vue')), 'discover')
//const Friends = r => require.ensure([], () => r(require('../views/Friends/Friends.vue')), 'friends')
//const Music = r => require.ensure([], () => r(require('../views/Music/Music.vue')), 'music')
//const UserVideo = r => require.ensure([], () => r(require('../views/UserVideo/UserVideo.vue')), 'userVideo')

//child Router


export default new Router({
    linkActiveClass : 'active',
    linkExactActiveClass : 'active',
    routes: [
        {
            path : '/',
            redirect : '/discover'
        },
        {
            path : '/discover',
            component : Discover,
            children : [
                {
                    path : '/discover/personalFM',
                    component : PersonalFM
                },
                {
                    path : '/discover/recommend',
                    component : Recommend
                },
                {
                    path : '/discover/musicList',
                    component : MusicList
                },
                {
                    path : '/discover/rank',
                    component : Rank
                }
            ]
        },
        {
            path : '/friends',
            component : Friends
        },
        {
            path : '/music',
            component : Music
        },
        {
            path : '/userVideo',
            component : UserVideo
        }
    ]
})