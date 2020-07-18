/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-19 00:02:12
 * @LastEditTime: 2020-07-19 00:38:59
 * @Description: 浏览器对象 BOM
 */ 
export default class BomUtils {
  /**
   * @检查浏览器是否支持某个css属性值
   * @param {String} key - 检查的属性值所属的css属性名
   * @param {String} value - 要检查的css属性值（不要带前缀）
   * @returns {String} - 返回浏览器支持的属性值
   */
  valiateCssValue(key: number, value: string) {
    const prefix = ['-o-', '-ms-', '-moz-', '-webkit-', '']
    const prefixValue = prefix.map((item) => {
      return item + value
    })
    const element = document.createElement('div')
    const eleStyle = element.style
    // 应用每个前缀的情况，且最后也要应用上没有前缀的情况，看最后浏览器起效的何种情况
    // 这就是最好在prefix里的最后一个元素是''
    prefixValue.forEach((item) => {
      eleStyle[key] = item
    })
    return eleStyle[key]
  }
}
