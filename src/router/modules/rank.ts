/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-03 17:26:42
 * @LastEditTime: 2021-02-22 15:05:50
 * @Description: 排行榜
 */
const rankRoutes = [
  {
    path: '/rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/views/Rank/Rank.vue'),
    name: 'rank',
    meta: {
      title: '排行榜',
      show: false
    }
  },
  {
    path: '/rank/:id',
    component: () => import(/* webpackChunkName: "rank-id" */ '@/views/Rank/RankItem.vue'),
    name: 'rank-id',
    redirect: '/rank/:id/songs',
    meta: {
      show: false
    },
    children: [
      {
        path: '/rank/:id/songs',
        component: () => import(/* webpackChunkName: "rank-id-songs" */ '@/views/Rank/RankItemDetails/Songs.vue'),
        name: 'rank-id-songs'
      },
      {
        path: '/rank/:id/comment',
        component: () => import(/* webpackChunkName: "rank-id-comment" */ '@/views/Rank/RankItemDetails/Comment.vue'),
        name: 'rank-id-comment'
      }
    ]
  }
]

const rankMap: any[] = []
rankRoutes.concat().forEach(route => {
  const map = {
    name: route.name,
    meta: route.meta
  }
  rankMap.push(map)
})

export {
  rankRoutes,
  rankMap
}
