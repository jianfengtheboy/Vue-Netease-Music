/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-01 21:58:46
 * @LastEditTime: 2020-08-21 09:49:59
 * @Description: 发现页面接口
 */
import Https from '@/config/http'

export default class DiscoverApi {
  // 轮播图
  public getBanner() {
    return Https.get('/banner')
  }

  // 推荐歌单
  public getPersonalized() {
    return Https.get('/personalized')
  }

  // 独家放送
  public getPrivateContent() {
    return Https.get('/personalized/privatecontent')
  }

  // 最新音乐
  public getNewSong(limit = 9) {
    return Https.get('/personalized/newsong', {
      limit
    })
  }

  // 推荐mv
  public getPersonalizedMV() {
    return Https.get('/personalized/mv')
  }

  // 主播电台
  public getDjHot () {
    return Https.get('/dj/hot')
  }
}
