/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-30 15:10:08
 * @LastEditTime: 2020-07-30 16:33:26
 * @Description: toast全局组件
 */
import ToastComponent from './Toast.vue'

const Toast = {
  install: (Vue: any) => {
    // 1.创建一个Vue的“子类”组件构造器
    const ToastConstructor = Vue.extend(ToastComponent)

    // 2.创建一个该子类的实例,并挂载到一个元素上
    const instance = new ToastConstructor()

    // 3.将这个实例挂载到动态创建的元素上,并将元素添加到全局结构中
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 4.在Vue的原型链上注册方法，控制组件
    Vue.prototype.$toast = (msg: string, type = 'normal', duration = 1500) => {
      instance.message = msg
      instance.type = type
      instance.visible = true
      setTimeout(() => {
        instance.visible = false
      }, duration)
    }
  }
}

export default Toast
