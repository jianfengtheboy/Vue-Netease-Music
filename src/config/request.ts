/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-26 23:21:23
 * @LastEditTime: 2020-08-05 17:31:19
 * @Description: request
 */ 
import axios from 'axios'
import { baseURL, ERR_OK } from './config'

export default class Interceptors {
  [x: string]: any
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
      return config
    }, (error: string | object) => {
      this.$toast(error, 'error')
      Promise.reject(error)
    })
    
    this.instance.interceptors.response.use(
      (response: { data: { code: number } }) => {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(response.data)
        }
        if (response.data.code && response.data.code === ERR_OK) {
          return response.data
        }
        this.$toast((response.data as any).msg || (response.data as any).statusText, 'warning')
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
              this.$toast(res.data.msg || '请先登录', 'error')
              break
            case 400:
              this.$toast(res.data.message || res.data.msg || '资源不在收藏列表中', 'error')
              break
            case 401:
              this.$toast(res.data.msg || '请先登录', 'error')
              break
            case 403:
              this.$toast(res.data.msg || '权限不足', 'error')
              break
            case 404:
              this.$toast(res.data.msg || '请求资源不存在', 'error')
              break
            case 408:
              this.$toast(res.data.message || '已经收藏过该视频', 'error')
              break
            case 500:
              this.$toast(res.data.msg || '服务器开小差啦', 'error')
              break
            case 504:
              this.$toast(res.data.msg || '网络请求失败', 'error')
              break
            default:
              this.$toast(res.data.msg || res.statusText, 'error')
          }
        } else {
          this.$toast('请检查网络连接状态!', 'error')
        }
        return Promise.reject(error.response)
      })
  }
}
