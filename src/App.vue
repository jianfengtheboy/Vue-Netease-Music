<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-07-02 16:17:02
 * @Description: App.vue
-->
<template>
  <div id="sun" @touchmove.prevent>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import HomeApis from './api/home'

@Component
export default class App extends Vue {
  mounted() {
    this.getHomeBanner()
  }

  async getHomeBanner() {
    const res = await HomeApis.getBanner()
    console.log(res.banners)
  }
}
</script>

<style lang="scss">
@import "./styles/base.scss";

#sun {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
