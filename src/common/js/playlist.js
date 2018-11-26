export class PlayList {
    constructor({id, name, coverImgUrl, userId, nickname, trackCount, playCount}) {
        this.id = id; //歌单ID
        this.name = name; //歌单名称
        this.coverImgUrl = coverImgUrl; //歌单封面
        this.userId = userId; //歌单创建者ID
        this.nickname = nickname; //歌单创建者昵称
        this.trackCount = trackCount; //歌曲数量
        this.playCount = playCount //播放数
    }
}

export const createPlayList = function (playlist) {
    return new PlayList({
        id : playlist.id,
        name : playlist.name,
        coverImgUrl : playlist.coverImgUrl,
        userId: playlist.creator.userId,
        nickname: playlist.creator.nickname,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount
    })
}

//歌单数据格式化
const formatPlayList = function (list) {
    let PlayList = []
    list.forEach(item => {
        if(item.id) {
            PlayList.push(createPlayList(item))
        }
    })
    return PlayList
}

export default formatPlayList