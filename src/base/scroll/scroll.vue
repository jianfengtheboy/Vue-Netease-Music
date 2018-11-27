<template>
    <div ref="wrapper" class="list-wrapper">
        <div ref="listWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name : 'scroll',
    props : {
        data : {
            type : Array,
            default : null
        },
        /**
        * 1 滚动的时候会派发scroll事件，会截流。
        * 2 滚动的时候实时派发scroll事件，不会截流。
        * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        */
        probeType : {
            type : Number,
            default : 1
        },
        click : {
            type : Boolean,
            default : true
        },
        listenScroll : {
            type : Boolean,
            default : false
        },
        /* 是否派发顶部下拉的事件，用于下拉刷新 */
        pullDownRefresh : {
            type : null,
            default : false
        },
        /* 是否派发滚动到底部的事件，用于上拉加载 */
        pullUpLoad : {
            type : null,
            default : false
        },
        refreshDelay : {
            type : Number,
            default : 20
        }
    },
    data () {
        return {
            isPullingDown : false, 
            isPullUpLoad: false,
            pullUpDirty : true
        }
    },
    mounted () {
        /* 保证在DOM渲染完毕后初始化better-scroll */
        this.$nextTick(() => {
            this._initScroll()
        })
    },
    destroyed() {
        this.$refs.scroll && this.$refs.scroll.destroy()
    },
    methods : {
        _initScroll () {
            if (!this.$refs.wrapper) return

            /* better-scroll的初始化 */
            this.scroll = new BScroll (this.$refs.wrapper, {
                probeType : this.probeType,
                click : this.click,
                pullDownRefresh : this.pullDownRefresh,
                pullUpLoad : this.pullUpLoad
            })

            /* 是否派发滚动事件 */
            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }

            /* 是否派发滚动到底部事件，用于上拉加载 */
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.isPullUpLoad = true
                    this.$emit('pullingUp')
                })
            }

            /* 是否派发顶部下拉事件，用于下拉刷新 */
            if (this.pullDownRefresh) {
                this.scroll.on('pullingDown', () => {
                    this.isPullingDown = true
                    this.$emit('pullingDown')
                })
            }
        },
        enable () {
            this.scroll && this.scroll.enable()
        },
        disable () {
            this.scroll && this.scroll.disable()
        },
        refresh () {
            this.scroll && this.scroll.refresh()
        },
        scrollTo () {
            this.scroll &&this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement () {
            this.scroll &&this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        destroy() {
            this.scroll.destroy()
        },
        forceUpdate(dirty) {
            if (this.pullDownRefresh && this.isPullingDown) {
                this.isPullingDown = false
            } else if (this.pullUpLoad && this.isPullUpLoad) {
                this.isPullUpLoad = false
                this.pullUpDirty = dirty
                this.scroll.finishPullUp()
                this.refresh()
            } else {
                this.refresh()
            }
        }
    },
    watch : {
        data () {
            setTimeout(() => {
                this.forceUpdate(true)
            }, this.refreshDelay)
        }
    }
}
</script>