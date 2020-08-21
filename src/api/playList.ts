/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-04 17:56:00
 * @LastEditTime: 2020-08-21 09:50:19
 * @Description: 
 */
import Https from '@/config/http'

export default class PlayList {
  // 精品歌单推荐
  public getHighQuality(limit: number) {
    return Https.get('/top/playlist/highquality', {
      limit
    })
  }

  //获取歌单 ( 网友精选碟 )
  public getTopPlayList(page = 0, limit = 20, order = 'hot') {
    return Https.get('/top/playlist', {
      offset: page * limit,
      order,
      limit
    })
  }
}
