/**
 * leanCloud vuex module
 * @author monopieces
 * @date 2016-10
 */

import {
    ADD_PROJECT,
    DEL_PROJECT,
    UPDATE_PROJECT,
    GET_PROJECT_LIST,
    GET_PROJECT_BY_ID,
    ADD_TARGET,
    DEL_TARGET,
    UPDATE_TARGET,
    GET_TARGET_LIST,
    GET_TARGET_BY_ID,
    GET_TARGET_LIST_COUNT
} from '../mutation-types'

const state = {
    projectList:[],
    project: {},
    targetList: [],
    targetListCount: 0,
    target: {
        title: '',
        startDate: '',
        endDate: '',
        isDel: '',
        project: ''
    }
}

const mutations = {
    [GET_PROJECT_LIST]: (state, result) => {
        var list = []
        for(let i = 0; i < result.length; i++) {
            // combine id and attributes
            list.push(Object.assign({ id: result[i].id }, result[i].attributes))
        }
        state.projectList = list
    },
    [GET_PROJECT_BY_ID]: (state, result) => {
        state.project = result.attributes
        state.project.id = result.id
    },
    [GET_TARGET_LIST]: (state, result) => {
        var list = []
        for(let i = 0; i < result.length; i++) {
            list.push(Object.assign({ id: result[i].id }, result[i].attributes))
        }
        state.targetList = list
    },
    [GET_TARGET_BY_ID]: (state, result) => {
        state.target = result.attributes
        state.target.id = result.id
    },
    [GET_TARGET_LIST_COUNT]: (state, result) => {
        state.targetListCount = result
    }
}

const actions = {
    // get project by id
    getProjectByIdAction({commit, state}, preload) {
        var query = new Lean.Query('Project')
        var userId = Lean.Object.createWithoutData('_User', preload.userId)
        query.equalTo('objectId', preload.projectId)
        query.equalTo('userId', userId)
        query.first().then(function(result) {
            commit(GET_PROJECT_BY_ID, result)
        }, function(err) {
            console.log('!! getProjectByIdAction:', err)
        })
    },
    // get project list
    getProjectListAction({ commit, state }, userId) {
        if(!userId) return
        var userId = Lean.Object.createWithoutData('_User', userId)
        var query = new Lean.Query('Project')
        query.equalTo('userId', userId)
        query.equalTo('isDel', 0)
        query.find().then(function(result) {
            commit(GET_PROJECT_LIST, result)
        }, function(error) {
            console.log('!! getProjectListAction error:', error)
        })
    },
    // add project
    addProjectAction({ dispatch, commit, state }, preload) {
        // related _User
        var project = new Lean.Object('Project')
        var _userId = preload.userId
        var userId = Lean.Object.createWithoutData('_User', _userId)
        project.set('userId', userId)
        project.set('isDel', 0)
        delete preload.userId
        Object.keys(preload).forEach(function(key) {
            project.set(key, preload[key])
        })
        project.save().then(function (result) {
            return dispatch('getProjectListAction', _userId)
        }, function() {
            console.log('!! addProjectAction error')
        })
    },
    // update project
    updateProjectAction({ dispatch, commit, state }, preload) {
        var project = Lean.Object.createWithoutData('Project', preload.id)
        Object.keys(preload).forEach(function(key) {
            if(key !== 'user' && key !== 'userId') {
                project.set(key, preload[key])
            }
        })
        project.save().then(function() {
            return dispatch('getProjectListAction', preload.userId)
        }, function() {
            console.log('!! updateProjectAction error')
        })
    },
    // add target
    addTargetAction({dispatch, commit, state }, preload) {
        var target = new Lean.Object('Target')
        var projectId = Lean.Object.createWithoutData('Project', preload.projectId)
        var userId = Lean.Object.createWithoutData('_User', preload.userId)
        target.set('projectId', projectId)
        target.set('userId', userId)
        target.set('isDel', 0)
        delete preload.projectId
        delete preload.userId
        Object.keys(preload).forEach(function(key) {
            target.set(key, preload[key])
        })
        target.save().then(function (result) {
            return dispatch('getTargetByIdAction', result.id)
        })
    },
    // get target by id
    getTargetByIdAction({ commit, state }, targetId) {
        if(!targetId) return
        var query = new Lean.Query('Target')
        query.get(targetId).then(function(result) {
            commit(GET_TARGET_BY_ID, result)
        })
    },
    // get target from one project
    getTargetListAction({ commit, state }, preload) {
        var projectId = Lean.Object.createWithoutData('Project', preload.projectId)
        var userId = Lean.Object.createWithoutData('_User', preload.userId)
        var query = new Lean.Query('Target')
        query.equalTo('projectId', projectId)
        query.equalTo('userId', userId)
        query.equalTo('isDel', 0)
        query.ascending('isDone')
        if(preload.page && preload.size) {
            query.skip((preload.page - 1) * preload.size)
            query.limit(preload.size)
        }
        if(preload.keyword) {
            query.contains('title', preload.keyword)
        }
        query.find().then(function(result) {
            commit(GET_TARGET_LIST, result)
        }, function(error) {
            console.log('!! getTargetListAction error:', error)
        })
        // total count
        query.count().then(function(count) {
            if(count) {
                commit(GET_TARGET_LIST_COUNT, count)
            }
        })
    },
    // update target
    updateTargetAction: function({ dispatch, commit, store }, preload) {
        var target = Lean.Object.createWithoutData('Target', preload.id)
        Object.keys(preload).forEach(function(key) {
            if(key !== 'project' && key !== 'projectId' && key!== 'userId') {
                target.set(key, preload[key])
            }
        })
        target.save().then(function() {
            var obj = {
                projectId: preload.projectId,
                userId: preload.userId,
                size: preload.size,
                page: preload.page
            }
            return dispatch('getTargetListAction', obj)
        }, function() {
            console.log('!! updateTargetAction error')
        })
    }
}

export default {
    state,
    mutations,
    actions
}
