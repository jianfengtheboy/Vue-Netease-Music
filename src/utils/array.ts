/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-14 23:21:09
 * @LastEditTime: 2020-07-18 02:33:52
 * @Description: array
 */ 
export default class ArrayUtils {
  // 将类数组转换为数组
  formArray = (ary: any[] | HTMLElement) => {
    const arr = Array.isArray(ary) ? ary : Array.prototype.slice.call(ary)
    return arr
  }

  // 返回数组中的最小值
  arrayMin = (arr: Array<number>) => Math.min(...arr)

  // 将数组块划分为指定大小的较小数组
  chunk = (arr: any[], size: number) => Array.from({
    length: Math.ceil(arr.length / size)
  }, (v, i) => arr.slice(i * size, i * size + size))

  // 从数组中移除 false 值
  compact = (arr: any[]) => arr.filter(Boolean)

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

  /**
   * @数组去重
   */
  noRepeatSet = (arr: any[]) => [...new Set(arr)]

  noRepeatFrom = (arr: any[]) => Array.from(new Set(arr))

  noRepeatFilter = (arr: any[]) => arr.filter((v, idx) => idx == arr.lastIndexOf(v))
  
  noRepeatObject = (arr: any[]) => {
    return Object.values(arr.reduce((s, n) => {
      s[n] = n
      return s
    }, {}))
  }

  /**
   * @查找数组最大
   */
  arrayMax = (arr: any[]) => Math.max(...arr)

  arrayMaxReduce = (arr: any[]) => arr.reduce((s, n) => Math.max(s, n)) 

  arrayMaxCompire = (arr: any[]) => arr.reduce((s, n) => s > n ? s : n)

  arrayMaxSort = (arr: any[]) => arr.sort((n, m) => m - n)[0]

  /**
   * @返回以size为长度的数组分割的原数组
   */
  chunkSlice = (arr: any[], size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))

  chunkSplice = (arr: any[], size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, () => arr.splice(0, size))

  chunkWhile = (arr: any[], size = 1) => {
    const returnArr = []
    while (arr.length) {
      returnArr.push(arr.splice(0, size))
    }
    return returnArr
  }

  /**
   * @检查数组中某元素出现的次数
   */
  countOccurrencesReduce = (arr: any[], value: string | number) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)

  countOccurrencesFilter = (arr: any[], value: string | number) => arr.filter(v => v === value).length

  /**
   * @数组乱排
   */
  shuffleWhile = (arr: any[]) => {
    const array = arr
    let index = array.length
    while (index) {
      index -= 1
      const randomInedx = Math.floor(Math.random() * index)
      const middleware = array[index]
      array[index] = array[randomInedx]
      array[randomInedx] = middleware
    }
    return array
  }

  shuffleSort = (arr: any[]) => arr.sort(() => Math.random() - 0.5)
  
}
