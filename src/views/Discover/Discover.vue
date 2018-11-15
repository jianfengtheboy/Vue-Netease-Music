<template>
    <transition name="slide">
        <div class="discover" ref="discover">
            <Scroll ref="scroll" class="discoverContent" v-if="personalizedList.length && bannerList.length && highQualityList.length">
                <div>
                    <div class="banner">
                        <div v-if="bannerList.length" class="sliderWrapper">
                            <Slider>
                                <div v-for="item in bannerList" :key="item.index">
                                    <a :href="item.url">
                                        <img class="pic" @load="loadImage" :src="item.imageUrl" alt="">
                                    </a>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <NetMenu></NetMenu>
                    <div class="songListBox">
                        <div class="personalizedList">
                            <div class="listTitle">
                                <span>推荐歌单</span>
                            </div>
                            <SongList :items="personalizedList">
                                <template slot-scope="personalizedList">
                                    <div class="song-img">
                                        <span class="playCount">{{ formatPlayCount(personalizedList.playCount) }}</span>
                                        <img width="100%" height="100%" v-lazy="personalizedList.picUrl">
                                    </div>
                                    <p class="song-title">{{ personalizedList.name.replace(/\s/g, ' ') }}</p>
                                </template>
                            </SongList>
                        </div>
                        <div class="highQualityList">
                            <div class="listTitle">
                                <span>精品歌单</span>
                            </div>
                            <SongList :items="highQualityList">
                                <template slot-scope="highQualityList">
                                    <div class="song-img">
                                        <span class="playCount">{{ formatPlayCount(highQualityList.playCount) }}</span>
                                        <img width="100%" height="100%" v-lazy="highQualityList.coverImgUrl">
                                    </div>
                                    <p class="song-title">{{ highQualityList.name.replace(/\s/g, ' ') }}</p>
                                </template>
                            </SongList>
                        </div>
                    </div>
                </div>
            </Scroll>
            <div class="loadingContainer" v-show="!personalizedList.length && !bannerList.length && !highQualityList.length">
                <Loading></Loading>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmacript-6">
import Scroll from '@/base/Scroll/Scroll'
import Loading from '@/base/Loading/Loading'
import Slider from '@/base/Slider/Slider'
import NetMenu from '@/components/NetMenu/NetMenu'
import SongList from '@/base/SongList/SongList'
import { getBanner, getPersonalized, getPlayListHighQuality } from '../../../src/api/index'
import { ERR_OK } from '@/common/js/config'

export default {
    name : 'discover',
    data () {
        return {
            bannerList : [],
            personalizedList : [],
            highQualityList : []
        }
    },
    created () {
        this._getBannerList()
        this._getPersonalized()
        this._getHighQuality()
    },
    methods : {
        _getBannerList () {
            getBanner().then(res => {
                if (res.data.code === ERR_OK) {
                    this.bannerList = res.data.banners
                }
            })
        },
        _getPersonalized () {
            getPersonalized().then(res => {
                if (res.data.code === ERR_OK) {
                    this.personalizedList = res.data.result
                }
            })
        },
        _getHighQuality () {
            getPlayListHighQuality().then(res => {
                if (res.data.code === ERR_OK) {
                    this.highQualityList = res.data.playlists
                }
            })
        },
        loadImage () {
            if (!this.checkedLoad) {
                this.$refs.scroll.refresh()
                this.checkedLoad = true
            }
        },
        formatPlayCount (item) {
            return (item / 10000) > 9 ?
             ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : 
             `${Math.ceil(item / 10000)}万`) : Math.floor(item)
        }
    },
    components : {
        Scroll,
        Loading,
        Slider,
        NetMenu,
        SongList
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.slide-enter-active,.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,.slide-leave-to {
    transform: translate3d(100%,0,0);
}

.discover {
    position: absolute;
    top: $fontSize50 * 2;
    width:100%;
    bottom: 0;
    overflow: hidden;
    .discoverContent {
        height: 100%;
        overflow: hidden;
        &:before {
            content: '';
            width: 100%;
            height: $fontSize24 * 10 + 5;
            position: absolute;
            top: 0;
            left: 0;
            background-color:$themeColor; 
        }
        .banner {
            position: relative;
            height: $fontSize30 * 9 + 1;
            padding-top: $fontSize24 / 2;
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
                    @include bg-url("./aa7.png");
                    @include bg-full($s:$fontSize32 / 2, $p:right center);
                }
            }
        }
    }
    .loadingContainer {
        padding: $fontSize50 * 5 0;
    }
}
</style>