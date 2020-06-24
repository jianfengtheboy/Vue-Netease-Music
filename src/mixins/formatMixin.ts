/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-05-13 23:05:31
 * @LastEditTime: 2020-06-23 14:06:46
 * @Description: formatMixin
 */ 
export const formatMixin = {
	methods: {
		formatPlayCount (item: number) {
			return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` :  `${Math.ceil(item / 10000)}万`) : Math.floor(item)
		},
		formatName (item: string) {
			return item.replace(/\s/g, ' ')
		}
	}
}
