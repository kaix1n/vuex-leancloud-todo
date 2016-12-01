/**
 * UtilService
 * @author monopieces
 * @date 2016-03
 */

'use strict'

export default {
    /**
     * 日期格式化
     */
    formatDate: function(date, fmt) {
        if (!date) {
            return ''
        }
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        return fmt
    },
    timestampFormatDate: function(timestamp, fmt) {
        var self = this,
            _t = timestamp
        if (!timestamp) return ''
        if (('' + timestamp).length === 10) {
            _t = +timestamp * 1000
        }
        return self.formatDate(new Date(+_t), fmt)
    },
    /**
     * 获取当前月份第一天日期
     * @return {String} 2016-03-01
     */
    getFirstDayOfMonth: function() {
        var self = this,
            today = new Date(),
            year = '' + today.getFullYear(),
            month = '' + (today.getMonth() + 1)
        month = month.length == 1 ? ('0' + month) : month
        return year + '-' + month + '-01'
    },
    /**
     * 获取 10 位 Unix 时间戳
     * @param  {Number} timestamp 
     * @return {Number} unix timestamp
     */
    getUnixTimestamp: function(timestamp) {
        if (timestamp) {
            timestamp *= (('' + timestamp).length === 10 ? 1000 : 1)
            return Math.floor(new Date(timestamp).valueOf() / 1000)
        } else {
            return Math.floor(new Date().valueOf() / 1000)
        }
    },
    /**
     * 获取 10 位 Unix 时间戳字符串
     * @param  {Number} timestamp 
     * @return {Number} unix timestamp
     */
    getUnixTimestampString: function(timestamp) {
        var self = this
        return self.getUnixTimestamp(timestamp).toString()
    },
    /**
     * 解析URL参数
     * @exmaple ?l=2c38354f613cdb82dc6929a230aa2ebd&ft_size=&site_id=123
     * @return {Object}
     *     {
     *        l: 2c38354f613cdb82dc6929a230aa2ebd,
     *        ft_size: 0,
     *        site_id: 123
     *     }
     */
    parseUrlParamToObject: function() {
        var search = document.location.search,
            searchIndex = search.indexOf('?'),
            paramList = searchIndex >= 0 ? search.substr(searchIndex + 1).split('&') : [],
            obj = {}

        if (paramList.length > 0) {
            for (var i = 0; i < paramList.length; i++) {
                var kv = paramList[i].split('=')
                obj[kv[0]] = kv[1]
            }
        }
        return obj

    }
}
