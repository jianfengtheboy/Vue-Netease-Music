/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 01:03:24
 * @LastEditTime: 2020-07-28 09:27:23
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
import FileUtils from './file'
import FunctionUtils from './function'
import DateUtils from './date'
import BomUtils from './bom'

export default {
  dom: new DomUtils(),
  randomPwd: new RandomPwd(),
  storage: new StorageUtils(),
  string: new StringUtils(),
  calculate: new CalculateUtils(),
  reg: new RegExpUtils(),
  array: new ArrayUtils(),
  number: new NumberUtils(),
  browser: new BrowserUtils(),
  file: new FileUtils(),
  function: new FunctionUtils(),
  date: new DateUtils(),
  bom: new BomUtils()
}
