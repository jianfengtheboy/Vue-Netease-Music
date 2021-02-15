<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-22 16:36:01
 * @LastEditTime: 2021-02-15 17:31:46
 * @Description: songList组件
--> 
<template>
  <div class="song-list">
    <div class="song-item" v-for="(item, index) in items" :key="index" @click="toItemDetail(item)">
      <slot v-bind="item"></slot>
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({})
export default class SongList extends Vue {
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

.song-list {
  display: flex;
  flex-flow: wrap;
  padding: 0 $fontSize30 / 3 $fontSize30 / 3;
  .song-item {
    flex: 0 0 33.33333%;
    box-sizing: border-box;
    padding: $fontSize30 / 3 $fontSize30 / 6 $fontSize30 / 3;
    .song-img {
      width: 100%;
      height: 0;
      padding-top: 100%;
      border-radius: $fontSize24 / 2;
      overflow: hidden;
      position: relative;
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
        position: absolute;
        top: 0;
        left: 0;
        @include img-full;
      }
    }
    .song-title {
      margin: $fontSize24 / 3 $fontSize30 / 6;
      line-height: $lineHeight;
      color: $theme333;
      font-size: $fontSize22;
      word-wrap: break-word;
      word-break: break-all;
      @include no-wrap-line(2);
    }
  }
}
.topPlayListMusic {
  .song-item {
    flex: 0 0 50%;
  }
}
</style>
