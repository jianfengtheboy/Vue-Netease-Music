/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-05 20:42:00
 * @LastEditTime: 2020-11-26 14:39:54
 */
import DiscoverApi from './discover'
import PlayList from './playList'
import RankApi from './rank'

export default {
  discoverApi: new DiscoverApi(),
  playListApi: new PlayList(),
  rankApi: new RankApi()
}

