<template>
    <div id="app" @touchmove.prevent>
        <NetHeader></NetHeader>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import NetHeader from './components/NetHeader/NetHeader'

export default {
    name: 'App',
    components : {
        NetHeader
    }
}
</script>

<style lang="scss" type="text/css"></style>
