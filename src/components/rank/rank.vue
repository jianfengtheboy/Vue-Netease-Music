<template>
    <transition name="slide">
        <div class="rank">
            <NetNav :title="navTitle"></NetNav>
            <div class="rank-wrapper">
                <Scroll ref="scroll" class="rankContent" v-if="rankList.length">
                    <!-- 云音乐官方榜 -->
                    <div class="officialList">
                        <h1 class="rank-title">云音乐官方榜</h1>
                        <RowList :items="officialList">
                            <template slot-scope="officialList">
                                <div class="row-hd bgBottomLinear">
                                    <span class="update-desc">{{ officialList.updateFrequency }}</span>
                                    <img v-lazy="officialList.coverImgUrl">
                                </div>
                                <div class="row-bd">
                                    <p v-for="(item, index) in officialList.tracks" :key="index">
                                        {{ `${index + 1}.&nbsp;${item.first}&nbsp;-&nbsp;${item.second}` }}
                                    </p>
                                </div>
                            </template>
                        </RowList>
                        <div class="row-list extraList">
                            <div class="row-item">
                                <div class="row-hd bgBottomLinear">
                                    <span class="update-desc">{{ rewardList.name }}</span>
                                    <img v-lazy="rewardList.coverUrl">
                                </div>
                                <div class="row-bd">
                                    <p v-for="(item, index) in rewardList.songs" :key="index">
                                        {{ `${index + 1}.&nbsp;${item.name}&nbsp;-&nbsp;${item.artists[0].name}` }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row-list extraList">
                            <div class="row-item">
                                <div class="row-hd bgBottomLinear">
                                    <span class="update-desc">{{ artistList.updateFrequency }}</span>
                                    <img v-lazy="artistList.coverUrl">
                                </div>
                                <div class="row-bd">
                                    <p v-for="(item, index) in artistList.artists" :key="index">
                                        {{ `${index + 1}.&nbsp;${item.first}&nbsp;-&nbsp;${item.third}` }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 全球榜 -->
                    <div class="globalList">
                        <h1 class="rank-title">全球榜</h1>
                        <SongList :items="globalList">
                            <template slot-scope="globalList">
                                <div class="song-img bgBottomLinear">
                                    <span class="update-desc">{{ globalList.updateFrequency }}</span>
                                    <img width="100%" height="100%" v-lazy="globalList.coverImgUrl">
                                </div>
                                <p class="song-title">{{ globalList.name }}</p>
                            </template>
                        </SongList>
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
import SongList from '@/base/song-list/song-list'
import { getTopListDetail } from '@/api/index.js'
import { ERR_OK } from '@/common/js/config.js'

export default {
    name : 'rank',
    data () {
        return {
            navTitle : '排行榜',
            rankList : [],
            officialList : [], 
            globalList : [], 
            artistList : [],
            rewardList : []
        }
    },
    created () {
        this._getTopListDetail()
    },
    methods : {
        //获取排行榜列表
        _getTopListDetail() {
            getTopListDetail().then(res => {
                if (res.data.code === ERR_OK) {
                    this.rankList = res.data.list
                    let officialList = [], 
                        globalList = [], 
                        artistList = res.data.artistToplist, 
                        rewardList = res.data.rewardToplist
                    this.rankList.forEach((item) => {
                        if(item.ToplistType) {
                            officialList.push({
                                id : item.id,
                                name : item.name,
                                coverImgUrl : item.coverImgUrl,
                                description : item.description,
                                updateFrequency : item.updateFrequency,
                                tracks : item.tracks,
                                ToplistType : item.ToplistType
                            })
                        } else {
                            globalList.push({
                                id : item.id,
                                name : item.name,
                                coverImgUrl : item.coverImgUrl,
                                description : item.description,
                                updateFrequency : item.updateFrequency
                            })
                        }
                    })
                    this.officialList = officialList
                    this.globalList = globalList
                    this.artistList = artistList
                    this.rewardList = rewardList
                }
            })
        }
    },
    components : {
        NetNav,
        Scroll,
        Loading,
        RowList,
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

.rank {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $themeWhite;
    z-index: 19;
    .rank-wrapper {
        position: absolute;
        top: $fontSize50 * 2 + 9;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .rankContent {
            height: 100%;
            overflow: hidden;
        }
        .update-desc {
            position: absolute;
            bottom: $fontSize22 / 3;
            left: 0;
            z-index: 2;
            padding: 0 $fontSize22 - 2;
            height: $fontSize34;
            line-height: $fontSize34;
            font-size: $fontSize22 - 2;
            color: $themeMainColor;
            @include no-wrap-line(1);
        }
        .rank-title {
            position: relative;
            width: 100%;
            height: $fontSize50 * 2;
            line-height: $fontSize50 * 2;
            font-size: $fontSize28 + 1;
            text-indent: $fontSize22;
        }
        .extraList {
            overflow: hidden;
            padding-left: $fontSize30 / 2;
            .row-item {
                display: flex;
                margin-bottom: $fontSize28 / 2;
                width: 100%;
                .row-hd {
                    position: relative;
                    width: $fontSize30 * 8 + 7;
                    height: $fontSize30 * 8 + 7;
                    overflow: hidden;
                    @include borderRadius($fontSize30 / 5);
                    &.bgBottomLinear:after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 1;
                        height: $fontSize50 + $fontSize24 / 4;
                        background: linear-gradient(to top,$themeBlackOpacity20 0,$themeBlackOpacity10 80%,rgba(0,0,0,0) 100%);
                    }
                    img {
                        @include img-full;
                    }
                }
                .row-bd {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    flex: 1;
                    min-width: 0;
                    box-sizing: border-box;
                    padding: 0 $fontSize22;
                    border-bottom: 1px solid $themeBlackOpacity5;
                    p {
                        height: $fontSize40;
                        line-height: $fontSize40;
                        font-size: $fontSize24;
                        color: $theme666;
                        word-break: keep-all;
                        @include no-wrap-line(1);
                    }
                }
            }
        }
        .loadingContainer {
            padding: $fontSize50 * 5 0;
        }
    }
}
</style>