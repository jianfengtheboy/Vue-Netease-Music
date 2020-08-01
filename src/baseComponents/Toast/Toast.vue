<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-30 15:09:03
 * @LastEditTime: 2020-08-02 00:03:53
 * @Description: toast全剧组件
--> 
<template>
  <transition name="fade">
    <div class="toast" v-if="visible" :class="type">
      <svg-icon :iconClass="iconClass" class="icon" />
      {{message | textover(14)}}
    </div>
  </transition>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
  @Prop({ default: 'normal' }) type!: string
  @Prop({ default: false }) visible!: boolean
  @Prop({ default: '' }) message!: string

  private get iconClass() {
    const tipType = ['normal', 'success', 'warning', 'error']
    if (tipType.includes(this.type)) {
      return `${this.type}`
    } else {
      throw "Toast type数据只允许为 normal, success, warning, error 四种其中的一种，默认为normal"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import '../../styles/mixin.scss';

.toast {
  padding: $fontSize36 / 2 $fontSize28;
  font-size: $fontSize26;
  text-align: center;
  @include borderRadius($fontSize30 / 3);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  align-items: center;
  line-height: 1.4;
}
.normal {
  color: #909399;
  background: rgb(233, 233, 235)
}
.success {
  color: #67C23A;
  background: rgb(225, 243, 216);
}
.warning {
  color: #E6A23C;
  background: rgb(250, 236, 216);
}
.error {
  color: #F56C6C;
  background: rgb(253, 226, 226);
}
.icon {
  width: $fontSize36;
  height: $fontSize36;
  margin-right: $fontSize36 / 6;
}
/* vue动画过渡效果设置 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
