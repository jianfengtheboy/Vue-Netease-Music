<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-19 23:10:05
 * @LastEditTime: 2020-07-20 22:43:20
 * @Description: Scroll组件
--> 
<template>
  <div ref="wrapper" class="list-wrapper">
    <div ref="listWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Scroll extends Vue {
  private isPullingDown?: boolean
  private isPullUpLoad?: boolean
  private pullUpDirty?: boolean
  private scroll!: any

  constructor() {
    super()
    this.isPullingDown = false
    this.isPullUpLoad = false
    this.pullUpDirty = true
    this.scroll = undefined
  }

  public $refs!: {
    scroll: HTMLDivElement;
    wrapper: HTMLDivElement;
    listWrapper: HTMLDivElement;
  }
  
  @Prop({ default: null }) public renderData?: Array<any>
  @Prop({ default: 1 }) public probeType?: number
  @Prop({ default: true }) public click?: boolean
  @Prop({ default: false }) public listenScroll?: boolean
  // 是否派发顶部下拉的事件，用于下拉刷新
  @Prop({ default: false }) public pullDownRefresh?: null
  // 是否派发滚动到底部的事件，用于上拉加载
  @Prop({ default: false }) public pullUpLoad?: null
  @Prop({ default: 20 }) public refreshDelay?: number

  private mounted(): void {
    // 保证在DOM渲染完毕后初始化better-scroll
    this.$nextTick(() => {
      this.initScroll()
    })
  }

  private destroyed(this: any): void {
    this.$refs.scroll && this.$refs.scroll.destroy()
  }

  @Watch('renderData', { immediate: true, deep: true })
  private onWatchRenderData(): void {
    setTimeout(() => {
      this.forceUpdate(true)
    }, this.refreshDelay)
  }

  @Emit('scroll')
  private onScroll() {
    this.scroll.on('scroll', (pos: any) => {
      return pos
    })
  }

  @Emit('pullingUp')
  private onPullingUp() {
    this.scroll.on('pullingUp', () => {
      this.isPullUpLoad = true
    })
  }

  @Emit('pullingDown')
  private onPullingDown() {
    this.scroll.on('pullingDown', () => {
      this.isPullingDown = true
    })
  }

  private initScroll(): void {
    if (!this.$refs.wrapper) return
    // better-scroll的初始化
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click : this.click,
      pullDownRefresh : this.pullDownRefresh,
      pullUpLoad : this.pullUpLoad
    })
    // 是否派发滚动事件
    if (this.listenScroll) {
      this.onScroll()
    }
    // 是否派发滚动到底部事件，用于上拉加载
    if (this.pullUpLoad) {
      this.onPullingUp()
    }
    // 是否派发顶部下拉事件，用于下拉刷新
    if (this.pullDownRefresh) {
      this.onPullingDown()
    }
  }

  private enable(): void {
    this.scroll && this.scroll.enable()
  }

  private disable(): void {
    this.scroll && this.scroll.disable()
  }

  private refresh(): void {
    this.scroll && this.scroll.refresh()
  }

  private scrollTo(): void {
    this.scroll && this.scroll.scrollTo.apply(this.scroll)
  }

  private scrollToElement(): void {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll)
  }

  private destroy(): void {
    this.scroll.destroy()
  }

  private forceUpdate(dirty?: any): void {
    if (this.pullDownRefresh && this.isPullingDown) {
      this.isPullingDown = false
    } else if (this.pullUpLoad && this.isPullUpLoad) {
      this.isPullUpLoad = false
      this.pullUpDirty = dirty
      this.scroll.finishPullUp()
      this.refresh()
    } else {
      this.refresh()
    }
  }
}
</script>
