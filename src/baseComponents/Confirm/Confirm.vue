<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-30 17:15:19
 * @LastEditTime: 2020-08-02 00:04:29
 * @Description: Confirm全局组件
--> 
<template>
  <transition name="fade">
    <div class="modal" v-if="showModal">
      <div class="modalBody" @click.stop>
        <div class="modalTitle">
          <div class="modalTitleText">{{title}}</div>
          <slot name="modalTitle"></slot>
        </div>
        <div class="modalContent">
          <div class="modalContentText">{{content}}</div>
          <slot name="modalContent"></slot>
        </div>
        <div class="modalFooter" v-if="type === 'alert'" @click.stop="alertClick">
          <div class="modalBtn">{{alertText}}</div>
        </div>
        <div class="modalFooter" v-if="type === 'confirm'">
          <div class="modalBtn borderRight" @touchstart.prevent="cancelClick">{{cancelText}}</div>
          <div class="modalBtn" @touchstart.prevent="confirmClick">{{confirmText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Confirm extends Vue {
  private showModal!: boolean
  private promiseStatus!: any

  constructor() {
    super()
    this.showModal = false
    this.promiseStatus = null
  }

  @Prop({ default: '温馨提示' }) title?: string
  @Prop({ default: '' }) content?: string
  @Prop({ default: '我知道了' }) alertText?: string
  @Prop({ default: '取消' }) cancelText?: string
  @Prop({ default: '确定' }) confirmText?: string
  @Prop({ default: 'confirm' }) type!: string

  public confirm() {
    this.showModal = true
    return new Promise((resolve, reject) => {
      this.promiseStatus = {resolve, reject}
    })
  }

  private alertClick(): void {
    this.showModal = false
    this.promiseStatus && this.promiseStatus.resolve()
  }

  private cancelClick(): void {
    this.showModal = false
    this.promiseStatus && this.promiseStatus.reject()
  }

  private confirmClick(): void {
    this.showModal = false
    this.promiseStatus && this.promiseStatus.resolve()
  }
            
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import '../../styles/mixin.scss';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  /* 这里防止当用户长按屏幕，出现的黑色背景色块，以及 iPhone 横平时字体的缩放问题 */
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.fade-enter-active {
  animation: opacity 0.3s;
}
.fade-enter-active .content-wrap {
  animation: scale 0.3s;
}
.fade-leave-active {
  animation: outOpacity 0.2s;
}

.modalBody {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  width: $fontSize38 * 10;
  margin: 0 auto;
  transform: translateY(-50%);
  background-color: $themeWhite;
  @include borderRadius($fontSize30 / 3);
  z-index: 999;
  user-select: none;
}

.modalTitleText {
  padding-top: $fontSize32;
  text-align: center;
  font-size: $fontSize30;
  font-weight: 500;
  color: $theme333;
}

.modalContentText {
  padding: $fontSize32 $fontSize26 0;
  margin-bottom: $fontSize32;
  text-align: center;
  font-size: $fontSize26;
  color: $theme666;
  line-height: 1.5;
}

.modalFooter {
  display: flex;
  @include border-direction(top, 1px, $themeeee)
}
.modalBtn {
  flex: 1;
  text-align: center;
  font-size: $fontSize28;
  margin: $fontSize32 / 2 0;
  padding: $fontSize30 / 3 0;
}

.borderRight {
  @include border-direction(right, 1px, $themeeee)
}

/* 进来的动画 */
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 出去的动画 */
@keyframes outOpacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
