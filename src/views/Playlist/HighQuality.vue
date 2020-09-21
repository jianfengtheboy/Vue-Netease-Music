<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-03 17:33:33
 * @LastEditTime: 2020-09-21 00:43:58
 * @Description: 精品歌单
-->
<template>
  <div class="highQualityList">
    <Scroll ref="scroll"
            class="highQualityListContent"
            v-if="highQualityList.length > 0"
            :renderData="highQualityList"
            :pullUpLoad="onPullUp"
            @pullingUp="onPullingUp">
      <div class="highQualityMusic">
        <RowList :items="highQualityList" @toItemDetail="toItemDetail">
          <template slot-scope="highQualityList">
            <div class="row-hd bgTopLinear">
              <span class="playCount">{{ highQualityList.playCount | toWan }}</span>
              <img v-lazy="highQualityList.coverImgUrl">
              <span class="vipIcon"></span>
            </div>
            <div class="row-desc">
              <p class="row-name">{{ highQualityList.name | formatName }}</p>
              <p class="row-nickname" @click.stop="toUserdetail(highQualityList.creator.userId)">
                by&nbsp;{{ highQualityList.creator.nickname | formatName }}
                <i class="vip"></i>
              </p>
              <p class="row-txt">
                <span class="row-tag">{{ highQualityList.tag }}</span>
                {{ highQualityList.copywriter }}
              </p>
            </div>
          </template>
        </RowList>
        <Loading class="loadMore" v-if="isLoading" :desc="desc"></Loading>
        <p class="noMoreTip" v-if="noMore">厉害，你刷到了底线</p>
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
import RowList from '@/components/RowList/RowList.vue'

const TOTAL_NUM = 100

@Component({
  components: {
    Scroll,
    Loading,
    RowList
  }
})
export default class HighQuality extends Vue {
  private desc!: string
  private onPullUp!: boolean
  private limit!: number
  private total!: number
  private page!: number
  private isLoading!: boolean
  private noMore!: boolean
  private highQualityList: Array<object>

  constructor() {
    super()
    this.desc = ''
    this.onPullUp = true
    this.limit = 9
    this.total = 0
    this.page = 1
    this.isLoading = true
    this.noMore = false
    this.highQualityList = []
  }

  public $refs!: {
    scroll: HTMLDivElement;
  }

  private created() {
    this.initData()
  }
  
  private async onPullingUp(this: any) {
    if (this.highQualityList.length >= this.total) {
      this.isLoading = false
      this.noMore = true
      return
    }
    this.page ++
    setTimeout(async() => {
      const param = this.limit * this.page
      const res = await this.$api.playListApi.getHighQuality(param)
      if (res && res.code === 200) {
        this.highQualityList = res.playlists.concat()
      }
    }, 1000)
  }

  private async initData(this: any) {
    const param = this.limit
    const res = await this.$api.playListApi.getHighQuality(param)
    if (res && res.code === 200) {
      this.highQualityList = res.playlists.concat()
      this.total = res.total > TOTAL_NUM ? TOTAL_NUM : res.total
    } else {
      this.$refs.scroll.forceUpdate()
    }
  }

  private toItemDetail(val: object) {
    this.$router.push(`/playlist/${(val as any).id}`)
  }

  private toUserdetail(val: string | number) {
    this.$router.push(`/user?id=${val}`)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/mixin.scss";

.highQualityList {
  position: absolute;
  top: $fontSize40 * 2 + $fontSize28;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .highQualityListContent {
    height: 100%;
    overflow: hidden;
    .highQualityMusic {
      padding-top: $fontSize30 / 2;
    }
    .vipIcon {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      display: block;
      width: $fontSize30 * 2;
      height: $fontSize30 * 2;
      @include bg-url("../../assets/image/vip.png");
      @include bg-full($p:left,$s:$fontSize30 * 2);
    }
    .vip {
      display: inline-block;
      width: $fontSize22;
      height: $fontSize22;
      line-height: $fontSize28;
      vertical-align: bottom;
      @include bg-url("../../assets/image/star.png");
      @include bg-full($p:left bottom,$s:$fontSize22 - 2);
    }
  }
  .loadingContainer {
    padding: $fontSize50 * 5 0;
  }
  .noMoreTip {
    height: $fontSize50 * 2.2;
    line-height: $fontSize50 * 2.2;
    font-size: $fontSize24;
    color: $themeColor;
    text-align: center;
  }
}
</style>
