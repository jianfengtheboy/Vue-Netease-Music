/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-16 00:16:52
 * @LastEditTime: 2020-07-16 14:03:55
 * @Description: browser
 */ 
export default class BrowserUtils {
  // 获取当前url
  currentURL = () => window.location.href

  // 获取url参数
  getUrlParam = (name: string, origin: null | string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = null
    if (origin == null) {
      r = window.location.search.substr(1).match(reg)
    } else {
      r = origin.substr(1).match(reg)
    }
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  // 修改url中的参数
  replaceParamVal = (paramName: string, replaceWith: string) => {
    const oUrl = location.href.toString()
    const re = eval('/('+ paramName + '=)([^&]*)/gi')
    location.href = oUrl.replace(re, paramName + '=' + replaceWith)
    return location.href
  }

  // 获取窗口可视范围的高度
  getClientHeight = () => {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight)
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    }
    return clientHeight
  }

  // 获取窗口可视范围宽度
  getPageViewWidth = () => {
    const d = document
    const a = d.compatMode == "BackCompat" ? d.body : d.documentElement
    return a.clientWidth
  }

  // 获取窗口宽度
  getPageWidth = () => {
    const g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ? a : g.documentElement
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth)
  }

  // 获取窗口尺寸
  getViewportOffset = () => {
    if (window.innerWidth) {
      return {
        w: window.innerWidth,
        h: window.innerHeight
      }
    } else {
      // ie8及其以下
      if (document.compatMode === "BackCompat") {
        // 怪异模式
        return {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
      } else {
        // 标准模式
        return {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }
      }
    }
  }

  // 获取滚动条距顶部高度
  getPageScrollTop = () => {
    const a = document
    return a.documentElement.scrollTop || a.body.scrollTop
  }

  // 获取滚动条距左边的高度
  getPageScrollLeft = () => {
    const a = document
    return a.documentElement.scrollLeft || a.body.scrollLeft
  }

  // 开启全屏
  launchFullscreen = (element: { requestFullscreen: () => void; mozRequestFullScreen: () => void; msRequestFullscreen: () => void; webkitRequestFullscreen: any; webkitRequestFullScreen: () => void }) => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }

  // 关闭全屏
  exitFullscreen = (document: { exitFullscreen: () => void; msExitFullscreen: () => void; mozCancelFullScreen: () => void; webkitExitFullscreen: () => void }) => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  // 返回当前滚动条位置
  getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollTo,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTo
  })

  // 滚动到指定元素区域
  smoothScroll = (element: any) => {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    })
  }

  // 平滑滚动到页面顶部
  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  // http跳转https
  httpsRedirect = () => {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1])
  }

  // 检查页面底部是否可见
  bottomVisible = () => {
    return document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  }

  // 自适应页面（rem）
  AutoResponse = (width = 750) => {
    const target = document.documentElement
    target.clientWidth >= 600
      ? (target.style.fontSize = "80px")
      : (target.style.fontSize = target.clientWidth / width * 100 + "px")
  }
}
