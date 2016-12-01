/**
 * App intro
 * @author monopieces
 */

import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './vuex/store'

import 'bootstrap.css'
import './assets/css/reset.css'
import './assets/css/layout.css'
import './assets/css/media.css'
import './assets/css/common.css'
import './assets/css/font.css'
import './assets/css/app.css'

import utils from './assets/service/utils'

/**
 * @date 2016-11
 * @note register global utility filters.
 */
import './assets/service/globalService.js'

/**
 * attach filters
 */
import * as filters from './assets/service/appFilter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
    router,
    store,
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})

export { app, router, store, utils }
