<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-02 16:05:35
 * @LastEditTime: 2020-07-02 16:13:26
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

<script>
import BScroll from 'better-scroll'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Slider extends Vue {

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
