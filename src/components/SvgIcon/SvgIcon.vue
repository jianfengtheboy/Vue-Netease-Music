<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 02:10:36
 * @LastEditTime: 2021-02-15 17:31:53
 * @Description: svgIcon组件
--> 
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class SvgIcon extends Vue {
  @Prop({ required: true }) public iconClass!: string;
  @Prop({ default: '' }) public className?: string;

  public get iconName() {
    return `#icon-${this.iconClass}`
  }

  public get svgClass() {
    if (this.className) {
      return `svg-icon ${this.className}`
    } else {
      return `svg-icon `
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
} 
</style>
