/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-26 22:00:12
 * @LastEditTime: 2020-06-28 23:36:39
 * @Description: 计算浮点数
 */
export default class CalculateUtils {
  // 加
  floatAdd(arg1: number, arg2: number) {
    let r1, r2
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) { r2 = 0 }
    const m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  }

  // 减
  floatSub(arg1: number, arg2: number) {
    let r1, r2
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2))
    const n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  }

  // 乘
  floatMul (arg1: number, arg2: number) {
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }

  // 除
  floatDiv(arg1: { toString: () => string }, arg2: { toString: () => string }) {
    let t1 = 0
    let t2 = 0
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }

  // 最大值
  max = (arr: Array<number>) => {
    return Math.max.apply(null, arr)
  }

  // 最小值
  min = (arr: Array<number>) => {
    return Math.min.apply(null, arr)
  }

  // 求和
  sum = (arr: Array<number>) => {
    return arr.reduce((pre, cur) => {
      return pre + cur
    })
  }

  // 平均值
  average = (arr: Array<number>) => {
    return this.sum(arr) / arr.length
  }
}
