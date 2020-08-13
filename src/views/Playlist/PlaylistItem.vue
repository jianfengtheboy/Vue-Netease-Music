<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-08-03 17:36:53
 * @LastEditTime: 2020-08-10 23:51:09
 * @Description: 
-->
<template>
  <div>
    
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PlaylistItem extends Vue {
  private created() {
    console.log('...', this.$route.meta)
  }
}
</script>

<style lang="scss" scoped>
  
</style>