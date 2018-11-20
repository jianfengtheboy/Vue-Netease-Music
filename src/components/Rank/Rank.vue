<template>
    <transition name="slide">
        <div class="rank">
            <NetNav :title="navTitle"></NetNav>
            <div class="rank-wrapper">
                <Scroll ref="scroll" class="rankContent" v-if="rankList.length">
                    <div>
                        <!-- 云音乐官方榜 -->
                        <div class="officialList">
                            <h1 class="rank-title">云音乐官方榜</h1>
                            <RowList :items="officialList">
                                <template slot-scope="officialList">
                                    
                                </template>
                            </RowList>
                        </div>
                        <!-- 全球榜 -->
                        <div class="globalList">
                            <h1 class="rank-title">全球榜</h1>
                            <SongList :items="globalList">
                                <template slot-scope="globalList">
                                    <div class="song-img bgBottomLinear">
                                        <span class="update-desc"></span>
                                        <img width="100%" height="100%" v-lazy="">
                                    </div>
                                </template>
                            </SongList>
                        </div>
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
            artistList : []
        }
    },
    created () {
        this._getTopListDetail()
    },
    methods : {
        _getTopListDetail() {
            getTopListDetail().then(res => {
                if (res.data.code === ERR_OK) {
                    this.rankList = res.data.list
                    let officialList = [], globalList = [], artistList = res.data.artistToplist
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
                            console.log(officialList)
                        } else {
                            globalList.push({
                                id : item.id,
                                name : item.name,
                                coverImgUrl : item.coverImgUrl,
                                description : item.description,
                                updateFrequency : item.updateFrequency
                            })
                            console.log(globalList)
                        }
                    })
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
        .rank-title {
            position: relative;
            width: 100%;
            height: $fontSize50 * 2;
            line-height: $fontSize50 * 2;
            font-size: $fontSize28;
            text-indent: $fontSize22;
        }
        .loadingContainer {
            padding: $fontSize50 * 5 0;
        }
    }
}
</style>