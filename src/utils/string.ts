/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-25 00:10:04
 * @LastEditTime: 2020-06-28 23:48:21
 * @Description: string
 */ 
export default class StringUtil {
  ua: string
  constructor() {
    this.ua = navigator.userAgent.toLowerCase()
  }
  // 是否是字符串
  isString(value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'String'
  }
  // 是否数字
  isNumber (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Number'
  }
  // 是否boolean
  isBoolean (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Boolean'
  }
  // 是否函数
  isFunction (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
  }
  // 是否为null
  isNull (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Null'
  }
  // 是否undefined
  isUndefined (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Undefined'
  }
  // 是否对象
  isObj (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
  }
  // 是否数组
  isArray (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
  }
  // 是否时间
  isDate (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Date'
  }
  // 是否正则
  isRegExp (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'RegExp'
  }
  // 是否Set对象
  isSet (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Set'
  }
  // 是否错误对象
  isError (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Error'
  }
  // 是否Symbol函数
  isSymbol (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Symbol'
  }
  // 是否Promise对象
  isPromise (value: string | number | boolean | object | Array<string | number> | null | undefined) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Promise'
  }
  // 不是字符串
  notString (string: string | number | boolean | object | Array<string | number> | null | undefined) {
    return typeof string !== 'string'
  }
  // 是否为空
  isEmpty (string: string | number | boolean | object | null | undefined) {
    return string === undefined || string === null || string === ''
  }
  // 是否不为空
  notEmpty (string: string | number) {
    return string && string !== ''
  }
  // 下划线转驼峰
  toHump (string: string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/\\_(\w)/g, (all, letter) => letter.toUpperCase())
  }
  // 驼峰转下划线
  toLine (string: string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
  // 是否是移动端
  isDeviceMobile () {
    return /android|webos|iphone|ipod|balckberry/i.test(this.ua)
  }
  // 是否是QQ浏览器
  isQQBrowser () {
    return !!this.ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
  }
  // 是否是爬虫
  isSpider () {
    return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(this.ua)
  }
  // 是否ios
  isIos () {
    const u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      return false
    } else if (u.indexOf('iPhone') > -1) { // 苹果手机
      return true
    } else if (u.indexOf('iPad') > -1) { // iPad
      return false
    } else if (u.indexOf('Windows Phone') > -1) { // winphone手机
      return false
    } else {
      return false
    }
  }
  // 是否为PC端
  isPC = () => {
    const userAgentInfo = navigator.userAgent
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.includes(Agents[v])) {
        flag = false
        break
      }
    }
    return flag
  }
  // 获取url参数
  getQueryString (name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const search = window.location.search.split('?')[1] || ''
    const r = search.match(reg) || []
    return r[2]
  }
  // 将类数组转换为数组
  formArray = (ary: Array<string | number | null | undefined | object> | HTMLElement) => {
    const arr = Array.isArray(ary) ? ary : Array.prototype.slice.call(ary)
    return arr
  }
  // 去除空格  type: 1-所有空格 2-前后空格 3-前空格 4-后空格
  trim = (str: string, type: number | string) => {
    type = type || 1
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "")
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "")
      case 3:
        return str.replace(/(^\s*)/g, "")
      case 4:
        return str.replace(/(\s*$)/g, "")
      default:
        return str
    }
  }
  // 16进制颜色转RGBRGBA字符串
  colorToRGB = (val: string, opa: number | string) => {
    const pattern = /^(#?)[a-fA-F0-9]{6}$/
    const isOpa = typeof opa == 'number'
    if (!pattern.test(val)) {
      return ''
    }
    const v = val.replace(/#/, '')
    const rgbArr = []
    let rgbStr = ''

    for (let i = 0; i < 3; i++) {
      const item = v.substring(i * 2, i * 2 + 2)
      const num = parseInt(item, 16)
      rgbArr.push(num)
    }
    rgbStr = rgbArr.join()
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')'
    return rgbStr
  }
}
