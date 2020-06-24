/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-23 22:52:38
 * @LastEditTime: 2020-06-23 23:05:37
 * @Description: 生成随机密码
 */ 
export default class RandomPwd {
  getRandomPwd() {
    // 可以生成随机密码的相关数组
    const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const english = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const ENGLISH = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '|', '[', '{', '}', ']', ';', ':', '’', '”', ',', '<', '.', '>', '/', '?']
    const config = num.concat(english).concat(ENGLISH).concat(special)
    // 先放入一个必须存在的
    let arr = []
    arr.push(this.getOne(num))
    arr.push(this.getOne(english))
    arr.push(this.getOne(ENGLISH))
    arr.push(this.getOne(special))
    // 从必须存在的数组中随机选取2个组合
    arr = this.getRandomArrayElements(arr, 2)
    // 再从全部数组中抽出4个
    for (let i = 2; i < 6; i++) {
      arr.push(config[Math.floor(Math.random() * config.length)])
    }
    // 乱序
    const newArr = []
    for (let j = 0; j < 6; j++) {
      newArr.push(arr.splice(Math.random() * arr.length, 1)[0])
    }
    return newArr.join('')
  }
  
  getOne(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  getRandomArrayElements(arr: string[], count: number) {
    const shuffled = arr.slice(0)
    let i = arr.length
    const min = i - count
    let temp
    let index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }
}
