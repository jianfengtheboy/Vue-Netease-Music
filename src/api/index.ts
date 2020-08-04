/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-05 20:42:00
 * @LastEditTime: 2020-08-04 18:03:49
 */
import DiscoverApi from './discover'
import PlayList from './playList'

export default {
  discoverApi: new DiscoverApi(),
  playListApi: new PlayList()
}

