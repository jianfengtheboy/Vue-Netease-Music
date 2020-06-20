<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 02:10:36
 * @LastEditTime: 2020-06-21 00:29:16
 * @Description: svgIcon组件
--> 
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({ required: true }) private iconClass!: string;
  @Prop({ default: '' }) private className?: string;

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

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
} 
</style>
