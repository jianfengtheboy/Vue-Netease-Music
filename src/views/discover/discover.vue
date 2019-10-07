<template>
    <transition name="slide">
        <div class="discover" ref="discover">
            <Scroll ref="scroll" class="discoverContent" v-if="personalizedList.length && highQualityList.length && newSongsList.length && djProgramList.length">
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
                <div class="songListBox">
                    <!-- 推荐歌单 -->
                    <div class="personalizedList">
                        <div class="listTitle">
                            <span @click="toList">推荐歌单</span>
                        </div>
                        <SongList :items="personalizedList">
                            <template slot-scope="personalizedList">
                                <div class="song-img bgTopLinear">
                                    <span class="playCount">{{ formatPlayCount(personalizedList.playCount) }}</span>
                                    <img width="100%" height="100%" v-lazy="personalizedList.picUrl">
                                </div>
                                <p class="song-title">{{ formatName(personalizedList.name) }}</p>
                            </template>
                        </SongList>
                    </div>
                    <!-- 精品歌单 -->
                    <div class="highQualityList">
                        <div class="listTitle">
                            <span @click="toDetail">精品歌单</span>
                        </div>
                        <SongList :items="highQualityList">
                            <template slot-scope="highQualityList">
                                <div class="song-img bgTopLinear">
                                    <span class="playCount">{{ formatPlayCount(highQualityList.playCount) }}</span>
                                    <img width="100%" height="100%" v-lazy="highQualityList.coverImgUrl">
                                </div>
                                <p class="song-title">{{ formatName(highQualityList.name) }}</p>
                            </template>
                        </SongList>
                    </div>
                    <!-- 最新音乐 -->
                    <div class="newSongsList">
                        <div class="listTitle">
                            <span>最新音乐</span>
                        </div>
                        <SongList :items="newSongsList">
                            <template slot-scope="newSongsList">
                                <div class="song-img">
                                    <img width="100%" height="100%" v-lazy="newSongsList.song.album.picUrl">
                                </div>
                                <p class="album-name">{{ formatName(newSongsList.song.album.name) }}</p>
                                <p class="artist-name">{{ formatName(newSongsList.song.artists[0].name) }}</p>
                            </template>
                        </SongList>
                    </div>
                    <!-- 推荐电台 -->
                    <div class="djProgramList">
                        <div class="listTitle">
                            <span>推荐电台</span>
                        </div>
                        <SongList :items="djProgramList">
                            <template slot-scope="djProgramList">
                                <div class="song-img bgBottomLinear">
                                    <span class="djProgram-name">{{ formatName(djProgramList.program.radio.name) }}</span>
                                    <img width="100%" height="100%" v-lazy="djProgramList.program.radio.picUrl">
                                </div>
                                <p class="song-title">{{ formatName(djProgramList.program.radio.desc) }}</p>
                            </template>
                        </SongList>
                    </div>
                </div>
            </Scroll>
            <div class="loadingContainer" v-else>
                <Loading></Loading>
            </div>
        </div>
    </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import Slider from '@/components/slider/slider'
import NetMenu from '@/components/net-menu/net-menu'
import SongList from '@/base/song-list/song-list'
import { 
    getBanner, 
    getPersonalized, 
    getPlayListHighQuality, 
    getPersonalizedNewSong, 
    getPersonalizedDjProgram 
} from '@/api/index'
import { ERR_OK } from '@/common/js/config'
import { formatMixin } from '@/common/js/mixin.js'

export default {
    name : 'discover',
    mixins: [formatMixin],
    data () {
        return {
            limit : 24,
            bannerList : [],
            personalizedList : [],
            highQualityList : [],
            newSongsList : [],
            djProgramList : []
        }
    },
    created () {
        this._getBannerList()
        this._getPersonalized()
        this._getHighQuality()
        this._getPersonalizedNewSong()
        this._getPersonalizedDjProgram()
    },
    methods : {
        //获取轮播图
        _getBannerList () {
            getBanner().then(res => {
                if (res.data.code === ERR_OK) {
                    this.bannerList = res.data.banners
                }
            })
        },
        //获取推荐歌单
        _getPersonalized () {
            getPersonalized().then(res => {
                if (res.data.code === ERR_OK) {
                    this.personalizedList = res.data.result
                }
            })
        },
        //获取精品歌单
        _getHighQuality () {
            let param = this.limit
            getPlayListHighQuality(param).then(res => {
                if (res.data.code === ERR_OK) {
                    this.highQualityList = res.data.playlists
                }
            })
        },
        //获取最新音乐
        _getPersonalizedNewSong () {
            let param = this.limit
            getPersonalizedNewSong(param).then(res => {
                if (res.data.code === ERR_OK) {
                    this.newSongsList = res.data.result
                }
            })
        },
        //获取推荐电台
        _getPersonalizedDjProgram () {
            getPersonalizedDjProgram().then(res => {
                if (res.data.code === ERR_OK) {
                    this.djProgramList = res.data.result
                }
            })
        },
        //跳转推荐歌单页面
        toList () {
            this.$router.push('/musicList')
        },
        //跳转精品歌单页面
        toDetail () {
            this.$router.push('/highQuality')
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

<style scoped lang="scss">
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
                    @include bg-url("./aa7.png");
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