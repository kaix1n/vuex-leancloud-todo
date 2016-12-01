/**
 * Vuex store
 * @author monopieces
 * @date 2016-03
 * @update 2016-10
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

// import vuex
import mutations from './mutations'
import * as actions from './actions'

// import module
import project from './modules/projectModule'
import user from './modules/userModule'

// debug
import createLogger from '../debug/plugins/logger'


Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

const state = {
    isLoading: false,
    isBottom: false
}


export default new Vuex.Store({
    modules: {
        project,
        user
    },
    state,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
