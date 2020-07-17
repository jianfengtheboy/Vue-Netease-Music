<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-17 17:47:11
 * @LastEditTime: 2020-07-18 00:25:28
 * @Description: 报表展示组件
 *  report
 *    thead: 头部区域
 *    tbody: 内容区域
 *      type: 类型
 *      title（type === 'text'）: 显示的内容
 *      prop（type === 'value'）: 取值字段
 *      formatter : 转换函数，type为text时，回调当前值;type为value时，回调顺序当前值，配置对象，整体数据
 *      rowSpan : 行数，同td的rowspan属性
 *      colSpan : 列数, 同td的colspan属性
 *  TODO:
 *    1、支持编辑功能
-->
<template>
  <table border='1' class="table" :cellpadding="0" :cellspacing="0">
    <caption/>
    <thead v-if="report.thead">
      <tr v-for="(tds, index) in thead" :key="index" >
        <th
          v-for="(td, tdindex) in tds"
          :key="tdindex"
          :rowspan="td.rowSpan || 1"
          :colspan="td.colSpan || 1"
          :class="td.class"
          :style="td.style"
          :id="td.id"
        >
          <template v-if="td.type === 'text'">
            {{td.formatter ? td.formatter(td.title) : td.title}}
          </template>
          <template v-else-if="td.type === 'value'">
            {{td.formatter ? td.formatter(data[td.prop], td, data) : data[td.prop]}}
          </template>
          <template v-else-if="td.type === 'slot'">
            <slot :name="td.slot" :data="data" :option="td"></slot>
          </template>
        </th>
      </tr>
    </thead>
    <tbody v-if="report.tbody">
      <tr v-for="(tds, index) in tbody" :key="index" >
        <td
          v-for="(td, tdindex) in tds"
          :key="tdindex"
          :rowspan="td.rowSpan || 1"
          :colspan="td.colSpan || 1"
          :class="td.class"
          :style="td.style"
        >
          <template v-if="td.type === 'text'">
            {{td.formatter ? td.formatter(td.title) : td.title}}
          </template>
          <template v-else-if="td.type === 'value'">
            {{td.formatter ? td.formatter(data[td.prop], td, data) : data[td.prop]}}
          </template>
          <template v-else-if="td.type === 'slot'">
            <slot :name="td.slot" :data="data" :option="td"></slot>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" type="text/ecmascript-6">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Report extends Vue {
  @Prop({ default: () => ({ thead: [], tbody: [] }) }) public report!: any
  @Prop({ default: () => ({}) }) public data!: object

  public get maxSpanCount() {
    const headColSpans = (this.report.thead || []).map((columns = []) => columns.map((column: any) => (column.colSpan || 1)).reduce((t, a) => t + a, 0))
    const bodyColSpans = (this.report.tbody || []).map((columns = []) => columns.map((column: any) => (column.colSpan || 1)).reduce((t, a) => t + a, 0))
    return (this as any).$utils.array.arrayMax([ ...headColSpans, ...bodyColSpans ])
  }

  public get thead() {
    return this.report.thead ? this.report.thead.map((columns = []) => columns.map((item: any) => {
      item.style = `${item.style || ''};width:${(item.colSpan || 1) / this.maxSpanCount * 100}%;`
      return item
    })) : []
  }

  public get tbody() {
    return this.report.tbody ? this.report.tbody.map((columns = []) => columns.map((item: any) => {
      item.style = `${item.style || ''};width:${(item.colSpan || 1) / this.maxSpanCount * 100}%;`
      return item
    })) : []
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  table-layout: fixed;
  tr {
    th, td {
      padding: 10px;
      word-break: break-all;
    }
    td{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .redColor {
    color: #ff0000;
  }
  .yellowColor {
    color: #ffff00;
  }
}
.text-bold {
  font-weight: 600;
}
.text-bold-700 {
  font-weight: 700;
}
.text-bold-800 {
  font-weight: 800;
}
.text-bold-900 {
  font-weight: 900;
}
.align-left {
  text-align: left;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}
</style>
