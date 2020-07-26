<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 23:07:17
 * @LastEditTime: 2020-07-27 01:05:14
--> 
<template>
  <div class="discover" ref="discover">
    <Scroll
      ref="scroll"
      class="discoverContent"
    >
      <div class="decorate" v-if="bannerList.length"></div>
      <div class="banner">
        <div v-if="bannerList.length" class="sliderWrapper">
          <Slider>
            <div v-for="item in bannerList" :key="item.index">
              <a :href="item.url">
                <img class="pic" :src="item.imageUrl">
              </a>
            </div>
          </Slider>
        </div>
      </div>
      <NetMenu></NetMenu>

    </Scroll>
    <div class="loadingContainer">
      <Loading></Loading>
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
  private limit?: number
  private bannerList!: Array<object>

  constructor() {
    super()
    this.limit = 24
    this.bannerList = []
  }

  private created() {
    this.getBannerList()
  }

  //获取轮播图
  public async getBannerList(this: any) {
    const res = await this.$api.discoverApi.getBanner()
    this.bannerList = res.banners
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
