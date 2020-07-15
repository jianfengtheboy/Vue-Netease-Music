/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-06-26 22:54:43
 * @LastEditTime: 2020-07-16 00:16:13
 * @Description: regexp
 */ 

export default class RegExpUtils {
  // 常规名称验证
  isName (value: string) {
    const reg = /^[\u4e00-\u9fa50-9a-zA-Z]([\u4e00-\u9fa50-9a-zA-Z_]*[\u4e00-\u9fa50-9a-zA-Z])*$/
    if (!reg.test(value)) {
      return false
    }
    return true
  }
  
  // 邮箱验证 支持 多邮箱
  isEmail (value: string) {
    const reg = new RegExp('^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$')
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }

  // SNMP地址验证 支持 多SNMP地址
  isSnmp (value: string) {
    const reg = new RegExp('((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?[1-9])))(/\\d{1,5}))') // 正则表达式
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }
  
  // 手机号码验证 支持 多手机号码
  isPhone (value: string) {
    const reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$') // 正则表达式
    if (value.length > 0) {
      const obj = value.split(',')
      for (let i = 0; i < obj.length; i++) {
        if (!reg.test(obj[i])) {
          return false
        }
      }
      return true
    }
  }

  // 是否url地址
  isURL (value: string) {
    return /^http[s]?:\/\/.*/.test(value)
  }

  // 严格的身份证校验
  isCardID = (sId: string) => {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
      console.error('你输入的身份证长度或格式错误')
      return false
    }
    //身份证城市
    const aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
    if (!Object.keys(aCity).includes(sId.substr(0, 2))) {
      console.error('你的身份证地区非法')
      return false
    }
    // 出生日期验证
    const sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/")
    const d = new Date(sBirthday)
    if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
      console.error('身份证上的出生日期非法')
      return false
    }
    // 身份证号码校验
    let sum = 0
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const codes = "10X98765432"
    for (let i = 0; i < sId.length - 1; i++) {
      sum += parseInt(sId[i]) * weights[i]
    }
    const last = codes[sum % 11] //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
      console.error('你输入的身份证号非法')
      return false
    }
    return true
  }
  
  // 检测密码强度
  checkPwd = (str: string) => {
    let Lv = 0
    if (str.length < 6) {
      return Lv
    }
    if (/[0-9]/.test(str)) {
      Lv++
    }
    if (/[a-z]/.test(str)) {
      Lv++
    }
    if (/[A-Z]/.test(str)) {
      Lv++
    }
    // eslint-disable-next-line
    if (/[\.|-|_]/.test(str)) {
      Lv++
    }
    return Lv
  }

  // 验证不能包含字母
  isNoWord = (value: string) => /^[^A-Za-z]*$/g.test(value)

  // 验证中文和数字
  isCHNAndEN = (value: string) => /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value)

  // 验证邮政编码(中国)
  isPostcode = (value: string) => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value)

  // 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
  isWeChatNum = (value: string) => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value)

  // 验证16进制颜色
  isColor16 = (value: string) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value)

  // 验证火车车次
  isTrainNum = (value: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value)

  // 验证手机机身码(IMEI)
  isIMEI = (value: string) => /^\d{15,17}$/g.test(value)

  // 验证必须带端口号的网址(或ip)
  isHttpAndPort = (value: string) => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value)

  // 验证网址(支持端口和"?+参数"和"#+参数)
  isRightWebsite = (value: string) => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value)

  // 验证统一社会信用代
  isCreditCode = (value: string) => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value)

  // 验证迅雷链接
  isThunderLink = (value: string) => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value)

  // 验证ed2k链接(宽松匹配)
  ised2k = (value: string) => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value)

  // 验证磁力链接(宽松匹配)
  isMagnet = (value: string) => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value)

  // 验证子网掩码
  isSubnetMask = (value: string) => /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(value)

  // 验证linux"文件夹"路径
  isLinuxFolderPath = (value: string) => /^(\/[^/]+)+\/?$/g.test(value)

  // 验证linux"文件"路径
  isLinuxFilePath = (value: string) => /^(\/[^/]+)+$/g.test(value)

  // 验证window"文件夹"路径
  isWindowsFolderPath = (value: string) => /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value)

  // 验证window下"文件"路径
  isWindowsFilePath = (value: string) => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value)

  // 验证股票代码(A股)
  isAShare = (value: string) => /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(value)

  // 验证版本号格式必须为X.Y.Z
  isVersion = (value: string) => /^\d+(?:\.\d+){2}$/g.test(value)

  // 验证视频链接地址（视频格式可按需增删）
  isVideoUrl = (value: string) => /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(value)

  // 验证图片链接地址（图片格式可按需增删）
  isImageUrl = (value: string) => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value)

  // 验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
  isAccountNumber = (value: string) => /^[1-9]\d{9,29}$/g.test(value)

  // 验证中文姓名
  isChineseName = (value: string) => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value)

  // 验证英文姓名
  isEnglishName = (value: string) => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value)

  // 验证车牌号(新能源)
  isLicensePlateNumberNER = (value: string) => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value)

  // 验证车牌号(非新能源)
  isLicensePlateNumberNNER = (value: string) => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value)

  // 验证车牌号(新能源+非新能源)
  isLicensePlateNumber = (value: string) => /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(value)

  // 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
  isMPStrict = (value: string) => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value)

  // 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
  isMPRelaxed = (value: string) => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value)

  // 验证座机电话(国内),如: 0341-86091234
  isLandlineTelephone = (value: string) => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value)

  // 验证身份证号(1代,15位数字)
  isIDCardOld = (value: string) => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value)

  // 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
  isIDCardNew = (value: string) => /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value)

  // 验证身份证号, 支持1/2代(15位/18位数字)
  isIDCard = (value: string) => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value)

  // 验证护照（包含香港、澳门)
  isPassport = (value: string) => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value)

  // 验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
  isWebAccount = (value: string) => /^[a-zA-Z]\w{4,15}$/g.test(value)

  // 验证中文/汉字
  isChineseCharacter = (value: string) => /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(value)

  // 验证小数
  isDecimal = (value: string) => /^\d+\.\d+$/g.test(value)

  // 验证数字
  isNumber = (value: string) => /^\d{1,}$/g.test(value)

  // 验证qq号格式
  isQQNum = (value: string) => /^[1-9][0-9]{4,10}$/g.test(value)

  // 验证数字和字母组成
  isNumAndStr = (value: string) => /^[A-Za-z0-9]+$/g.test(value)

  // 验证英文字母
  isEnglish = (value: string) => /^[a-zA-Z]+$/g.test(value)

  // 验证大写英文字母
  isCapital = (value: string) => /^[A-Z]+$/g.test(value)

  // 验证小写英文字母
  isLowercase = (value: string) => /^[a-z]+$/g.test(value)
}
