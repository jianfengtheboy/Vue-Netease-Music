/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 01:03:24
 * @LastEditTime: 2020-06-25 00:12:09
 * @Description: index.ts
 */ 
import DomUtils from './dom'
import RandomPwd from './randomPwd'
import StorageUtils from './storage'
import StringUtils from './string'

export default {
  dom: new DomUtils(),
  randomPwd: new RandomPwd().getRandomPwd(),
  storage: new StorageUtils(),
  string: new StringUtils()
}
