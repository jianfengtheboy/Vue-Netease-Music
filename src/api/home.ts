/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-01 21:58:46
 * @LastEditTime: 2020-07-02 15:55:19
 * @Description: 
 */
import Https from '../config/http'

class HomeApi {
  
  // 轮播图
  getBanner() {
    return Https.get('/banner')
  }
}

const HomeApis = new HomeApi()

export default HomeApis
