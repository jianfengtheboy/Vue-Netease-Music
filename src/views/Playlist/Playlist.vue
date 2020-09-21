<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-03 17:32:05
 * @LastEditTime: 2020-09-21 00:43:06
 * @Description: 歌单
-->
<template>
  <div class="playList">
    <Scroll
      ref="scroll" 
      class="musicListContent" 
      v-if="topPlayList.length > 0"
      :renderData="topPlayList"
      :pullUpLoad="onPullUp"
      @pullingUp="onPullingUp">
      <!-- 精品歌单推荐 -->
      <router-link tag="div" to="/playlist-highquality" class="highQualityMusic">
        <div class="contentWrapper">
          <div class="picBox">
            <img v-lazy="highQualityList.coverImgUrl">
          </div>
          <div class="descBox">
            <span class="desc-title">精品歌单</span>
            <p class="desc-name">{{ highQualityList.name }}</p>
            <p class="desc-copywriter">{{ highQualityList.copywriter }}</p>
          </div>
        </div>
        <div class="bg">
          <img :src="highQualityList.coverImgUrl">
        </div>
      </router-link>
      <!-- 歌单列表 -->
      <div class="topPlayListMusic">
        <SongList :items="topPlayList" @toItemDetail="toItemDetail">
          <template slot-scope="topPlayList">
            <div class="song-img bgTopLinear bgBottomLinear">
              <span class="playCount">{{ topPlayList.playCount | toWan }}</span>
              <img v-lazy="topPlayList.coverImgUrl">
              <span class="nickname">{{ topPlayList.creator.nickname }}</span>
            </div>
            <p class="song-title">{{ topPlayList.name | formatName }}</p>
          </template>
        </SongList>
        <Loading class="loadMore" v-if="onPullUp" :desc="desc"></Loading>
      </div>
    </Scroll>
    <div class="loadingContainer" v-else>
      <Loading></Loading>
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'
import Scroll from '@/components/Scroll/Scroll.vue'
import Loading from '@/components/Loading/Loading.vue'
import SongList from '@/components/SongList/SongList.vue'

@Component({
  components: {
    Scroll,
    Loading,
    SongList
  }
})
export default class Playlist extends Vue {
  private desc!: string
  private onPullUp!: boolean
  private page!: number
  private highQualityList!: Array<object>
  private topPlayList!: Array<object>

  constructor() {
    super()
    this.desc = ''
    this.topPlayList = []
    this.onPullUp = true
    this.page = 0
    this.highQualityList = []
    this.topPlayList = []
  }

  public $refs!: {
    scroll: HTMLDivElement;
  }

  private created() {
    this.getHighQuality()
    this.getTopPlayList()
  }

  // 上拉加载
  public async onPullingUp() {
    setTimeout(async() =>{
      await this.getTopPlayList()
    }, 1000)
  }

  public async getHighQuality(this: any) {
    const res = await this.$api.playListApi.getHighQuality()
    this.highQualityList = res.playlists[0]
  }

  public async getTopPlayList(this: any) {
    const res = await this.$api.playListApi.getTopPlayList(this.page)
    if (res.more && res.code === 200) {
      this.topPlayList = this.topPlayList.concat(res.playlists)
      this.page ++
    } else {
      this.$refs.scroll.forceUpdate()
    }
  }

  private toItemDetail(val: object) {
    this.$router.push(`/playlist/${(val as any).id}`)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.playList {
  position: absolute;
  top: $fontSize40 * 2 + $fontSize28;
  width:100%;
  bottom: 0;
  overflow: hidden;
  .musicListContent {
    height: 100%;
    overflow: hidden;
  }
  .highQualityMusic {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: $fontSize50 * 5.6;
    .contentWrapper {
      position: relative;
      padding: $fontSize34 + 1 $fontSize24 + 1 $fontSize24 + 1;
      display: flex;
      .picBox {
        flex: 1;
        img {
          width: $fontSize50 * 4.3;
          height: $fontSize50 * 4.3;
          box-shadow: 0 0 $fontSize22 - 2 $themeBlackOpacity20;
          @include borderRadius($fontSize30 / 5);
        }
      }
      .descBox {
        flex: 2;
        padding: $fontSize28 $fontSize24 / 2 0;
        .desc-title {
          position: relative;
          display: inline-block;
          margin-bottom: $fontSize22;
          font-size: $fontSize30;
          color: $themeWhite;
          padding-right: $fontSize26;
          padding-left: $fontSize44;
          @include bg-url("../../assets/image/arrow-right.png");
          @include bg-full($s:$fontSize28 / 2, $p:right center);
          &:before {
            content : '';
            position: absolute;
            top: 0;
            left: 0;
            width: $fontSize34 + 1;
            height: $fontSize34;
            @include bg-url("../../assets/image/highQuality.png");
            @include bg-full($s:$fontSize34, $p:center center);
          }
        }
        .desc-name {
          margin-bottom: $fontSize30 / 3;
          line-height: $lineHeight;
          font-size: $fontSize28;
          color: $themeWhite;
          word-wrap: break-word;
          word-break: break-all;
          @include no-wrap-line(1);
        }
        .desc-copywriter {
          font-size: $fontSize22;
          color: $themeWhiteOpacity60;
          line-height: $lineHeight - 0.1;
          word-wrap: break-word;
          word-break: break-all;
          @include no-wrap-line(2);
        }
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur($fontSize50);
      img {
        @include img-full;
      }
    }
  }
  .topPlayListMusic {
    margin-top: $fontSize22;
    .nickname {
      display: block;
      position: absolute;
      bottom: $fontSize22 / 3;
      left: $fontSize30 / 3;
      z-index: 5;
      height: $fontSize34;
      line-height: $fontSize34;
      padding: 0 $fontSize22 - 2 0 $fontSize28;
      font-size: $fontSize22 - 2;
      color: $themeMainColor;
      @include no-wrap-line(1);
      @include bg-url("../../assets/image/user.png");
      @include bg-full($s:$fontSize22 - 2, $p:left center);
    }
  }
  .loadingContainer {
    padding: $fontSize50 * 5 0;
  }
}
</style>
