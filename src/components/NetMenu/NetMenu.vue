<template>
    <div class="netmenu">
        <router-link class="menu-item" tag="div" to="/personalFM">
            <div class="menu-icon fm"></div>
            <p>私人FM</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/recommend">
            <div class="menu-icon daily"></div>
            <p>每日推荐</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/musicList">
            <div class="menu-icon musicList"></div>
            <p>歌单</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/rank">
            <div class="menu-icon rank"></div>
            <p>排行榜</p>
        </router-link>
    </div>
</template>

<script type="text/ecmacript-6">
export default {
    name : 'netmenu'
}
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.netmenu {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #dbdcde80;
    .menu-item {
        flex: 0 0 25%;
        padding: 30px 0;
        p {
            text-align: center;
            font-size: $fontSize26;
            color: #2e302f;
        }
        .menu-icon {
            position: relative;
            width: 50%;
            height: 0;
            margin: 0 25% 15%;
            padding-top: 50%;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                @include bg-full;
            }
            &.fm:before {
                @include bg-url('./icn_fm_prs.png')
            }
            &.daily:before {
                @include bg-url('./icn_daily_prs.png')
            }
            &.musicList:before {
                @include bg-url('./icn_playlist_prs.png')
            }
            &.rank:before {
                @include bg-url('./icn_rank_prs.png')
            }
        }
    }
}
</style>