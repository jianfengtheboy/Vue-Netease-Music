<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-07-22 16:23:21
 * @Description: App.vue
-->
<template>
  <transition name="slide">
    <div id="sun" @touchmove.prevent>
      <net-header></net-header>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </transition>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'
import NetHeader from './components/NetHeader/NetHeader.vue'

@Component({
  components: {
    NetHeader
  }
})
export default class App extends Vue {
  
  // private bannerList!: Array<object>

  // constructor() {
  //   super()
  //   this.bannerList = []
  // }

  // mounted() {
  //   this.getHomeBanner()
  // }

  // public async getHomeBanner(this: any) {
  //   const res = await this.$api.homeApi.getBanner()
  //   this.bannerList = res.banners
  // }
}
</script>

<style lang="scss">
@import "./styles/base.scss";

.slide-enter-active,.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,.slide-leave-to {
  transform: translate3d(100%,0,0);
}

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
