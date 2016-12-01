/**
 * 全局过滤器
 * @author monopieces
 * @date 2016-08
 */

import Vue  from 'vue'
import utils from './utils'

/**
 * 日期格式化
 * @param  {[Number} timestamp 10位时间戳（Unix）
 * @param  {String} fmt yyyy-MM-dd hh:mm:ss
 * @return {String}
 */
Vue.filter('fmt', function(timestamp, fmt) {
    return utils.timestampFormatDate(timestamp, fmt)
})
export default {}
