<template>
    <div class="slider" ref="slider">
        <div class="sliderGroup" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{ active : currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmacript-6">
import { addClass } from '@/common/js/dom'
import BScroll from 'better-scroll'

export default {
    name : 'slider',
    props : {
        loop : {
            type : Boolean,
            default : true
        },
        autoPlay : {
            type : Boolean,
            default : true
        },
        interval : {
            type : Number,
            default : 4000
        }
    },
    data () {
        return {
            dots : [],
            currentPageIndex : 0
        }
    },
    mounted () {
        setTimeout(() => {
            this._setSliderWidth()
            this._initSlider()
            this._initDots()
            if (this.autoPlay) {
                this._play()
            }
        }, 20)

        window.addEventListener('resize', () => {
            if (!this.slider) return
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    activated () {
        if (this.autoPlay) {
            this._play()
        }
    },
    deactivated () {
        clearTimeout(this.timer)
    },
    beforeDestroy () {
        clearTimeout(this.timer)
    },
    methods : {
        _setSliderWidth (isResize) {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i ++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider () {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX : true,
                scrollY : false,
                momentum : false,
                snap : true,
                snapLoop : this.loop,
                snapThreshold : 0.3,
                snapSpeed : 400
            })
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) {
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                    this._play()
                }
            })
            this.slider.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                }
            })
        },
        _initDots () {
            this.dots = new Array(this.children.length - 2)
        },
        _play () {
            let pageIndex = this.currentPageIndex + 1
            if (this.loop) {
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    },
    destroyed () {
        clearTimeout(this.timer)
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.slider {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .sliderGroup {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        height: 100%;
        .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            padding: 0 9.25px;
            height: 100%;
            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
                @include borderRadius(14px);
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 25px;
        @include transform(translateZ(1px));
        text-align: center;
        font-size: 0;
        .dot {
            display: inline-block;
            margin:0 7px;
            width: 13px;
            height: 13px;
            @include borderRadius(50%);
            background-color: $themeWhite;
            &.active {
                background-color: $themeColor;
            }
        }
    }
}
</style>