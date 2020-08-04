<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-22 16:08:21
 * @LastEditTime: 2020-08-04 17:05:59
 * @Description: 
--> 
<template>
  <div class="netNav">
    <div class="navLeft" @click="goBack"></div>
    <div class="navTitle">{{title}}</div>
    <slot class="navRight"></slot>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NetNav extends Vue {
  @Prop({ default: '' }) title?: string

  private goBack(): void {
    this.$router.back()
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.netNav {
  position: relative;
  height: $fontSize40 * 2;
  padding: $fontSize28 / 2 $fontSize50 * 2 + 5;
  line-height: $fontSize40 * 2;
  color: $themeWhite;
  background-color: $themeColor;
  overflow: hidden;
  .navLeft {
    display: block;
    position: absolute;
    top: $fontSize30;
    left: $fontSize34 + 1;
    width: $fontSize26 * 2;
    height: $fontSize26 * 2;
    @include bg-url('../../assets/image/oq.png');
    @include bg-full;
    z-index: 1;
  }
  .navTitle {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: $fontSize30;
    z-index: 1;
  }
  .navRight {
    position: absolute;
    top: $fontSize30;
    right: $fontSize34 + 1;
    z-index: 1;
  }
}
</style>
