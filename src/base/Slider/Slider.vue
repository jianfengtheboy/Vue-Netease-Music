<template>
    <div class="sliderWrapper" ref="sliderWrapper">
        <div class="sliderGroup" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :key="item.index" :class="{ active : currentPageIndex === index}"></span>
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
    methods : {
        _setSliderWidth (isResize) {

        },
        _initSlider () {

        },
        _initDots () {

        },
        _play () {

        }
    }
}
</script>

<style scoped lang="scss" type="text/css">

.sliderWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .sliderGroup {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        height: 100%;
        .sliderItem {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            padding: 0 18px;
            height: 100%;
            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
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
        transform: translateZ(1px);
        text-align: center;
        font-size: 0;
        .dot {
            display: inline-block;
            margin:0 10px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $themeWhite;
            &.active {
                background-color: $themeColor;
            }
        }
    }
}
</style>