module.exports = {
  "plugins": {
    "autoprefixer": {},
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
    "postcss-viewport-units" : {}
  }
}
