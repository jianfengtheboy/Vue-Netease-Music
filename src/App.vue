<!--
 * @Author: SunJianFeng
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2021-02-22 10:47:41
 * @Description: App.vue
-->
<template>
  <div id="sun" @touchmove.prevent>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
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
