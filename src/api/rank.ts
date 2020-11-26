/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-11-26 14:11:55
 * @LastEditTime: 2020-11-26 14:38:57
 * @Description: 排行榜
 */
import Https from '@/config/http'

export default class RankApi {
  // 排行榜
  public getRankList() {
    return Https.get('/toplist/detail')
  }
}
