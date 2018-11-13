<template>
    <transition name="slide">
        <div class="discover" ref="discover">
            <Scroll ref="scroll" class="discoverContent">
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
                </div>
            </Scroll>
        </div>
    </transition>
</template>

<script type="text/ecmacript-6">
import Scroll from '@/base/Scroll/Scroll'
import Loading from '@/base/Loading/Loading'
import Slider from '@/base/Slider/Slider'
import NetMenu from '@/components/NetMenu/NetMenu'
import { getBanner } from '../../../src/api/index'
import { ERR_OK } from '@/common/js/config'

export default {
    name : 'discover',
    data () {
        return {
            bannerList : []
        }
    },
    created () {
        this._getBannerList()
    },
    methods : {
        _getBannerList () {
            getBanner().then(res => {
                if (res.data.code === ERR_OK) {
                    this.bannerList = res.data.banners
                }
            })
        },
        loadImage () {
            if (!this.checkedLoad) {
                this.$refs.scroll.refresh()
                this.checkedLoad = true
            }
        }
    },
    components : {
        Scroll,
        Loading,
        Slider,
        NetMenu
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";

.slide-enter-active,.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,.slide-leave-to {
    transform: translate3d(100%,0,0);
}

.discover {
    height: 100%;
    overflow: hidden;
    .discoverContent {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .banner {
        position: relative;
        height: 271px;
        padding-top: 12px;
        &:before {
            content : '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 40px;
            left: 0;
            background-color: $themeColor;
        }
    }
}
</style>