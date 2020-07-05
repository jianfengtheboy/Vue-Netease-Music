/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-27 00:01:06
 * @LastEditTime: 2020-07-05 21:58:50
 * @Description: http
 */ 
import Interceptors from './request'

class Http {
  public axios: any
 
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // get请求
  public get(url: string, params?: string | object) {
    const config = {
      methods: 'get',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
  // post请求
  public post(url: string, params?: string | object) {
    const config = {
      methods: 'post',
      url: url
    }
    if(params) (config as any).data = params
    return this.axios(config)
  }
  // put请求
  public put(url: string, params?: string | object) {
    const config = {
      methods: 'put',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
  // delete请求
  public delete(url: string, params?: string | object) {
    const config = {
      methods: 'delete',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
}

const Https = new Http()

export default Https