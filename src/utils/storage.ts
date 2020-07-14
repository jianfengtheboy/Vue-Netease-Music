/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-25 00:02:06
 * @LastEditTime: 2020-07-14 09:15:26
 * @Description: storage
 */
export default class StorageUtils {
  // localStorage缓存
  save (key: string, value: string) {
    if (!key) return console.warn('save storage key can`t null!')
    if (value) {
      localStorage ? localStorage.setItem(key, value) : this.setCookie(key, value, 0)
    } else {
      localStorage ? localStorage.removeItem(key) : this.removeCookie(key)
    }
  }
  // localStorage缓存对象
  saveObject (key: string, object: string) {
    try {
      object = typeof object === 'object' ? JSON.stringify(object) : object
    } catch (e) {
      console.error(`storage saveObject of '${key}' error. \nerror :`, e, '\nvalue : ', object)
    }
    this.save(key, object)
  }
  // SessionStorage缓存
  saveForSession(key: string, value: string) {
    value = typeof value === 'object' ? JSON.stringify(value) : value
    if (sessionStorage) sessionStorage.setItem(key, value)
  }

  // SessionStorage获取
  GetForSession(key: string) {
    if (!key) return console.warn('get item key can not null!')
    if (sessionStorage) return sessionStorage.getItem(key)
  }

  // 取值
  get (key: string) {
    if (!key) return console.warn('get item key can not null!')
    let value
    if (localStorage) {
      value = localStorage.getItem(key)
    } else {
      value = this.getCookie(key)
    }
    return value
  }

  // 获取缓存数据
  getObjcet (key: string) {
    let value = this.get(key)
    try {
      value = typeof value === 'string' ? JSON.parse(value) : value
    } catch (e) {
      console.error(`storage getObjcet of '${key}' error \n`, e)
    }
    return value
  }

  // 删除缓存
  remove (key: string) {
    if (!key) return console.warn('storage remove key can`t null!')
    localStorage ? localStorage.removeItem(key) : this.removeCookie(key)
  }

  removeForSession (key: string) {
    if (!key) return console.warn('storage remove key can`t null!')
    sessionStorage && sessionStorage.removeItem(key)
  }

  // 获取cookie值
  getCookie (key: string) {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    }
    return null
  }

  // 删除cookie值
  removeCookie (key: string) {
    this.setCookie(key, '', -1)
  }

  // 保存cookie
  setCookie (key: string, value: string, day: number) {
    if (day !== 0) { // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      const expires = day * 24 * 60 * 60 * 1000
      const date = new Date(+new Date() + expires)
      document.cookie = key + '=' + escape(value) + ';expires=' + date.toUTCString()
    } else {
      document.cookie = key + '=' + escape(value)
    }
  }
  
  // 生成一个通用唯一标识符
  creatUuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
