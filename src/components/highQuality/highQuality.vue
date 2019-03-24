<template>
<transition name="slide">
    <div class="highQualityList">
        <NetNav :title="navTitle"></NetNav>
        <div class="highQualityList-wrapper">
            <Scroll ref="scroll"
                    class="highQualityListContent"
                    v-if="highQualityList.length"
                    :data="highQualityList"
                    :pullUpLoad="onPullUp"
                    @pullingUp="onPullingUp">
                <div class="highQualityMusic">
                    <RowList :items="highQualityList">
                        <template slot-scope="highQualityList">
                            <div class="row-hd bgTopLinear">
                                <span class="playCount">{{ formatPlayCount(highQualityList.playCount) }}</span>
                                <img width="100%" height="100%" v-lazy="highQualityList.coverImgUrl">
                                <span class="vipIcon"></span>
                            </div>
                            <div class="row-desc">
                                <p class="row-name">{{ formatName(highQualityList.name) }}</p>
                                <p class="row-nickname">
                                    by&nbsp;{{ formatName(highQualityList.creator.nickname) }}
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
    </div>
</transition>
</template>

<script>
import NetNav from '@/base/net-nav/net-nav'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import RowList from '@/base/row-list/row-list'
import { getPlayListHighQuality } from '@/api/index.js'
import { ERR_OK } from '@/common/js/config.js'
import { formatMixin } from '@/common/js/mixin'

const TOTAL_NUM = 100

export default {
    name : 'highQuality',
    mixins: [formatMixin],
    data () {
        return {
            navTitle : '精品歌单',
            desc : '',
            onPullUp : true,
            limit : 9,
            total : 0,
            page : 1,
            isLoading : true,
            noMore : false,
            highQualityList : []
        }
    },
    created () {
        this._getHighQualityList()
    },
    methods : {
        // 上拉加载
        onPullingUp () {
            if (this.highQualityList.length >= this.total) {
                this.isLoading = false
                this.noMore = true
                return
            }
            this.page ++
            setTimeout(() =>{
                getPlayListHighQuality(this.limit * this.page).then(res => {
                    if (res.data.code === ERR_OK) {
                        this.highQualityList = res.data.playlists.concat()
                    }
                })
            }, 1000)
        },
        _getHighQualityList () {
            getPlayListHighQuality(this.limit).then(res => {
                if (res.data.code === ERR_OK) {
                    this.highQualityList = res.data.playlists.concat()
                    this.total = res.data.total > TOTAL_NUM ? TOTAL_NUM : res.data.total
                } else {
                    this.$refs.scroll.forceUpdate()
                }
            })
        }
    },
    components : {
        NetNav,
        Scroll,
        Loading,
        RowList
    }
}
</script>

<style scoped lang="scss">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.slide-enter-active,.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,.slide-leave-to {
    transform: translate3d(100%,0,0);
}

.highQualityList {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $themeWhite;
    z-index: 19;
    .highQualityList-wrapper {
        position: absolute;
        top: $fontSize50 * 2 + 9;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .highQualityListContent {
            height: 100%;
            overflow: hidden;
            .highQualityMusic {
                padding-top: $fontSize30 / 3;
            }
            .vipIcon {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 5;
                display: block;
                width: $fontSize30 * 2;
                height: $fontSize30 * 2;
                @include bg-url("./vip.png");
                @include bg-full($p:left,$s:$fontSize30 * 2);
            }
            .vip {
                display: inline-block;
                width: $fontSize22;
                height: $fontSize22;
                line-height: $fontSize28;
                vertical-align: bottom;
                @include bg-url("./star.png");
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
}
</style>
