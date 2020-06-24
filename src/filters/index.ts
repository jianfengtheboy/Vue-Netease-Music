/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-23 22:22:22
 * @LastEditTime: 2020-06-24 00:33:21
 * @Description: 过滤器
 */
import VueInstance from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
 
const numberFormat = (val: string) => {
  if (!val) {
    return '0'
  }
  // 将整数部分逢三一断
  const intPartFormat = val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return intPartFormat
}

const toWan = (val: number) => {
  const k = 10000
  const sizes = ['', '万', '亿', '万亿']
  const i = Math.floor(Math.log(val) / Math.log(k))
  return val >= k ? (val / Math.pow(k, i)).toFixed(1) + sizes[i] : val
}

const momentFormat = (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
}

const toDateFormat = (val: string, format: string) => {
  return moment(val).format(format || 'YYYY-MM-DD')
}

function _pad (num: string | number) {
  return num < 10 ? '0' + num : num
}

const durationFormat = (duration: number, type: string) => {
  if (!duration) return '00:00'
  if (type && type == 'ms') duration = duration / 1000
  duration = Math.floor(duration)
  const minute = _pad((duration / 60) | 0)
  const second = _pad(duration % 60)
  return `${minute}:${second}`
}

const formatBrs = (num: number | string) => {
  if (num == 1080) {
    return '蓝光'
  } else if (num == 720) {
    return '超清'
  } else if (num == 480) {
    return '高清'
  } else {
    return '标清'
  }
}

const normalSize = (size: number, type: string) => {
  if (isNaN(size) || size < 0) return '未知大小'
  if (type === 'K') return `${(size / 1024).toFixed(2)}k`
  return `${(size / 1024 / 1024).toFixed(2)}M`
}

const textover = (val: string, length: number) => {
  if (!val) return ''
  if (val.length > length) {
    return `${val.slice(0, length - 1)}...`
  }
  return val
}

const globalFilters = (Vue: typeof VueInstance) => {
  Vue.filter('numberFormat', numberFormat)
  Vue.filter('toWan', toWan)
  Vue.filter('momentFormat', momentFormat)
  Vue.filter('toDateFormat', toDateFormat)
  Vue.filter('durationFormat', durationFormat)
  Vue.filter('formatBrs', formatBrs)
  Vue.filter('normalSize', normalSize)
  Vue.filter('textover', textover)
}

export default globalFilters
