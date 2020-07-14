<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-02 16:05:35
 * @LastEditTime: 2020-07-14 22:52:53
 * @Description: slider组件
-->
<template>
  <div class="slider" ref="slider">
    <div class="sliderGroup" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{ active : currentPageIndex === index}"
      >
      </span>
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Slider extends Vue {
  // data
  private dots!: Array<any>
  private currentPageIndex!: number
  private timer!: any
  private children!: Array<any>
  private slider!: any

  constructor() {
    super()
    this.dots = []
    this.currentPageIndex = 0
    this.timer = undefined
    this.children = []
    this.slider = undefined
  }

  // $ref
  public $refs!: {
    slider: HTMLDivElement;
    sliderGroup: HTMLDivElement;
  }

  // props
  @Prop({ default: true }) public loop?: boolean
  @Prop({ default: true }) public autoPlay?: boolean
  @Prop({ default: 4000 }) public interval!: number

  // mounted
  private mounted(): void {
    setTimeout(() => {
      this.setSliderWidth()
      this.initSlider()
      this.initDots()
      if (this.autoPlay) {
        this.play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this.setSliderWidth(true)
      this.slider.refresh()
    })
  }

  // activated
  private activated(): void {
    if (this.autoPlay) {
      this.play()
    }
  }

  // deactivated
  private deactivated(): void {
    clearTimeout(this.timer)
  }

  // beforeDestroy
  private beforeDestroy(): void {
    clearTimeout(this.timer)
  }

  // destroyed
  private destroyed(): void {
    clearTimeout(this.timer)
  }

  // methods
  private setSliderWidth(this: any, isResize?: boolean): void {
    this.children = this.$refs.sliderGroup.children
    let width = 0
    const sliderWidth = this.$refs.slider.clientWidth
    for (let i = 0; i < this.children.length; i ++) {
      const child = this.children[i]
      this.$utils.dom.addClass(child, 'slider-item')
      child.style.width = `${sliderWidth}px`
      width += sliderWidth
    }
    if (this.loop && !isResize) {
      width += 2 * sliderWidth
    }
    this.$refs.sliderGroup.style.width = `${width}px`
  }

  private initSlider(): void {
    this.slider = new BScroll(this.$refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: 0.3,
        speed: 600 
      },
      click: true
    })
    this.slider.on('scrollEnd', () => {
      const pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        clearTimeout(this.timer)
        this.play()
      }
    })
    this.slider.on('beforeScrollStart', () => {
      if (this.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }

  private initDots(): void {
    this.dots = new Array(this.children.length - 2)
  }

  private play(): void {
    this.timer = setTimeout(() => {
      this.slider.next()
    }, this.interval)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.slider {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 1px;
  .sliderGroup {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      padding: 0 9.25px;
      height: 100%;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        @include borderRadius($fontSize28 / 2);
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 25px;
    @include transform(translateZ($fontSize28 / 28));
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin:0 $fontSize28 / 4;
      width: $fontSize28 / 2 - 1;
      height: $fontSize28 / 2 - 1;
      @include borderRadius(50%);
      background-color: $themeWhiteOpacity60;
      &.active {
        background-color: $themeColor;
      }
    }
  }
}
</style>
