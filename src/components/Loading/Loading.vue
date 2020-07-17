<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 02:28:15
 * @LastEditTime: 2020-07-13 15:22:54
 * @Description: loading组件
--> 
<template>
  <div class="loading">
    <img src="../../icons/svg/loading.svg" alt="">
    <p class="desc">{{ desc }}</p>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop({ default: '正在加载中...' }) public desc?: string;
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixin";

.loading {
  width: 100%;
  text-align: center;
  img {
    width: $fontSize50 * 3;
    height: $fontSize50 * 3;
  }
  .desc {
    font-size: $fontSize24;
    color: $theme777;
  }
}
.loadMore {
  padding: $fontSize36 / 2 0;
  img {
    width: $fontSize40 * 2;
    height: $fontSize40 * 2;
  }
}
</style>
