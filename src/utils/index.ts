/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 01:03:24
 * @LastEditTime: 2020-06-23 23:14:34
 * @Description: index.ts
 */ 
import DomUtils from './dom'
import RandomPwd from './randomPwd'

export default {
  dom: new DomUtils(),
  randomPwd: new RandomPwd().getRandomPwd()
}
