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

<style lang="scss" type="text/css">
@import "./common/css/base.scss";

#app {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
