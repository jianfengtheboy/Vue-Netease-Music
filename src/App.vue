<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-20 00:16:50
 * @LastEditTime: 2020-06-20 02:49:01
 * @Description: App.vue
-->
<template>
  <div id="sun" @touchmove.prevent>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
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
