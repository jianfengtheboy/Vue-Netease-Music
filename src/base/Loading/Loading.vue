<template>
    <div class="loading">
        <img src="./loading.svg" width="64" height="64">
        <p class="desc">{{desc}}</p>
    </div>
</template>

<script type="text/ecmacript-6">
export default {
    name : 'loading',
    props : {
        desc : {
            type : String,
            default : '正在加载中...'
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";

.loading {
    width: 100%;
    text-align: center;
    .desc {
        font-size: $fontSize26;
        color: $theme777;
    }
}
</style>
