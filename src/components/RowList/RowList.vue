<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-22 16:40:30
 * @LastEditTime: 2020-09-20 22:43:45
 * @Description: 
--> 
<template>
  <div class="row-list">
    <div class="row-item" v-for="(item, index) in items" :key="index" @click="toItemDetail(item)">
      <slot v-bind="item"></slot>
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class RowList extends Vue {
  @Prop() items!: object

  @Emit('toItemDetail')
  public toItemDetail(val: object) {
    return val
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.row-list {
  overflow: hidden;
  padding-left: $fontSize30 / 2;
  .row-item {
    display: flex;
    margin-bottom: $fontSize32 / 4;
    width: 100%;
    .row-hd {
      position: relative;
      width: $fontSize30 * 8 + 7;
      height: $fontSize30 * 8 + 7;
      overflow: hidden;
      @include borderRadius($fontSize30 / 5);
      &.bgBottomLinear:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        height: $fontSize50 + $fontSize24 / 4;
        background: linear-gradient(to top,$themeBlackOpacity20 0,$themeBlackOpacity10 80%,rgba(0,0,0,0) 100%);
      }
      &.bgTopLinear:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        height: $fontSize50 + $fontSize24 / 4;
        background: linear-gradient(to bottom,$themeBlackOpacity20 0,$themeBlackOpacity10 80%,rgba(0,0,0,0) 100%);
      }
      .playCount {
        position: absolute;
        top: $fontSize22 / 3;
        right: $fontSize22;
        z-index: 1;
        display: block;
        height: $fontSize34;
        line-height: $fontSize34;
        padding-left: $fontSize30;
        font-size: $fontSize22 - 2;
        color: $themeMainColor;
        @include bg-url("../../assets/image/zf.png");
        @include bg-full($p:left,$s:$fontSize22);
      }
      img {
        @include img-full;
      }
    }
    .row-bd {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      margin: 0 0 0 $fontSize22;
      padding: 0 $fontSize22 0 0;
      border-bottom: 1px solid $themeBlackOpacity5;
      p {
        height: $fontSize40;
        line-height: $fontSize40;
        font-size: $fontSize24;
        color: $theme666;
        word-break: keep-all;
        @include no-wrap-line(1);
      }
    }
    .row-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      padding: 0 $fontSize22;
      border-bottom: 1px solid $themeBlackOpacity5;
      .row-name {
        line-height: $lineHeight - 0.2;
        font-size : $fontSize28;
        font-weight: 700;
        color : $theme333;
        word-wrap: break-word;
        word-break: break-all;
        @include no-wrap-line(2);
      }
      .row-nickname {
        font-size: $fontSize22;
        color: $theme777;
      }
      .row-txt {
        font-size: $fontSize22;
        color: $theme777;
        line-height: $lineHeight - 0.1;
        .row-tag {
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
          font-size: $fontSize28 / 2;
          font-weight: 200;
          color: $themeColor;
          border:1px solid $themeColor;
          padding: 0 $fontSize22 / 10;
          border-radius: $fontSize30 / 10;
        }
      }
    }
  }
}
</style>
