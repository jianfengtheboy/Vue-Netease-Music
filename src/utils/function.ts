/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-16 13:23:53
 * @LastEditTime: 2020-07-16 23:35:01
 * @Description: function
 */ 
export default class FunctionUtils {
  // 递归生成树形结构
  getTreeData = (data: string | any[], pid: any, pidName = 'parentId', idName = 'id', childrenName = 'children') => {
    const arr = []
    for (let i = 0; i < data.length; i++) {
      if (data[i][pidName] == pid) {
        data[i].key = data[i][idName]
        data[i][childrenName] = this.getTreeData(data, data[i][idName], pidName, idName, childrenName)
        arr.push(data[i])
      }
    }
    return arr
  }

  // 遍历树节点
  foreachTree = (data: string | any[], childrenName = 'children', callback: (arg0: any) => void) => {
    for (let i = 0; i < data.length; i++) {
      callback(data[i])
      if (data[i][childrenName] && data[i][childrenName].length > 0) {
        this.foreachTree(data[i][childrenName], childrenName, callback)
      }
    }
  }

  // 追溯父节点
  traceParentNode = (pid: any, data: any, rootPid: any, pidName = 'parentId', idName = 'id', childrenName = 'children') => {
    let arr: any[] = []
    this.foreachTree(data, childrenName, (node: { [x: string]: any }) => {
      if (node[idName] == pid) {
        arr.push(node);
        if (node[pidName] != rootPid) {
          arr = arr.concat(this.traceParentNode(node[pidName], data, rootPid, pidName, idName));
        }
      }
    })
    return arr
  }

  // 寻找所有子节点
  traceChildNode = (id: any, data: string | any[], pidName = 'parentId', idName = 'id', childrenName = 'children') => {
    let arr: any[] = []
    this.foreachTree(data, childrenName, (node) => {
      if (node[pidName] == id) {
        arr.push(node);
        arr = arr.concat(this.traceChildNode(node[idName], data, pidName, idName, childrenName));
      }
    })
    return arr
  }

  // 根据pid生成树形结构
  createTree = (items: any[], id = null, link = 'pid') =>{
    items.filter((item: { [x: string]: null }) =>
      item[link] === id).map((item: { id: any }) => ({ ...item, children: this.createTree(items, item.id) }))
  }

  // Windows根据详细版本号判断当前系统名称
  OutOsName = (osVersion: string) => {
    if (!osVersion) {
      return
    }
    const str = osVersion.substr(0, 3)
    if (str === "5.0") {
      return "Win 2000"
    } else if (str === "5.1") {
      return "Win XP"
    } else if (str === "5.2") {
      return "Win XP64"
    } else if (str === "6.0") {
      return "Win Vista"
    } else if (str === "6.1") {
      return "Win 7"
    } else if (str === "6.2") {
      return "Win 8"
    } else if (str === "6.3") {
      return "Win 8.1"
    } else if (str === "10.") {
      return "Win 10"
    } else {
      return "Win"
     }
  } 

  /**
    * @判断手机是Andoird还是IOS
    *  @return { 0 : ios }
    *  @return { 1: android }
    *  @return { 2: 其它 }
    */
  getOSType = () => {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isIOS) {
      return 0
    }
    if (isAndroid) {
      return 1
    }
    return 2
  }

  /**
    * @函数防抖
    * @param { function } func
    * @param { number } wait 延迟执行毫秒数
    * @param { boolean } immediate  true 表立即执行，false 表非立即执行
    */
  debounce = (func: { apply: (arg0: any, arg1: IArguments) => void }, wait: number | undefined, immediate: any) => {
    let timeout: number | null | undefined
    return () => {
      const args = FunctionUtils.arguments
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(this, args)
      } else {
        timeout = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    }
  }

  /**
    * @函数节流 
    * @param { function } func 函数
    * @param { number } wait 延迟执行毫秒数
    * @param { number } type 1 表时间戳版，2 表定时器版
    */
  throttle = (func: { apply: (arg0: any, arg1: IArguments) => void }, wait: number ,type: number) => {
    let previous: number, timeout: number | null;
    if (type === 1) {
      previous = 0
    } else if (type === 2) {
      timeout = null
    }
    return () => {
      const args = FunctionUtils.arguments
      if (type === 1) {
        const now = Date.now()
        if (now - previous > wait) {
          func.apply(this, args)
          previous = now
        }
      } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
            func.apply(this, args)
          }, wait)
        }
      }
    }
  }

  /**
    * @数组乱序
    * @param {array} arr
    */
  arrScrambling = (arr: any) => {
    const array = arr
    let index = array.length
    while (index) {
      index -= 1
      const randomIndex = Math.floor(Math.random() * index)
      const middleware = array[index]
      array[index] = array[randomIndex];
      array[randomIndex] = middleware
    }
    return array
  }

  /**
    * @递归优化尾递归
    * @param { function } f
    */
  tco = (f: { apply: (arg0: any, arg1: any) => any }) => {
    let value: any
    let active = false
    const accumulated: IArguments[] = []
    return () => {
      accumulated.push(FunctionUtils.arguments)
      if (!active) {
        active = true
        while (accumulated.length) {
          value = f.apply(this, accumulated.shift())
        }
        active = false
        return value
      }
    }
  }

  /**
    * @去除空格
    * @param { string } str 待处理字符串
    * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
    */
  trim = (str: string, type = 1) => {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return
    switch (type) {
      case 1:
        return str.replace(/\s/g, "")
      case 2:
        return str.replace(/(^\s)|(\s*$)/g, "")
      case 3:
        return str.replace(/(^\s)/g, "")
      case 4:
        return str.replace(/(\s$)/g, "")
      default:
        return str
    }
  }

  /**
    * @大小写转换
    * @param { string } str 待转换的字符串
    * @param { number } type 1-全大写 2-全小写 3-首字母大写 其他-不转换
    */
  turnCase = (str: string, type: number) => {
    switch (type) {
      case 1:
        return str.toUpperCase()
      case 2:
        return str.toLowerCase()
      case 3:
        return str[0].toUpperCase() + str.substr(1).toLowerCase()
      default:
        return str
    }
  }

  // 随机16进制颜色 hexColor
  hexColor = () => {
    let str = '#'
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < 6; i++) {
      const index = Number.parseInt((Math.random() * 16).toString())
      str += arr[index]
    }
    return str
  }

  // 随机16进制颜色 randomHexColorCode
  randomHexColorCode = () => {
    const n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  // 检测移动/PC设备
  detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
  }

  /**
    * @隐藏所有指定标签
    * 例: hide(document.querySelectorAll('img'))
    */
  hideTag = (...el: any) => [...el].forEach(e => (e.style.display = 'none'))

  /**
    * @返回指定元素的生效样式
    * @param { element} el  元素节点
    * @param { string } ruleName  指定元素的名称
    */
  getStyle = (el: Element, ruleName: string) => window.getComputedStyle(el, null).getPropertyValue(ruleName)

  /**
    * @检查是否包含子元素
    * @param { element } parent
    * @param { element } child
    * 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
    */
  elementContains = (parent: any, child: any) => parent !== child && parent.contains(child);

  /**
   * @切换一个元素的类
   * @param el 
   * @param className
   * 例：toggleClass(document.querySelector('p.special'), 'special')
   */
  toggleClass = (el: any, className: string) => el.classList.toggle(className)

  /**
   * @获取元素中的所有图像
   * @param el 
   * @param includeDuplicates
   * 例：getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
   */
  getImages = (el: any, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'))
    return includeDuplicates ? images : [...new Set(images)]
  }

  /**
   * @将一组表单元素转化为对象
   * @param form 
   * 例： formToObject(document.querySelector('#form'))
   */
  formToObject = (form: HTMLFormElement | undefined) =>
    Array.from(new FormData(form)).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value
      }),
      {}
    )
  
  /**
   * 从对象检索给定选择器指示的一组属性
   * @param from 
   * @param selectors 
   * 例： get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); ['val to select', 1, 'test']
   */
  get = (from: any, ...selectors: any) =>
    [...selectors].map(s =>
      s // eslint-disable-next-line
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t: string) => t !== '')
        .reduce((prev: { [x: string]: any }, cur: string | number) => prev && prev[cur], from)
    )

  // 向传递的URL发出GET请求
  httpGet = (url: string, callback: (arg0: string) => any, err = console.error) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = () => callback(request.responseText)
    request.onerror = () => err(request)
    request.send()
  }

  // 向传递的URL发出POST请求
  httpPost = (url: string, data: any, callback: (arg0: string) => any, err = console.error) => {
    const request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    request.onload = () => callback(request.responseText)
    request.onerror = () => err(request)
    request.send(data)
  }
  
  /**
   * @指定选择器创建具有指定范围和步长和持续时间的计数器
   * 例：counter('#my-id', 1, 1000, 5, 2000); 让 `id=“my-id”`的元素创建一个2秒计时器
   */
  counter = (selector: any, start: number, end: number, step = 1, duration = 2000) => {
    let current = start
    const _step = (end - start) * step < 0 ? -step : step
    const timer = setInterval(() => {
      current += _step
      document.querySelector(selector).innerHTML = current
      if (current >= end) document.querySelector(selector).innerHTML = end
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))))
    return timer
  }

  // 获取上下文路径
  getRootPath = () => {
    const curWwwPath = window.document.location.href
    const pathName = window.document.location.pathname
    const pos = curWwwPath.indexOf(pathName)
    const localhostPaht = curWwwPath.substring(0, pos)
    const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
    return(localhostPaht + projectName)
  }

}
