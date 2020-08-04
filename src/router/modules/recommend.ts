/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 23:57:13
 * @LastEditTime: 2020-08-04 16:51:06
 */ 
const recommendRoutes: any[] = [
  {
    path : '/discover',
    name : 'discover',
    component: () => import(/* webpackChunkName: "discover" */ '@/views/Discover/Discover.vue'),
    meta: {
      title: '发现音乐',
      show: true
    }
  }
]

const recommendMap: any[] = []
recommendRoutes.concat().forEach(route => {
  const map = {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
  recommendMap.push(map)
})

export {
  recommendRoutes,
  recommendMap
}
