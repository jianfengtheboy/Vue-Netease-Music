<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-18 00:53:59
 * @LastEditTime: 2020-07-18 01:43:37
 * @Description: 瀑布流
 *  <v-water-fall :img_list="photo_list" :img_width="250" :img_margin_bottom="20" class="photo_img_box">
 *   <template slot-scope="scope">
 *     <img v-lazy="scope.row.url"> # 作用域插槽
 *   </template>
 *  </v-water-fall>
--> 
<template>
  <div
    class="waterfall_box"
    ref="waterfallBox"
    :style="`height:${waterFallBoxHeight}`"
  >
    <template v-if="waterfallColNum > 1">
      <div
        v-for="(img, index) in waterfallList"
        :key="index"
        class="waterfall_item"
        :style="{top: img.top + 'px', left: img.left + 'px', width: imgWidth + 'px', height: img.height}"
      >
        <slot :row="img"></slot>
      </div>
    </template>
    <template v-else>
      <div
        v-for="(img, index) in imgList"
        :key="index"
        style="margin-bottom: 20px;"
      >
        <slot :row="img"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class WaterFall extends Vue {
  // 图片列表
  @Prop({ required: true, type: Array })
  readonly imgList!: []
  // 图片宽度
  @Prop({ required: true, type: Number })
  readonly imgWidth!: number
  // 图片下边距
  @Prop({ required: true, type: Number })
  readonly imgMarginBottom!: number

  // 图片右边距
  private imgMarginRight!: number
  // 容器宽高
  private waterfallBoxWidth = 0
  private waterfallBoxHeight = 0
  // 列数
  private waterfallColNum = 0
  // 每列最大高度
  private waterfallColHeightList: Array<number> = []
  // 瀑布流用到的数据
  private waterfallList = []

  // 容器的高度 拼上单位
  private get waterFallBoxHeight() {
    return this.waterfallColNum <= 1 ? 'auto' : `${this.waterfallBoxHeight}px`
  }

  @Watch('imgList')
  imgListChange() {
    this.initParam()
  }

  async mounted() {
    const waterfallBoxDom: any = this.$refs.waterfallBox
    this.waterfallBoxWidth = waterfallBoxDom.offsetWidth
    window.addEventListener('resize', this.afreshLayoutWaterFall)
  }

  private beforeDestroy() {
    window.removeEventListener('resize', this.afreshLayoutWaterFall)
  }
  
  private initParam() {
    this.waterfallColNum = Math.floor(this.waterfallBoxWidth / this.imgWidth) || 1
    this.waterfallColHeightList = new Array(this.waterfallColNum).fill(0)
    this.imgMarginRight = (this.waterfallBoxWidth - this.waterfallColNum * this.imgWidth) / (this.waterfallColNum - 1)
    if (this.waterfallColNum <= 1) return
    this.layoutWatreFall()
  }

  // 瀑布流布局
  private layoutWatreFall() {
    const tempWaterfallList: any = []
    this.imgList.forEach((imgItem: any) => {
      const minIndex = this.finMinHeightIndex()
      const imgObj = {
        ...imgItem,
        url: imgItem.url,
        width: this.imgWidth,
        height: Math.floor((this.imgWidth / imgItem.width) * imgItem.height),
        top: this.waterfallColHeightList[minIndex],
        left: minIndex * (this.imgMarginRight + this.imgWidth)
      }
      tempWaterfallList.push(imgObj)
      this.waterfallColHeightList[minIndex] += imgObj.height + this.imgMarginBottom
    })
    this.waterfallList = tempWaterfallList
    this.waterfallBoxHeight = Math.max.call(null, ...this.waterfallColHeightList)
  }

  // 找到数组最小值下标
  private finMinHeightIndex() {
    return this.waterfallColHeightList.indexOf(Math.min.call(null, ...this.waterfallColHeightList))
  }

  private afreshLayoutWaterFall() {
    const waterfallBoxDom: any = this.$refs.waterfallBox
    if (waterfallBoxDom) {
      this.waterfallBoxWidth = waterfallBoxDom.offsetWidth
      this.initParam()
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall_box {
  position: relative;
  margin: 0 auto;
  .waterfall_item {
    float: left;
    position: absolute;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
