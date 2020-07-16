/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-25 00:02:06
 * @LastEditTime: 2020-07-16 10:55:01
 * @Description: storage
 */
export default class StorageUtils {
  /**
   * @localStorage
   * @param key 键
   * @param value 值
   */
  // localStorage 存贮
  localStorageSet = (key: string, value: string | object) => {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  // localStorage 获取
  localStorageGet = (key: string) => {
    return localStorage.getItem(key)
  }

  // localStorage 移除
  localStorageRemove = (key: string) => {
    localStorage.removeItem(key)
  }

  // localStorage 存贮某一段时间失效
  localStorageSetExpire = (key: string, value: string | object, expire: number | undefined) => {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
    setTimeout(() => {
      localStorage.removeItem(key)
    }, expire)
  }

  /**
   * @sessionStorage
   * @param key 键
   * @param value 值
   */
  // sessionStorage 存贮
  sessionStorageSet = (key: string, value: string | object) => {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }

  // sessionStorage 获取
  sessionStorageGet = (key: string) => {
    return sessionStorage.getItem(key)
  }

  // sessionStorage 删除
  sessionStorageRemove = (key: string) => {
    sessionStorage.removeItem(key)
  }

  // sessionStorage 存贮某一段时间失效
  sessionStorageSetExpire = (key: string, value: string | object, expire: number | undefined) => {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
    setTimeout(() => {
      sessionStorage.removeItem(key)
    }, expire)
  }

  /**
   * @cookie
   * @param key 键
   * @param value 值
   * @param expire 过期时间
   */
  // cookie 存贮
  cookieSet = (key: string, value: string | object, expire: number) => {
    const d = new Date()
    d.setDate(d.getDate() + expire)
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`
  }

  // cookie 获取
  cookieGet = (key: string) => {
    const cookieStr = unescape(document.cookie)
    const arr = cookieStr.split('; ')
    let cookieValue = ''
    for (let i = 0; i < arr.length; i++) {
      const temp = arr[i].split('=')
      if (temp[0] === key) {
        cookieValue = temp[1]
        break
      }
    }
    return cookieValue
  }

  // cookie 删除
  cookieRemove = (key: string) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
  }
}
