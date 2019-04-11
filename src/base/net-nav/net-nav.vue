<template>
    <div class="net-nav">
        <div class="navLeft" @click="goBack"></div>
        <div class="navTitle">{{ title }}</div>
        <div class="navRight"></div>
    </div>
</template>

<script>
export default {
    name : 'netNav',
    props : {
        title : {
            type : String,
            default : ''
        }
    },
    methods : {
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.net-nav {
    position: relative;
    height: $fontSize40 * 2;
    padding: $fontSize28 / 2 $fontSize50 * 2 + 5;
    line-height: $fontSize40 * 2;
    color: $themeWhite;
    background-color: $themeColor;
    overflow: hidden;
    .navLeft {
        display: block;
        position: absolute;
        top: $fontSize30;
        left: $fontSize34 + 1;
        width: $fontSize26 * 2;
        height: $fontSize26 * 2;
        @include bg-url('./oq.png');
        @include bg-full;
        z-index: 1;
    }
    .navTitle {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: $fontSize30;
        z-index: 1;
    }
    .navRight {
        position: absolute;
        top: $fontSize30;
        right: $fontSize34 + 1;
        z-index: 1;
    }
}
</style>