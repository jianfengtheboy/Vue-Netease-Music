/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-24 00:52:02
 * @LastEditTime: 2020-06-24 23:14:30
 * @Description: 自定义指令
 */ 
import VueInstance, { DirectiveOptions } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

// v-focus 输入框自动聚焦
const focus: DirectiveOptions = {
  inserted(el: HTMLElement) {
    el.focus()
  }
}

// v-image
const image: DirectiveOptions = {
  inserted(el: HTMLElement, binding: DirectiveBinding) {
    //为了真实体现效果，用了延时操作
    setTimeout(() => {
      el.setAttribute('src', binding.value)
    }, Math.random() * 1200)
  }
}

const globalDirectives = (Vue: typeof VueInstance) => {
  Vue.directive('focus', focus)
  Vue.directive('image', image)
}

export default globalDirectives
