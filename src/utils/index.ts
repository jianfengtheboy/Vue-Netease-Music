/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 01:03:24
 * @LastEditTime: 2020-07-16 00:17:51
 * @Description: index.ts
 */ 
import DomUtils from './dom'
import RandomPwd from './randomPwd'
import StorageUtils from './storage'
import StringUtils from './string'
import CalculateUtils from './calculate'
import RegExpUtils from './regexp'
import ArrayUtils from './array'
import NumberUtils from './number'
import BrowserUtils from './browser'

export default {
  dom: new DomUtils(),
  randomPwd: new RandomPwd().getRandomPwd(),
  storage: new StorageUtils(),
  string: new StringUtils(),
  calculate: new CalculateUtils(),
  reg: new RegExpUtils(),
  array: new ArrayUtils(),
  number: new NumberUtils(),
  browser: new BrowserUtils()
}
