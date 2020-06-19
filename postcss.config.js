/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 02:01:02
 * @LastEditTime: 2020-06-20 02:01:46
 * @Description: 配置postcss
 */ 
module.exports = {
  "plugins": {
    "postcss-import" : {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini" : {},
    "postcss-write-svg" : {
      utf8 : false
    },
    "postcss-cssnext" : {},
    "postcss-px-to-viewport" : {
      viewportWidth: 750,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    },
    "cssnano": {
      "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
      }
    },
    "postcss-viewport-units" : {
      filterRule: rule => rule.selector.indexOf('::after') === -1 && 
      rule.selector.indexOf('::before') === -1 && 
      rule.selector.indexOf(':after') === -1 && 
      rule.selector.indexOf(':before') === -1
    },
    "postcss-flexbugs-fixes" : {}
  }
}
