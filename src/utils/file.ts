/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-07-16 11:15:04
 * @LastEditTime: 2020-07-16 14:10:00
 * @Description: file
 */ 
export default class FileUtils {
  /**
    * @获取文件base64编码
    * @param file 文件
    * @param format  指定文件格式
    * @param size  指定文件大小(字节)
    * @param formatMsg 格式错误提示
    * @param sizeMsg   大小超出限制提示
    * @returns {Promise<any>}
    */
  fileToBase64String = (file: Blob, format = ['jpg', 'jpeg', 'png', 'gif'], size = 20 * 1024 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') => {
    return new Promise((resolve, reject) => {
      // 格式过滤
      const suffix = file.type.split('/')[1].toLowerCase()
      let inFormat = false
      for (let i = 0; i < format.length; i++) {
        if (suffix === format[i]) {
          inFormat = true
          break
        }
      }
      if (!inFormat) reject(formatMsg)
      // 大小过滤
      if (file.size > size) reject(sizeMsg)
      // 转base64字符串
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        const res = fileReader.result
        resolve({base64String: res, suffix: suffix})
        reject('异常文件，请重新选择')
      }
    })
  }

  /**
    * @B转换到KB、MB、GB并保留两位小数
    * @param { number } fileSize
    */
  formatFileSize = (fileSize: number) => {
    let temp
    if (fileSize < 1024) {
      return fileSize + 'B'
    } else if (fileSize < (1024 * 1024)) {
      temp = fileSize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (fileSize < (1024 * 1024 * 1024)) {
      temp = fileSize / (1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      temp = fileSize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  }

  /**
    * @base64转file
    * @param { base64 } base64
    * @param { string } filename 转换后的文件名
    */
  base64ToFile = (base64: string, filename: string)=> {
    const arr: any = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const suffix = mime.split('/')[1] // 图片后缀
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, { type: mime })
  }

  /**
    * @base64转blob
    * @param { base64 } base64
    */
  base64ToBlob = (base64: string) => {
    const arr: any = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
    * @blob转file
    * @param { blob } blob
    * @param { string } fileName
    */
  blobToFile = (blob: { lastModifiedDate: Date; name: any }, fileName: any) => {
    blob.lastModifiedDate = new Date()
    blob.name = fileName
    return blob
  }

   /**
    * @file转base64
    * @param { * } file 图片文件
    */
  fileToBase64 = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e: any) {
      return e.target.result
     }
  }
}
