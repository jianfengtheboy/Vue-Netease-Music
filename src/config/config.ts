/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-05-13 23:05:31
 * @LastEditTime: 2020-06-26 23:42:02
 * @Description: config.js
 */

//网络请求地址
export const baseURL = 'http://localhost:3000'

//默认分页数量
export const defaultLimit = 30

/**
* 播放模式
* listLoop: 列表循环
* order：顺序
* loop: 单曲循环
* random: 随机
*/
export const playMode = {
   listLoop : 0,
   order : 1,
   random : 2,
   loop : 3
}

export const ERR_OK = 200
