<template>
    <div class="netHeader">
        <div class="netHeaderLeft"></div>
        <div class="netHeaderTitle">
            <router-link class="netHeaderIcon music" to="/music"></router-link>
            <router-link class="netHeaderIcon discover" to="/discover"></router-link>
            <router-link class="netHeaderIcon video" to="/video"></router-link>
            <router-link class="netHeaderIcon friends" to="/friends"></router-link>
        </div>
        <div class="netHeaderRight"></div>
    </div>
</template>

<script type="text/ecmacript-6">
export default {
    name : 'netHeader'
}
</script>

<style scoped lang="scss" type="text/css">
@import "@/common/css/base.scss";
@import "@/common/css/mixin.scss";

.netHeader {
    position: relative;
    background-color: $themeColor;
    .netHeaderLeft {
        position: absolute;
        top: 30px;
        left: $fontSize40;
        width: 50px;
        height: 50px;
        background-image: url("./ov.png");
        @include bg-full;
    }
    .netHeaderTitle {
        display: flex;
        justify-content: center;
        padding: 30px 180px;
        .netHeaderIcon {
            flex: 0 0 25%;
            height: 50px;
            @include bg-full($s:cover);
            &.music {
                background-image: url("./t_actionbar_music_normal.png");
            }
            &.discover {
                background-image: url("./t_actionbar_discover_normal.png");
            }
            &.video {
                background-image: url("./t_actionbar_video_normal.png");
            }
            &.friends {
                background-image: url("./t_actionbar_friends_normal.png");
            }
            &.router-link-active.music {
                background-image: url("./t_actionbar_music_selected.png")
            }
            &.router-link-active.discover {
                background-image: url("./t_actionbar_discover_selected.png")
            }
            &.router-link-active.video {
                background-image: url("./t_actionbar_video_selected.png")
            }
            &.router-link-active.friends {
                background-image: url("./t_actionbar_friends_selected.png")
            }
        }
    }
    .netHeaderRight {
        position: absolute;
        top: 30px;
        right: $fontSize40;
        width: 50px;
        height: 50px;
        background-image: url("./pf.png");
        @include bg-full;
    }
}
</style>
