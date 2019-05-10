import axios from 'axios'
import { URL, defaultLimit } from '../common/js/config'

//获取banner
export function getBanner() {
    const url = `${URL}/banner`
    return axios.get(url)
}

//获取推荐歌单
export function getPersonalized(limit) {
    const url = `${URL}/personalized`
    return axios.get(url, {
        params : {
            limit : 24
        }
    })
}

//获取推荐新音乐
export function getPersonalizedNewSong(limit) {
    const url = `${URL}/personalized/newsong`
    return axios.get(url, {
        params : {
            limit
        }
    })
}

//获取推荐MV
export function getPersonalizedMv() {
    const url = `${URL}/personalized/mv`
    return axios.get(url)
}

//获取最新 mv
export function getMvFirst(limit) {
    const url = `${URL}/mv/first`
    return axios.get(url, {
        params : {
            limit : defaultLimit
        }
    })
}

//获取推荐电台
export function getPersonalizedDjProgram() {
    const url = `${URL}/personalized/djprogram`
    return axios.get(url)
}

//获取推荐节目
export function getProgramRecommend() {
    const url = `${URL}/program/recommend`
    return axios.get(url)
}

//获取独家放送
export function getPrivateContent() {
    const url = `${URL}/personalized/privatecontent`
    return axios.get(url)
}

//获取MV排行
export function getTopMv(limit = defaultLimit) {
    const url = `${URL}/top/mv`
    return axios.get(url, {
        params : {
            limit
        }
    })
}

//获取MV地址
export function getMvUrl(id) {
    const url = `${URL}/mv/url`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取歌单分类
export function getPlayListCatlist() {
    const url = `${URL}/playlist/catlist`
    return axios.get(url)
}

//获取热门歌单分类
export function getPlayListHot() {
    const url = `${URL}/playlist/hot`
    return axios.get(url)
}

//获取歌单 ( 网友精选碟 )
export function getTopPlayList(page = 0, limit = 20, order = 'hot') {
    const url = `${URL}/top/playlist`
    return axios.get(url, {
        params : {
            offset : page * limit,
            order,
            limit
        }
    })
}

//获取精品歌单
export function getPlayListHighQuality(limit) {
    const url = `${URL}/top/playlist/highquality`
    return axios.get(url, {
        params : {
            limit
        }
    })
}

//获取相关歌单推荐
export function getRelatedPlayList(id) {
    const url = `${URL}/related/playlist`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取歌单详情
export function getPlayListDetail(id) {
    const url = `${URL}/playlist/detail`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取音乐url
export function getMusicUrl(id) {
    const url = `${URL}/song/url`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//搜索
export function Search(keyWords, type, offset) {
    //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    const url = `${URL}/search`
    return axios.get(url, {
        params : {
            keyWords : keyWords,
            type : type,
            limit : defaultLimit,
            offset : offset
        }
    })
}

//热搜
export function searchHot() {
    const url = `${URL}/search/hot`
    return axios.get(url)
}

//搜索建议
export function searchSuggest(keywords) {
    const url = `${URL}/search/suggest`
    return axios.get(url, {
        params : {
            keywords
        }
    })
}

//搜索多重匹配
export function searchMultimatch(keywords) {
    const url = `${URL}/search/multimatch`
    return axios.get(url, {
        params : {
            keyWords
        }
    })
}

//获取歌词
export function getLyric(id) {
    const url = `${URL}/lyric`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//歌曲评论
export function getMusicComment(id, limit = defaultLimit) {
    const url = `${URL}/comment/music`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//专辑评论
export function getAlbumComment(id, limit = defaultLimit) {
    const url = `${URL}/comment/album`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//歌单评论
export function getPlayListComment(id, limit = defaultLimit) {
    const url = `${URL}/comment/playlist`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//mv评论
export function getMvComment(id, limit = defaultLimit) {
    const url = `${URL}/comment/mv`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//电台节目评论
export function getDjComment(id, limit = defaultLimit) {
    const url = `${URL}/comment/dj`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//热门评论
export function getHotComment(id, type) {
    const url = `${URL}/comment/hot`
    return axios.get(url, {
        params : {
            id : id,
            type : type
        }
    })
}

//获取歌曲详情
export function getSongDetail(ids) {
    const url = `${URL}/song/detail`
    return axios.get(url, {
        params : {
            ids
        }
    })
}

//获取专辑内容
export function getAlbum(id) {
    const url = `${URL}/album`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取歌手单曲
export function getArtist(id) {
    const url = `${URL}/artists`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取歌手专辑
export function getArtistAlbum(id, limit) {
    const url = `${URL}/artist/album`
    return axios.get(url, {
        params : {
            id,
            limit : limit
        }
    })
}

//获取歌手描述
export function getArtistDesc(id) {
    const url = `${URL}/artist/desc`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取相似歌手
export function getSimiArtist(id) {
    const url = `${URL}/simi/artist`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取相似歌单
export function getSimiPlayList(id) {
    const url = `${URL}/simi/playlist`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取相似 mv
export function getSimiMv(mvid) {
    const url = `${URL}/simi/mv`
    return axios.get(url, {
        params : {
            mvid
        }
    })
}

//获取相似音乐
export function getSimiSong(id) {
    const url = `${URL}/simi/song`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取最近 5 个听了这首歌的用户
export function getSimiUser(id) {
    const url = `${URL}/simi/user`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//获取每日推荐歌单
export function getRecommend() {
    const url = `${URL}/recommend/resource`
    return axios.get(url)
}

//获取每日推荐歌曲
export function getRecommendSongs() {
    const url = `${URL}/recommend/songs`
    return axios.get(url)
}

//私人FM
export function getPersonalFm() {
    const url = `${URL}/personal_fm`
    return axios.get(url)
}

//喜欢音乐
export function musicLike(id) {
    const url = `${URL}/like`
    return axios.get(url, {
        params : {
            id
        }
    })
}

//新碟上架
export function getTopAlbum(limit) {
    const url = `${URL}/top/album`
    return axios.get(url, {
        params : {
            limit
        }
    })
}

//热门歌手
export function getTopArtists(limit) {
    const url = `${URL}/top/artists`
    return axios.get(url, {
        params : {
            limit : defaultLimit
        }
    })
}

//排行榜
export function getTopList(idx) {
    const url = `${URL}/top/list`
    return axios.get(url, {
        params : {
            idx
        }
    })
}

//榜单内容摘要
export function getTopListDetail() {
    const url = `${URL}/toplist/detail`
    return axios.get(url)
}

//歌手榜
export function getTopListArtist() {
    const url = `${URL}/toplist/artist`
    return axios.get(url)
}

//电台 - 推荐
export function getDjRecommend() {
    const url = `${URL}/dj/recommend`
    return axios.get(url)
}

//电台 -  分类
export function getDjCatelist() {
    const url = `${URL}/dj/catelist`
    return axios.get(url)
}

//电台 - 节目
export function getDjProgram(rid, limit) {
    const url = `${URL}/dj/program`
    return axios.get(url, {
        params : {
            rid,
            limit : defaultLimit
        }
    })
}
