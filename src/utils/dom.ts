/*
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-05-13 23:05:31
 * @LastEditTime: 2020-07-19 00:21:47
 * @Description: 操作dom
 */ 
export default class DomUtils {
	// 是否具有某个css class类名
	hasClass = (el: HTMLElement, className: string) => {
		const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
		return reg.test(el.className)
	}

	//添加类名
	addClass = (el: HTMLElement, className: string) => {
    if (this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
	}

	//删除类名
	removeClass = (el: HTMLElement, className: string) => {
    if (!this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    const index = newClass.findIndex((item: string) => {
			return item === className
    })
    newClass.splice(index, 1)
    el.className = newClass.join(' ')
	}

	// 获取滚动的坐标
	getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollTo,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTo
	})

	// el是否在视口范围内
	elementIsVisibleInViewport = (el: HTMLElement, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect()
    const { innerHeight, innerWidth } = window
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
	}

	// 洗牌算法随机
	shuffle = (arr: Array<number | string | null | undefined>) => {
    const result = []
    let random
    while (arr.length > 0) {
			random = Math.floor(Math.random() * arr.length)
			result.push(arr[random])
			arr.splice(random, 1)
    }
    return result
	}
}
