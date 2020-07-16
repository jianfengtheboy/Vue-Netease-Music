/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-14 23:21:09
 * @LastEditTime: 2020-07-16 16:25:22
 * @Description: array
 */ 
export default class ArrayUtils {
  // 将类数组转换为数组
  formArray = (ary: any[] | HTMLElement) => {
    const arr = Array.isArray(ary) ? ary : Array.prototype.slice.call(ary)
    return arr
  }

  // 返回数组中的最大值
  arrayMax = (arr: Array<number>) => Math.max(...arr)

  // 返回数组中的最小值
  arrayMin = (arr: Array<number>) => Math.min(...arr)

  // 将数组块划分为指定大小的较小数组
  chunk = (arr: any[], size: number) => Array.from({
    length: Math.ceil(arr.length / size)
  }, (v, i) => arr.slice(i * size, i * size + size))

  // 从数组中移除 false 值
  compact = (arr: any[]) => arr.filter(Boolean)

  // 计算数组中值的出现次数
  countOccurrences = (arr: any[], value: string | number) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)

  // 返回两个数组之间的差异
  difference = (a: any[], b: any[]) => {
    const s = new Set(b)
    return a.filter(x => !s.has(x))
  }

  // 返回数组的所有不同值
  distinctValuesOfArray = (arr: any[]) => [...new Set(arr)]

  // 返回数组中的每个第 n 个元素
  everyNth = (arr: any[], nth: number) => arr.filter((e, i) => i % nth === 0)

  // 筛选出数组中的非唯一值
  filterNonUnique = (arr: any[]) => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i))

  // 拼合数组
  flatten = (arr: any[]) => arr.reduce((a, v) => a.concat(v), [])

  // 返回除最后一个数组之外的所有元素
  initial = (arr: any[]) => arr.slice(0, -1)

  // 初始化并填充具有指定值的数组
  initializeArrayWithRange = (end: number, start = 0) => Array.from({
    length: end - start
  }).map((v, i) => i + start)

  // 初始化并填充具有指定值的数组
  initializeArrayWithValues = (n: number, value = 0) => Array(n).fill(value)

  // 返回两个数组中存在的元素的列表
  intersection = (a: any[], b: any[]) => {
    const s = new Set(b)
    return a.filter(x => s.has(x))
  }

  // 返回数组的第 n 个元素
  nthElement = (arr: any[], n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]

  // 从对象中选取对应于给定键的键值对
  pick = (obj: {}, arr: []) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})

  // 对原始数组进行变异, 以筛选出指定的值
  pull = (arr: any[], ...args: any[]) => {
    const pulled = arr.filter(v => !args.includes(v))
    arr.length = 0
    pulled.forEach(v => arr.push(v))
  }

  // 从数组中移除给定函数返回false的元素
  remove = (arr: any[], func: (value: any, index: number, array: any[]) => value is any) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1)
    return acc.concat(val)
  }, []) : []

  // 返回数组中的随机元素
  sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

  // 随机数组值的顺序
  shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5)

  // 返回两个数组中都显示的元素的数组
  similarity = (arr: any[], values: string | any[]) => arr.filter(v => values.includes(v))

  // 返回两个数组之间的对称差
  symmetricDifference = (a: any[], b: any[]) => {
    const sA = new Set(a)
    const sB = new Set(b)
    return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))]
  }

  // 返回数组中的所有元素, 除第一个
  tail = (arr: any[]) => arr.length > 1 ? arr.slice(1) : arr

  // 返回一个数组, 其中 n 个元素从开始处移除
  take = (arr: any[], n = 1) => arr.slice(0, n)

  // 返回一个数组, 其中 n 个元素从末尾移除
  takeRight = (arr: any[], n = 1) => arr.slice(arr.length - n, arr.length)

  // 返回在两个数组中的任意一个中存在的每个元素
  union = (a: any[], b: any[]) => Array.from(new Set([...a, ...b]))

  // 筛选出数组中具有指定值之一的元素
  without = (arr: any[], ...args: any[]) => arr.filter(v => !args.includes(v))

  // 创建基于原始数组中的位置分组的元素数组
  zip = (...arrays: any[]) => {
    const maxLength = Math.max(...arrays.map(x => x.length))
    return Array.from({
      length: maxLength
    }).map((_, i) => {
      return Array.from({
        length: arrays.length
      }, (_, k) => arrays[k][i])
    })
  }

  // 从给定数组中移除一项
  removeArrayItem = (arr: any[], item: any) => {
    let i = 0
    while (i < arr.length) {
      if (arr[i] == item) {
        arr.splice(i, 1)
      } else {
        i++
      }
    }
    return arr
  }

  // 检查给定数组中是否包含某项
  contains = (arr: string | any[], item: any) => {
    let i = arr.length
    while (i--) {
      if (arr[i] === item) {
        return true
      }
    }
    return false
  }

  // 查询数组中是否存在某个元素并返回元素第一次出现的下标
  inArray = (item: any, data: string | any[]) => {
    for (let i = 0; i < data.length; i++) {
      if (item === data[i]) {
        return i
      }
    }
    return -1
  }
}
