/**
 * Vuex mutations
 * @author monopieces
 * @date 2016-03
 */
'use strict'

import * as types from './mutation-types'
import scrolltop from '../assets/service/scrolltop'

export default {
    /**
     * ajax waiting
     */
    [types.IS_LOADING](state, val) {
        state.isLoading = val
    },
    /**
     * if page is bottom
     */
    [types.IS_BOTTOM](state, val) {
        state.isBottom = val
    }
}
