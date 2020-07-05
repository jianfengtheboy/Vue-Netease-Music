/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-26 23:21:23
 * @LastEditTime: 2020-07-05 21:59:25
 * @Description: request
 */ 
import axios from 'axios'
import { Base64 } from 'js-base64'
import { baseURL, ERR_OK } from './config'

export default class Interceptors {
  public instance: any

  constructor() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 30000,
      withCredentials: true
    })
    // 初始化拦截器
    this.initInterceptors()
  }

  // http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance
  }

  // 初始化拦截器
  initInterceptors() {
    this.instance.interceptors.request.use((
      config: { 
        headers: { [x: string]: string };
        method: string;
        params: { params: string | number | object | Array<string | number> };
      }) => {
      if (process.env.NODE_ENV !== 'production' && config.method == 'get' && config.params) {
        config.params = {
          params: Base64.encode(JSON.stringify(config.params))
        }
      }
      return config
    }, (error: string | object) => {
      Promise.reject(error)
    })
    
    this.instance.interceptors.response.use(
      (response: { data: { code: number } }) => {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(Base64.decode(response.data))
        }
        if (response.data.code && response.data.code === ERR_OK) {
          return response.data
        }
        return Promise.reject(response.data)
      },
      (error: {
        response: {
          status: number;
          data: { msg: string; message: string };
          statusText: string;
        };
      }) => {
        if (error.response) {
          const res = error.response
          switch (res.status) {
            case 301:
              localStorage.removeItem('userId')
              console.error(res.data.msg || '请先登录')
              break
            case 400:
              console.error(res.data.message || res.data.msg || '资源不在收藏列表中')
              break
            case 401:
              console.error(res.data.msg || '请先登录')
              break
            case 403:
              console.error(res.data.msg || '权限不足')
              break
            case 404:
              console.error(res.data.msg || '请求资源不存在')
              break
            case 408:
              console.error(res.data.message || '已经收藏过该视频')
              break
            case 500:
              console.error(res.data.msg || '服务器开小差啦')
              break
            case 504:
              console.error(res.data.msg || '网络请求失败')
              break
            default:
              console.error(res.data.msg || res.statusText)
          }
        }
        return Promise.reject(error.response)
      })
  }
}
