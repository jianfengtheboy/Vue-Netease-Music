<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 23:07:17
 * @LastEditTime: 2020-08-04 16:33:34
--> 
<template>
  <div class="discover" ref="discover">
    <Scroll ref="scroll" class="discoverContent" v-if="isRenderFinish">
      <div class="decorate" v-if="pageDatas.bannerList.length"></div>
      <div class="banner">
        <div v-if="pageDatas.bannerList.length" class="sliderWrapper">
          <Slider>
            <div v-for="item in pageDatas.bannerList" :key="item.index">
              <a :href="item.url">
                <img class="pic" :src="item.imageUrl">
              </a>
            </div>
          </Slider>
        </div>
      </div>
      <NetMenu></NetMenu>
      <div class="songListBox">
        <!-- 推荐歌单 -->
        <div class="personalizedList">
          <div class="listTitle">
            <span @click="toList('playlist')">推荐歌单</span>
          </div>
          <SongList :items="pageDatas.personalizedList">
            <template slot-scope="personalizedList">
              <div class="song-img bgTopLinear">
                <span class="playCount">{{ personalizedList.playCount | toWan }}</span>
                <img v-lazy="personalizedList.picUrl">
              </div>
              <p class="song-title">{{ personalizedList.name | formatName }}</p>
            </template>
          </SongList>
        </div>
        <!-- 独家放送 -->
        <div class="privateContent">
          <div class="listTitle">
            <span @click="toList('privateContent')">独家放送</span>
          </div>
          <SongList :items="pageDatas.privateContent">
            <template slot-scope="privateContent">
              <div class="song-img bgTopLinear">
                <span class="playCount" v-if="privateContent.playCount || privateContent.playTime">
                  {{ privateContent.playCount | toWan }}
                </span>
                <svg-icon iconClass="play-circle" class="icon playCircle" />
                <img v-lazy="privateContent.sPicUrl || privateContent.picUrl">
              </div>
              <p class="song-title">{{ privateContent.name }}</p>
            </template>
          </SongList>
        </div>
        <!-- 最新音乐 -->
        <div class="newSongsList">
          <div class="listTitle">
            <span @click="toList('newSong')">最新音乐</span>
          </div>
          <SongList :items="pageDatas.newSongsList">
            <template slot-scope="newSongsList">
              <div class="song-img">
                <img v-lazy="newSongsList.song.album.picUrl">
              </div>
              <p class="album-name">{{ newSongsList.song.album.name | formatName }}</p>
              <p class="artist-name">
                <span v-for="(item, index) in newSongsList.song.artists" :key="index">
                  {{ item.name | formatName }}
                  <i v-if="index < newSongsList.song.artists.length - 1">、</i>
                </span>
              </p>
            </template>
          </SongList>
        </div>
        <!-- 推荐mv -->
        <div class="mvlist">
          <div class="listTitle">
            <span @click="toList('mv')">推荐mv</span>
          </div>
          <SongList :items="pageDatas.mvlist">
            <template slot-scope="mvlist">
              <div class="song-img bgTopLinear">
                <span class="playCount" v-if="mvlist.playCount || mvlist.playTime">
                  {{ mvlist.playCount | toWan }}
                </span>
                <svg-icon iconClass="play-circle" class="icon playCircle" />
                <img v-lazy="mvlist.sPicUrl || mvlist.picUrl">
              </div>
              <p class="song-title">{{ mvlist.name }}</p>
              <p class="artist-name" v-if="mvlist.artistName">{{ mvlist.artistName }}</p>
            </template>
          </SongList>
        </div>
        <!-- 主播电台 -->
        <div class="djProgramList">
          <div class="listTitle">
            <span @click="toList('dj')">主播电台</span>
          </div>
          <SongList :items="pageDatas.djProgramList">
            <template slot-scope="djProgramList">
              <div class="song-img bgBottomLinear">
                <span class="djProgram-name">{{ djProgramList.name | formatName }}</span>
                <img v-lazy="djProgramList.picUrl">
              </div>
              <p class="song-title">{{ djProgramList.copywriter }}</p>
              <p class="artist-name" v-if="djProgramList.category">{{ djProgramList.category }}</p>
            </template>
          </SongList>
        </div>
      </div>
    </Scroll>
    <div class="loadingContainer" v-else>
      <Loading desc="正在为您生成个性化设置..." />
    </div>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'
import Scroll from '@/components/Scroll/Scroll.vue'
import Loading from '@/components/Loading/Loading.vue'
import Slider from '@/components/Slider/Slider.vue'
import NetMenu from '@/components/NetMenu/NetMenu.vue'
import SongList from '@/components/SongList/SongList.vue'

@Component({
  components: {
    Scroll,
    Loading,
    Slider,
    NetMenu,
    SongList
  }
})
export default class Discover extends Vue {
  private isRenderFinish!: boolean
  private pageDatas!: object

  constructor() {
    super()
    this.isRenderFinish = false
    this.pageDatas = {
      bannerList: [],
      personalizedList: [],
      privateContent: [],
      newSongsList: [],
      mvlist: [],
      djProgramList: []
    }
  }

  private created() {
    this.initData()
  }

  private async initData(this: any) {
    this.isRenderFinish = false
    Promise.all([
      this.$api.discoverApi.getBanner(),
      this.$api.discoverApi.getPersonalized(),
      this.$api.discoverApi.getPrivateContent(),
      this.$api.discoverApi.getNewSong(),
      this.$api.discoverApi.getPersonalizedMV(),
      this.$api.discoverApi.getDjHot()
    ]).then(
      ([
        { banners: bannerList },
        { result: personalizedList },
        { result: privateContent },
        { result: newSongsList },
        { result: mvlist },
        { djRadios: djProgramList }
      ]) => {
        this.pageDatas = {
          bannerList,
          personalizedList,
          privateContent,
          newSongsList,
          mvlist,
          djProgramList
        }
        this.isRenderFinish = true
      }
    )
  }

  public toList(item: string) {
    this.$router.push(`/${item}`)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.discover {
  position: absolute;
  top: $fontSize50 * 2;
  width:100%;
  bottom: 0;
  overflow: hidden;
  .discoverContent {
    height: 100%;
    overflow: hidden;
    .decorate {
      position: absolute;
      top: -30vh;
      z-index: -10;
      background-color: $themeColor;
      width: 100%;
      height: 50vh;
      vertical-align: inherit;
    }
    .banner {
      position: relative;
      height: $fontSize30 * 9 + 1;
      padding-top: $fontSize22 / 2;
      background-color: $themeWhite;
      &:before {
        content : '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: $fontSize38;
        left: 0;
        background-color: $themeColor;
      }
    }
    .songListBox {
      background-color: $themeWhite;
      .privateContent,
      .newSongsList,
      .mvlist,
      .djProgramList {
        border-top: $fontSize22 / 22 solid rgba(219,220,222,.50196);
      }
      .listTitle {
        height: $fontSize46 * 2 - 2;
        padding-left: $fontSize36 / 2;
        line-height: $fontSize46 * 2 - 2;
        font-size: $fontSize30 - 1;
        span {
          padding-right: $fontSize26;
          @include bg-url("../../assets/image/aa7.png");
          @include bg-full($s:$fontSize32 / 2, $p:right center);
        }
      }
      .playCircle {
        position: absolute;
        top: $fontSize40 / 4;
        left: $fontSize32 / 2;
        color: $themeWhite;
        width: $fontSize38;
        height: $fontSize38;
        z-index: 1;
      }
      .album-name {
        margin: $fontSize24 / 3 $fontSize30 / 6 0;
        line-height: $lineHeight;
        color: $theme333;
        font-size: $fontSize22;
        word-wrap: break-word;
        word-break: break-all;
        @include no-wrap-line(1);
      }
      .artist-name {
        margin: 0 $fontSize30 / 6 $fontSize24 / 3;
        line-height: $lineHeight;
        color: $theme777;
        font-size: $fontSize22 - 2;
        word-wrap: break-word;
        word-break: break-all;
        @include no-wrap-line(1);
      }
      .djProgram-name {
        position: absolute;
        bottom: $fontSize22 / 3;
        left: 0;
        z-index: 5;
        padding: 0 $fontSize22 - 2;
        height: $fontSize34;
        line-height: $fontSize34;
        font-size: $fontSize22 - 2;
        color: $themeMainColor;
        @include no-wrap-line(1);
      }
    }
  }
  .loadingContainer {
    padding: $fontSize50 * 5 0;
  }
}
</style>
