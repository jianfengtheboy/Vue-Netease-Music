/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-27 00:01:06
 * @LastEditTime: 2020-06-27 01:20:17
 * @Description: http
 */ 
import Interceptors from './request'

export default class Http {
  public axios: any
 
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // get请求
  get(url: string, params: string | object){
    const config = {
      methods: 'get',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
  // post请求
  post(url: string, params: any){
    const config = {
      methods: 'post',
      url: url
    }
    if(params) (config as any).data = params
    return this.axios(config)
  }
  // put请求
  put(url: any, params: any){
    const config = {
      methods: 'put',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
  // delete请求
  delete(url: any, params: any){
    const config = {
      methods: 'delete',
      url: url
    }
    if(params) (config as any).params = params
    return this.axios(config)
  }
}
