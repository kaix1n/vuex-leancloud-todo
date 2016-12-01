/**
 * LeanCloud Service
 * @type {Object}
 * @date 2016-10
 */

var leanService = {}
const CONFIG = {
    appId: 'FcfFkMPRGJIjxlhdHeubaP85-gzGzoHsz',
    appKey: '2x21HwxfVYj8nPe8x0GzauVn'
}

leanService.init = function() {
    var APP_ID = CONFIG.appId
    var APP_KEY = CONFIG.appKey
    Lean.init({
        appId: APP_ID,
        appKey: APP_KEY
    })
}

export default leanService
