<template>
    <div class="song-list">
        <div class="song-item" v-for="item in items" :key="item.id">
            <slot v-bind="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name : 'songList',
    props : {
        items : {}
    }
}
</script>

<style scoped lang="scss">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.song-list {
    display: flex;
    flex-flow: wrap;
    padding: 0 $fontSize30 / 3;
    .song-item {
        flex: 0 0 33.33333%;
        box-sizing: border-box;
        padding: $fontSize30 / 3 $fontSize30 / 6 $fontSize30 / 3;
        .song-img {
            width: 100%;
            height: 0;
            padding-top: 100%;
            border-radius: $fontSize30 / 5;
            overflow: hidden;
            position: relative;
            &.bgTopLinear:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1;
                height: $fontSize50 + $fontSize24 / 4;
                background: linear-gradient(to bottom,$themeBlackOpacity20 0,$themeBlackOpacity10 80%,rgba(0,0,0,0) 100%);
            }
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
            .playCount {
                position: absolute;
                top: $fontSize22 / 3;
                right: $fontSize22;
                z-index: 1;
                display: block;
                height: $fontSize34;
                line-height: $fontSize34;
                padding-left: $fontSize32;
                font-size: $fontSize22 - 2;
                color: $themeMainColor;
                @include bg-url("./zf.png");
                @include bg-full($p:left,$s:$fontSize22);
            }
            img {
                position: absolute;
                top: 0;
                left: 0;
                @include img-full;
            }
        }
        .song-title {
            margin: $fontSize24 / 3 $fontSize30 / 6;
            line-height: $lineHeight;
            color: $theme333;
            font-size: $fontSize22;
            word-wrap: break-word;
            word-break: break-all;
            @include no-wrap-line(2);
        }
    }
}
.topPlayListMusic {
    .song-item {
        flex: 0 0 50%;
    }
}
</style>