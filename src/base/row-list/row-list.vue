<template>
    <div class="row-list">
        <div class="row-item" v-for="item in items" :key="item.id">
            <slot v-bind="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name : 'rowList',
    props : {
        items : {}
    }
}
</script>

<style scoped lang="scss">

</style>
