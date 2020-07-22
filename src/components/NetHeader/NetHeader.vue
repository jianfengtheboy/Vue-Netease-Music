<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-22 16:22:32
 * @LastEditTime: 2020-07-22 16:31:52
 * @Description: 
--> 
<template>
  <div class="netHeader">
    <div class="netHeaderLeft"></div>
    <div class="netHeaderTitle">
      <router-link tag="div" class="netHeaderIcon discover" to="/discover"></router-link>
      <router-link tag="div" class="netHeaderIcon video" to="/userVideo"></router-link>
      <router-link tag="div" class="netHeaderIcon mine" to="/mine"></router-link>
      <router-link tag="div" class="netHeaderIcon friends" to="/friends"></router-link>
    </div>
    <div class="netHeaderRight"></div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NetHeader extends Vue {}
</script>

<style scoped lang="scss">
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.netHeader {
  position: relative;
  background-color: $themeColor;
  z-index: 9;
  .netHeaderLeft {
    position: absolute;
    top: $fontSize30 + 1;
    left: $fontSize28 - 1;
    width: $fontSize48;
    height: $fontSize48;
    background-image: url("../../assets/image/ov.png");
    @include bg-full;
  }
  .netHeaderTitle {
    display: flex;
    justify-content: center;
    padding: $fontSize30 + 0.5 4 * $fontSize40;
    .netHeaderIcon {
      flex: 0 0 25%;
      height: $fontSize50;
      @include bg-full($s:cover);
      &.mine {
        background-image: url("../../assets/image/t_actionbar_music_normal.png");
        &.active {
          background-image: url("../../assets/image/t_actionbar_music_selected.png");
        }
      }
      &.discover {
        background-image: url("../../assets/image/t_actionbar_discover_normal.png");
        &.active {
          background-image: url("../../assets/image/t_actionbar_discover_selected.png");
        }
      }
      &.video {
        background-image: url("../../assets/image/t_actionbar_video_normal.png");
        &.active {
          background-image: url("../../assets/image/t_actionbar_video_selected.png");
        }
      }
      &.friends {
        background-image: url("../../assets/image/t_actionbar_friends_normal.png");
        &.active {
          background-image: url("../../assets/image/t_actionbar_friends_selected.png");
        }
      }
    }
  }
  .netHeaderRight {
    position: absolute;
    top: $fontSize30 + 1;
    right: $fontSize26;
    width: $fontSize48;
    height: $fontSize48;
    background-image: url("../../assets/image/pf.png");
    @include bg-full;
  }
}
</style>
