export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

//添加类名
export function addClass(el, className) {
    if (hasClass(el, className)) return
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

//删除类名
export function removeClass (el, className) {
    if (!hasClass(el, className)) return
    let newClass = el.className.split(' ')
    let index = newClass.findIndex((item) => {
        return item === className
    })
    newClass.splice(index, 1)
    el.className = newClass.join(' ')
}