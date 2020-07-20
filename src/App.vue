<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-07-19 23:15:36
 * @Description: App.vue
-->
<template>
  <div id="sun" @touchmove.prevent>
    <Scroll></Scroll>
    <Slider>
      <div v-for="item in bannerList" :key="item.index">
        <a :href="item.url">
          <img class="pic" :src="item.imageUrl">
        </a>
      </div>
    </Slider>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'
import Slider from '@/components/Slider/Slider.vue'
import Scroll from '@/components/Scroll/Scroll.vue'

@Component({
  components: {
    Slider,
    Scroll
  }
})
export default class App extends Vue {
  
  private bannerList!: Array<object>

  constructor() {
    super()
    this.bannerList = []
  }

  mounted() {
    this.getHomeBanner()
  }

  public async getHomeBanner(this: any) {
    const res = await this.$api.homeApi.getBanner()
    this.bannerList = res.banners
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
