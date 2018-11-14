<template>
    <div class="song-list">
        <div class="song-item" v-for="item in items" :key="item.id">
            <slot v-bind="item"></slot>
        </div>
    </div>
</template>

<script type="text/ecmacript-6">
export default {
    name : 'songList',
    props : {
        items : {}
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.song-list {
    display: flex;
    flex-flow: wrap;
    padding: 0 $fontSize30 / 3;
    .song-item {
        flex: 0 0 33.33333%;
        box-sizing: border-box;
        padding: $fontSize30 / 3 $fontSize30 / 6 0;
        .song-img {
            width: 100%;
            height: 0;
            padding-top: 100%;
            border-radius: $fontSize30 / 3;
            overflow: hidden;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1;
                height: $fontSize50;
                background: linear-gradient(to bottom,rgba(0, 0, 0, .35) 0,rgba(0, 0, 0, .2) 80%,rgba(0, 0, 0, 0) 100%);
            }
            &:after {
                content : attr(data-play);
                position: absolute;
                top: 15px;
                right: 20px;
                z-index: 1;
                display: block;
                height: 40px;
                line-height: 40px;
                padding-left: 40px;
                font-size: $fontSize30;
                color: #fff;
                @include bg-url("./zf.png");
                @include bg-full($p:left,$s:30px);
            }
            img {
                position: absolute;
                top: 0;
                left: 0;
                @include img-full;
            }
        }
        .song-title {
            height: 100px;
            margin: 20px 10px;
            line-height: 50px;
            color: #333;
            font-size: $fontSize30;
            word-wrap: break-word;
            word-break: break-all;
            @include no-wrap-line(2);
        }
    }
}
</style>