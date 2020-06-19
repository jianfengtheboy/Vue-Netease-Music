/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-05-13 23:05:31
 * @LastEditTime: 2020-06-20 01:12:49
 * @Description: 操作dom
 */ 
export default class DomUtils {
	// 是否具有某个css class类名
	hasClass(el: { className: string }, className: string) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
	}

	//添加类名
	addClass(el: { className: string }, className: string) {
    if (this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
	}

	//删除类名
	removeClass (el: { className: string }, className: string) {
    if (!this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    const index = newClass.findIndex((item: string) => {
			return item === className
    })
    newClass.splice(index, 1)
    el.className = newClass.join(' ')
	}
}
