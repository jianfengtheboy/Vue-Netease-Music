<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 23:12:41
 * @LastEditTime: 2020-07-27 00:16:37
--> 
<template>
  <div class="basicLayout">
    <net-header></net-header>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Vue } from 'vue-property-decorator'
import NetHeader from '@/components/NetHeader/NetHeader.vue'

@Component({
  components: {
    NetHeader
  }
})
export default class BasicLayout extends Vue {
  
}
</script>

<style lang="scss" scoped>
.basicLayout {
  width: 100%;
  height: 100%;
}
</style>
