<template>
    <div class="netmenu">
        <router-link class="menu-item" tag="div" :to="{ name : 'personalFM'}">
            <div class="menu-icon fm"></div>
            <p>私人FM</p>
        </router-link>
        <router-link class="menu-item" tag="div" :to="{ name : 'recommend'}">
            <div class="menu-icon daily"><span class="date">{{ getTime }}</span></div>
            <p>每日推荐</p>
        </router-link>
        <router-link class="menu-item" tag="div" :to="{ name : 'musicList'}">
            <div class="menu-icon musicList"></div>
            <p>歌单</p>
        </router-link>
        <router-link class="menu-item" tag="div" :to="{ name : 'rank'}">
            <div class="menu-icon rank"></div>
            <p>排行榜</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name : 'netmenu',
    data () {
        return { 
            date : ''
        }
    },
    computed : {
        getTime () {
            let today = new Date()
            return this.date = today.getUTCDate()
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../common/css/base.scss";
@import "../../common/css/mixin.scss";

.netmenu {
    display: flex;
    justify-content: space-around;
    border-bottom: $fontSize22 / 22 solid #dbdcde80;
    background-color: $themeWhite;
    .menu-item {
        flex: 0 0 25%;
        margin: $fontSize30 0;
        p {
            text-align: center;
            font-size: $fontSize24;
            color: #2e302f;
        }
        .menu-icon {
            position: relative;
            width: 50%;
            height: 0;
            margin: 0 25% 10%;
            padding-top: 50%;
            @include borderRadius(50%);
            box-shadow: 0 $fontSize22 / 11 $fontSize32 / 2 rgba(229,71,60,.6);
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
            &.daily .date {
                display: block;
                position: absolute;
                top: 58%;
                left: 50%;
                font-size: $fontSize40 / 2;
                color: $themeWhite;
                @include transform(translate(-50%, -50%));
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