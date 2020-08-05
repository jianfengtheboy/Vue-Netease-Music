/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-03 17:26:42
 * @LastEditTime: 2020-08-05 16:58:25
 * @Description: 歌单列表
 */
const playlistRoutes: any[] = [
  {
    path: '/playlist',
    component: () => import(/* webpackChunkName: "playlist" */ '@/views/Playlist/Playlist.vue'),
    name: 'playlist',
    meta: {
      title: '歌单',
      show: false
    }
  },
  {
    path: '/playlist-highquality',
    component: () => import(/* webpackChunkName: "playlist-highquality" */ '@/views/Playlist/HighQuality.vue'),
    name: 'playlist-highquality',
    meta: {
      title: '精品歌单',
      show: false
    }
  },
  {
    path: '/playlist/:id',
    component: () => import(/* webpackChunkName: "playlist-item" */ '@/views/Playlist/PlaylistItem.vue'),
    name: 'playlist-item',
    redirect: '/playlist/:id/tracks',
    meta: {
      show: false
    },
    children: [
      {
        path: '/playlist/:id/tracks',
        component: () => import(/* webpackChunkName: "playlist-item-tracks" */ '@/views/Playlist/PlaylistItemDetails/Tracks.vue'),
        name: 'playlist-item-tracks'
      },
      {
        path: '/playlist/:id/comment',
        component: () => import(/* webpackChunkName: "playlist-item-comment" */ '@/views/Playlist/PlaylistItemDetails/Comment.vue'),
        name: 'playlist-item-comment'
      },
      {
        path: '/playlist/:id/subscriber',
        component: () => import(/* webpackChunkName: "playlist-item-subscriber" */ '@/views/Playlist/PlaylistItemDetails/Subscriber.vue'),
        name: 'playlist-item-subscriber'
      }
    ]
  }
]

const playlistMap: any[] = []
playlistRoutes.concat().forEach(route => {
  const map = {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
  playlistMap.push(map)
})

export {
  playlistRoutes,
  playlistMap
}
