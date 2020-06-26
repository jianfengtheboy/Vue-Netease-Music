/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-26 22:54:43
 * @LastEditTime: 2020-06-26 23:06:39
 * @Description: regexp
 */ 

export default class RegExpUtils {
  // 常规名称验证
  isName (value: string) {
    const reg = /^[\u4e00-\u9fa50-9a-zA-Z]([\u4e00-\u9fa50-9a-zA-Z_]*[\u4e00-\u9fa50-9a-zA-Z])*$/
    if (!reg.test(value)) {
      return false
    }
    return true
  }
  // 邮箱验证 支持 多邮箱
  isEmail (value: string) {
    const reg = new RegExp('^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$')
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }
  // SNMP地址验证 支持 多SNMP地址
  isSnmp (value: string) {
    const reg = new RegExp('((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?[1-9])))(/\\d{1,5}))') // 正则表达式
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }
  // 手机号码验证 支持 多手机号码
  isPhone (value: string) {
    const reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$') // 正则表达式
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }
}
