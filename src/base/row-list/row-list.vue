<template>
    <div class="row-list">
        <div class="row-item" v-for="item in items" :key="item.id">
            <slot v-bind="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name : 'rowList',
    props : {
        items : {}
    }
}
</script>

<style scoped lang="scss">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.row-list {
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
            border-bottom: 1px solid $themeBlackOpacity10;
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
</style>
