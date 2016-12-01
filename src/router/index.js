import Vue from 'vue'
import VueRouter from 'vue-router'

// init LeanCloud
import leanService from '../assets/service/leanService'
leanService.init()

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [{
        name: 'default',
        path: '/',
        component: require('../views/Welcome.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/:projectId',
        name: 'targetList',
        component: require('../views/TargetList.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/:projectId/:targetId',
        name: 'targetAction',
        component: require('../views/TargetAction.vue')
    },
    // login
    {
        name: 'login',
        path: '/login',
        component: require('../views/Login.vue')
    },
    // signup
    {
        name: 'signup',
        path: '/signup',
        component: require('../views/Signup.vue')
    },
    // 404
    {
        path: '*',
        component: require('../views/NotFound.vue'),
        meta: {
            requiresAuth: true
        }
    }]
})

router.beforeEach((to, from, next) => {
    // validate auth
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Lean.User.current()) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
