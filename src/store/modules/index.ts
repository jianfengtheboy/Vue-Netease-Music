/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-31 14:29:52
 * @LastEditTime: 2020-07-31 14:59:19
 * @Description: 
 */
const files = require.context('.', false, /\.ts$/)
const modules: any = {}

files.keys().forEach(key => {
  if (key === './index.ts') return
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default modules
