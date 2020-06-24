/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-24 00:52:02
 * @LastEditTime: 2020-06-24 00:56:16
 * @Description: 自定义指令
 */ 
import VueInstance, { DirectiveOptions } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

const stopReclick: DirectiveOptions = {
  inserted (el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
}

const globalDirectives = (Vue: typeof VueInstance) => {
  Vue.directive('stopReclick', stopReclick)
}

export default globalDirectives
