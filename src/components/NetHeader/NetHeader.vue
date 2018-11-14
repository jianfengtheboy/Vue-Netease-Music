<template>
    <div class="netHeader">
        <div class="netHeaderLeft"></div>
        <div class="netHeaderTitle">
            <router-link tag="div" class="netHeaderIcon music" to="/music"></router-link>
            <router-link tag="div" class="netHeaderIcon discover" to="/discover"></router-link>
            <router-link tag="div" class="netHeaderIcon video" to="/userVideo"></router-link>
            <router-link tag="div" class="netHeaderIcon friends" to="/friends"></router-link>
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
        top: $fontSize30 + 1;
        left: $fontSize28 - 1;
        width: $fontSize48;
        height: $fontSize48;
        background-image: url("./ov.png");
        @include bg-full;
    }
    .netHeaderTitle {
        display: flex;
        justify-content: center;
        padding: 30.5px 4 * $fontSize40;
        .netHeaderIcon {
            flex: 0 0 25%;
            height: $fontSize50;
            @include bg-full($s:cover);
            &.music {
                background-image: url("./t_actionbar_music_normal.png");
                &.active {
                    background-image: url("./t_actionbar_music_selected.png");
                }
            }
            &.discover {
                background-image: url("./t_actionbar_discover_normal.png");
                &.active {
                    background-image: url("./t_actionbar_discover_selected.png");
                }
            }
            &.video {
                background-image: url("./t_actionbar_video_normal.png");
                &.active {
                    background-image: url("./t_actionbar_video_selected.png");
                }
            }
            &.friends {
                background-image: url("./t_actionbar_friends_normal.png");
                &.active {
                    background-image: url("./t_actionbar_friends_selected.png");
                }
            }
        }
    }
    .netHeaderRight {
        position: absolute;
        top: $fontSize30 + 1;
        right: $fontSize26;
        width: $fontSize48;
        height: $fontSize48;
        background-image: url("./pf.png");
        @include bg-full;
    }
}
</style>
