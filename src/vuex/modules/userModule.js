/**
 * leanCloud vuex module
 * @author monopieces
 * @date 2016-10
 */

import {
    LOGIN,
    SIGNUP,
    LOGOUT,
    SET_CURRENT_USER
} from '../mutation-types'

const state = {
    user: {}
}

const mutations = {
    [SET_CURRENT_USER]: (state, result) => {
        if(result) {
            state.user = result.attributes
            state.user.id = result.id
        }
    }
}

const actions = {
    signupAction: function({ commit, store }, preload) {
        var user = new Lean.User()
        user.setUsername(preload.username)
        user.setPassword(preload.password)
        user.setEmail(preload.email)
        user.signUp()
            .then(function(loginedUser) {
                console.log('loginedUser:', loginedUser)
                commit(SET_CURRENT_USER, loginedUser)
                preload.successCB(loginedUser)
            }, function(err) {
                console.log('loginedError:' ,err)
                preload.failCB(err)
            })
    },
    // login
    loginAction: function({ dispatch, commit, store }, preload) {
        Lean.User
            .logIn(preload.username, preload.password)
            .then(function(loginedUser) {
                commit(SET_CURRENT_USER, loginedUser)
                preload.successCB(loginedUser)
            }, function(err) {
                console.log('loginedError:' ,err)
                preload.failCB(err)
            })
    },
    // logout
    logoutAction: function({dispatch, commit, store}, preload) {
        Lean.User.logOut()
    },
    // get current user
    getCurrentUserAction: function({commit, store}) {
        var currentUser = Lean.User.current()
        if(currentUser) {
            commit(SET_CURRENT_USER, currentUser)
        }
    }
}

export default {
    state,
    mutations,
    actions
}
