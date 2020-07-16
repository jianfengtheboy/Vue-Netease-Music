/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-16 23:09:39
 * @LastEditTime: 2020-07-16 23:57:22
 * @Description: date
 */ 
export default class DateUtils {
  // 获得给定毫秒数的可读格式
  formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    }
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ')
  }
  
  // 获得两个日期之间的差异（以天为单位）
  getDaysDiffBetweenDates = (dateInitial: number, dateFinal: number) => (dateFinal - dateInitial) / (1000 * 3600 * 24)

  // 日期型函数封装
  formatTime = (date: string | number | Date) => {
    if (date) {
      if(!(date instanceof Date))
      date = new Date(date);
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}月${day}日`
    }
  }
  
  formatDay = (date: Date) => {
    if (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].map(this.formatNumber).join('-')
    }
  }
  
  formatDay2 = (date: Date) => {
    if (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].map(this.formatNumber).join('/')
    }
  }
  
  formatWeek = (date: Date) => {
    if (date) {
      const day = date.getDay()
      switch (day) {
        case 0:
          return '周日'
          break;
        case 1:
          return '周一'
          break;
        case 2:
          return '周二'
          break;
        case 3:
          return '周三'
          break;
        case 4:
          return '周四'
          break;
        case 5:
          return '周五'
          break;
        case 6:
          return '周六'
          break;
      }
    }
  }

  formatNumber = (n: any) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  formatHour = (date: Date) => {
    if (date) {
      const hour = new Date(date).getHours()
      const minute = new Date(date).getMinutes()
      return [hour, minute].map(this.formatNumber).join(':')
    }
  }
  
  detimestamp = (date: number) => {
    if (date) {
      return new Date(date * 1000)
    }
  }
  
  /** 
   * @时间戳转化为年月日时分秒 
   * @number传入时间戳 
   * @format返回格式支持自定义但参数必须与formateArr里保持一致 
  */  
  formatDateTime = (number: number, format: string) => {  
    const formateArr = ['Y','M','D','h','m','s']
    const returnArr = []
    
    const date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(this.formatNumber(date.getMonth() + 1))
    returnArr.push(this.formatNumber(date.getDate()))
    
    returnArr.push(this.formatNumber(date.getHours()))
    returnArr.push(this.formatNumber(date.getMinutes()))
    returnArr.push(this.formatNumber(date.getSeconds()))
    
    for (const i in returnArr) {  
      format = format.replace(formateArr[i], returnArr[i])
    }  
    return format
  }

  /**
   * 格式化时间，转化为几分钟前，几秒钟前
   * @param timestamp 时间戳，单位是毫秒
   */
  timeFormat = (timestamp: number) => {
    const mistiming = Math.round((Date.now() - timestamp) / 1000)
    const arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
    for (let i = 0; i < arrn.length; i++) {
      const inm = Math.floor(mistiming / arrn[i])
      if (inm != 0) {
        return inm + arrr[i] + '前'
      }
    }
  }
}
