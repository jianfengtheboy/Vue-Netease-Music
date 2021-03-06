/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-14 23:13:05
 * @LastEditTime: 2020-07-16 15:55:52
 * @Description: number
 */ 
export default class NumberUtils {
  // 匹配正整数
  isPositiveNum = (val: string) => {
    return /^[1-9]\d*$/.test(val)
  }
  
  // 匹配负整数
  isNegativeNum = (val: string) => {
    return /^-[1-9]\d*$/.test(val)
  }

  // 匹配整数
  isInteger = (val: string) => {
    return /^(-|\+)?\d+$/.test(val)
  }
  
  // 匹配非负浮点数
  isNotNegativeFloatNum = (val: string) => {
    return /^\d+(\.\d+)?$/.test(val)
  }

  /**
    * @生成指定范围随机数 
    * @param { number } min 
    * @param { number } max 
    */
  RandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
}
