/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-25 00:10:04
 * @LastEditTime: 2020-06-26 11:39:17
 * @Description: string
 */ 
export default class StringUtil {
  // 是否是字符串
  isString(string: string | number | boolean | object | Array<string | number> | null | undefined) {
    return typeof string === 'string'
  }
  // 不是字符串
  notString(string: string | number | boolean | object | Array<string | number> | null | undefined) {
    return typeof string !== 'string'
  }
  // 是否为空
  isEmpty(string: string | number | boolean | object | null | undefined) {
    return string === undefined || string === null || string === ''
  }
  // 是否不为空
  notEmpty(string: string | number) {
    return string && string !== ''
  }
  // 下划线转驼峰
  toHump(string: string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/\\_(\w)/g, (all, letter) => letter.toUpperCase())
  }
  // 驼峰转下划线
  toLine(string: string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}
