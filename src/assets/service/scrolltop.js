/**
 * Scrolltop
 * @author monopieces
 * @date 2016-03
 */

'use strict'
var $ = require('jquery')


import store from '../../vuex/store'
import * as types from '../../vuex/mutation-types'


var scrolltop = {
    init: function() {
        
        var innerHeight = 400;
        $(window).on('scroll', function() {
            var top = $(window).scrollTop()
            if (top > innerHeight) {
                store.commit(types.IS_BOTTOM, true)
            } else {
                store.commit(types.IS_BOTTOM, false)
            }
        });
    },
    off: function() {
        $(window).off('scroll');
    }
}
module.exports = scrolltop
