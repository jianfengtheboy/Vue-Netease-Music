/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-01 21:58:46
 * @LastEditTime: 2020-07-27 00:37:59
 * @Description: 
 */
import Https from '../config/http'

export default class DiscoverApi {
  // 轮播图
  getBanner() {
    return Https.get('/banner')
  }
}
