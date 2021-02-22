<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-26 23:12:41
 * @LastEditTime: 2021-02-22 14:34:50
--> 
<template>
  <div class="basicLayout">
    <NetHeader v-if="this.$route.meta.show"></NetHeader>
    <NetNav v-else :title="this.$route.meta.title || this.$route.params.name"></NetNav>
    <keep-alive>
      <transition name="slide">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Vue } from 'vue-property-decorator'
import NetHeader from '@/components/NetHeader/NetHeader.vue'
import NetNav from '@/components/NetNav/NetNav.vue'

@Component({
  components: {
    NetHeader,
    NetNav
  }
})
export default class BasicLayout extends Vue {}
</script>

<style lang="scss" scoped>
.slide-enter-active,.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,.slide-leave-to {
  transform: translate3d(100%,0,0);
}

.basicLayout {
  width: 100%;
  height: 100%;
}
</style>
