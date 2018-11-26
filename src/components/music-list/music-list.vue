<template>
    <transition name="slide">
        <div class="musicList">
            <NetNav :title="navTitle"></NetNav>
            <div class="musicList-wrapper">
                <Scroll ref="scroll" 
                        class="musicListContent" 
                        v-if="topPlayList.length"
                        :data = "topPlayList"
                        :pullUpLoad="onPullUp"
                        @pullingUp="onPullingUp">
                    <!-- 精品歌单推荐 -->
                    <div class="highQualityMusic">
                        <div class="contentWrapper">
                            <div class="picBox">
                                <img v-lazy="highQualityList[0].coverImgUrl">
                            </div>
                            <div class="descBox">
                                <span class="desc-title">精品歌单</span>
                                <p class="desc-name">{{ highQualityList[0].name }}</p>
                                <p class="desc-copywriter">{{ highQualityList[0].copywriter }}</p>
                            </div>
                        </div>
                        <div class="bg">
                            <img :src="highQualityList[0].coverImgUrl">
                        </div>
                    </div>
                    <!-- 歌单列表 -->
                    <div class="topPlayListMusic">
                        <SongList :items="topPlayList">
                            <template slot-scope="topPlayList">
                                <div class="song-img bgTopLinear bgBottomLinear">
                                    <span class="playCount">{{ formatPlayCount(topPlayList.playCount) }}</span>
                                    <img width="100%" height="100%" v-lazy="topPlayList.coverImgUrl">
                                    <span class="nickname">{{ topPlayList.creator.nickname }}</span>
                                </div>
                                <p class="song-title">{{ topPlayList.name }}</p>
                            </template>
                        </SongList>
                        <Loading class="loadMore" v-if="hasMore" :desc="desc"></Loading>
                        <p class="tips" v-show="!hasMore">(^_^) 已全部加载</p>
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
import SongList from '@/base/song-list/song-list'
import { getPlayListHighQuality, getTopPlayList } from '@/api/index.js'
import { formatPlayList } from '@/common/js/playlist.js'
import { ERR_OK } from '@/common/js/config.js'

export default {
    name : 'musicList',
    data () {
        return {
            navTitle : '歌单',
            desc : '',
            onPullUp : true,
            hasMore : false,
            page : 0,
            highQualityList : [],
            topPlayList : []
        }
    },
    created () {
        this._getPlayListHighQuality()
        this._getTopPlayList()
    },
    methods : {
        // 上拉加载
        onPullingUp () {
            this.hasMore = true
            this._getTopPlayList()
        },
        _getPlayListHighQuality () {
            getPlayListHighQuality().then(res => {
                if (res.data.code === ERR_OK) {
                    this.highQualityList = res.data.playlists
                }
            })
        },
        _getTopPlayList () {
            getTopPlayList(this.page).then(res => {
                if (res.data.code === ERR_OK) {
                    const topPlayList = this.topPlayList
                    this.page ++
                    this.hasMore = false
                    topPlayList = topPlayList.concat(formatPlayList(res.data.playlists)) 
                }
            })
        },
        formatPlayCount (item) {
            return (item / 10000) > 9 ?
             ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : 
             `${Math.ceil(item / 10000)}万`) : Math.floor(item)
        }
    },
    components : {
        NetNav,
        Scroll,
        Loading,
        SongList
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

.musicList {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $themeWhite;
    z-index: 19;
    .musicList-wrapper {
        position: absolute;
        top: $fontSize50 * 2 + 9;
        bottom: 0;
        width: 100%;
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
                        @include bg-url("./arrow-right.png");
                        @include bg-full($s:$fontSize28 / 2, $p:right center);
                        &:before {
                            content : '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: $fontSize34 + 1;
                            height: $fontSize34;
                            @include bg-url("./highQuality.png");
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
                @include bg-url("./user.png");
                @include bg-full($s:$fontSize22 - 2, $p:left center);
            }
            .tips {
                height: $fontSize50 * 2.4;
                line-height: $fontSize50 * 2.4;
                font-size: $fontSize24;
                color: $themeColor;
                text-align: center;
            }
        }
        .loadingContainer {
            padding: $fontSize50 * 5 0;
        }
    }
}
</style>