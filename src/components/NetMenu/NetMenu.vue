<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 22:44:51
 * @LastEditTime: 2020-07-27 00:35:27
 * @Description: NetMenu
--> 
<template>
  <div class="netmenu">
    <router-link class="menu-item" tag="div" :to="{name: 'personalFM'}">
      <div class="menu-icon fm"></div>
      <p>私人FM</p>
    </router-link>
    <router-link class="menu-item" tag="div" :to="{name: 'recommend'}">
      <div class="menu-icon daily"><span class="date">{{ getTime }}</span></div>
      <p>每日推荐</p>
    </router-link>
    <router-link class="menu-item" tag="div" :to="{name: 'musicList'}">
      <div class="menu-icon musicList"></div>
      <p>歌单</p>
    </router-link>
    <router-link class="menu-item" tag="div" :to="{name: 'rank'}">
      <div class="menu-icon rank"></div>
      <p>排行榜</p>
    </router-link>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NetMenu extends Vue {
  private date!: number

  private get getTime() {
    const today = new Date()
    return this.date = today.getUTCDate()
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.netmenu {
  display: flex;
  justify-content: space-around;
  border-bottom: $fontSize22 / 22 solid rgba(219,220,222,.50196);
  background-color: $themeWhite;
  .menu-item {
    flex: 0 0 25%;
    margin: $fontSize30 0;
    p {
      text-align: center;
      font-size: $fontSize24;
      color: #2e302f;
    }
    .menu-icon {
      position: relative;
      width: 50%;
      height: 0;
      margin: 0 25% 10%;
      padding-top: 50%;
      @include borderRadius(50%);
      box-shadow: 0 $fontSize22 / 11 $fontSize32 / 2 rgba(229,71,60,.6);
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @include bg-full;
      }
      &.fm:before {
        @include bg-url('../../assets/image/icn_fm_prs.png')
      }
      &.daily:before {
        @include bg-url('../../assets/image/icn_daily_prs.png')
      }
      &.daily .date {
        display: block;
        position: absolute;
        top: 58%;
        left: 50%;
        font-size: $fontSize40 / 2;
        color: $themeWhite;
        @include transform(translate(-50%, -50%));
      }
      &.musicList:before {
        @include bg-url('../../assets/image/icn_playlist_prs.png')
      }
      &.rank:before {
        @include bg-url('../../assets/image/icn_rank_prs.png')
      }
    }
  }
}
</style>
