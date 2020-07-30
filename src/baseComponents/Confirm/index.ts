/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-30 17:15:28
 * @LastEditTime: 2020-07-31 01:02:01
 */
import Vue from 'vue'
import ConfirmComponent from './Confirm.vue'

const ConfirmConstructor = Vue.extend(ConfirmComponent)
const instance = new ConfirmConstructor().$mount(document.createElement('div'))

let init = false
const defaultOptions = {
  confirmText: '确定',
  cancelText: '取消'
}

const Confirm = (options: any) => {
  Object.assign(instance, defaultOptions, options)

  if (!init) {
    document.body.appendChild(instance.$el)
    init = true
  }

  return (instance as any).confirm()
}

export default Confirm
