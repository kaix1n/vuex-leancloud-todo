/**
 * Global service
 * @return {Function}
 */
(function() {
    'use strict'

    /**
     * Object.assign polyfill ES2015
     * @param  {Object}
     * @return {Object}
     * @date   2016-07-05
     */
    if (typeof Object.assign != 'function') {
        Object.assign = function(target) {
            'use strict'
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object')
            }
            target = Object(target)
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index]
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key]
                        }
                    }
                }
            }
            return target
        }
    }

    /**
     * Datetime.Format('fmt')
     * @param  {String} fmt 'yyyy-MM-dd hh:mm:ss'
     * @return {String}
     */
    Date.prototype.Format = function(fmt) {
        var o = {
            'M+': this.getMonth() + 1, //月份
            'd+': this.getDate(), //日
            'h+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return fmt;
    }

})()
