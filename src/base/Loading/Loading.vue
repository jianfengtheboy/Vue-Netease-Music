<template>
    <div class="loading">
        <img src="./loading.svg">
        <p class="desc">{{ desc }}</p>
    </div>
</template>

<script>
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

<style scoped lang="scss">
@import "../../common/css/base.scss";

.loading {
    width: 100%;
    text-align: center;
    img {
        width: 150px;
        height: 150px;
    }
    .desc {
        font-size: $fontSize24;
        color: $theme777;
    }
}
</style>
