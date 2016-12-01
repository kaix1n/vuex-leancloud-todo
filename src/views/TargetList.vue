<style lang="scss" scoped>

.done {
    color: #808080;
    td:first-child {
        cursor: pointer;
    }
    td:nth-child(2) {
        text-decoration: line-through;
    }
}

</style>

<template>

<div class="wrapper">
    <div class="page-header">{{project.name}}
        <div class="operation-panel">
            <form class="form-inline" onSubmit="return false">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="keyword" placeholder="keyword" v-on:keyup.enter="getTargetList()">
                    <button type="button" class="btn btn-success" @click="getTargetList()">Search</button>
                    <button type="button" name="button" class="btn btn-primary" @click="goTargetAction()">Add New</button>
                </div>
            </form>
        </div>
    </div>

    <table class="table table-stripped table-bordered table-hover">
        <thead>
            <tr  draggable="true">
                <th class="col-md-1">#</th>
                <!-- <th>Id</th> -->
                <th class="col-md-4 hide-row">Title</th>
                <th class="col-md-2">Date</th>
                <th class="col-md-3">Description</th>
                <th class="col-md-2">Operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in targetList" :class="item.isDone ? 'done': ''" :key="item.id">
                <td @click="setTargetDone(index)">
                    <input type="checkbox" :checked="item.isDone" @change="setTargetDone(index)">
                </td>
                <!-- <td>{{item.id}}</td> -->
                <td>{{item.title}}</td>
                <td>{{item.date | fmt('yyyy-MM-dd')}}</td>
                <td>{{item.desc}}</td>
                <td>
                    <button class="btn btn-default" type="button" @click="goTargetAction(item.id)">Edit</button>
                    <button class="btn btn-default" type="button" @click="deleteTarget(index)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <Pager :current="pagerData.current" :size="pagerData.size" :total=" pagerCount" v-on:jumpto="jumpToEvent">
    </Pager>

</div>

</template>

<script>

import {
    mapState, mapActions
} from 'vuex'
import Pager from '../components/pager'

export default {
    components: {
        Pager
    },
    data: function() {
        return {
            addData: {
                title: '',
                desc: '',
                date: new Date()
            },
            editData: {
                title: '',
                desc: '',
                date: ''
            },
            pagerData: {
                size: 5,
                current: 1
            },
            keyword: ''
        }
    },
    computed: {
        ...mapState({
            project: state => state.project.project,
            targetList: state => state.project.targetList,
            target: state => state.project.target,
            user: state => state.user.user,
            pagerCount: state => {
                return state.project.targetListCount
            }
        })
    },
    watch: {
        '$route': function() {
            var self = this
            self.getTargetList()
            self.getProjectName()
        }
    },
    methods: {
        ...mapActions({
                getProjectByIdAction: 'getProjectByIdAction',
                addTargetAction: 'addTargetAction',
                updateTargetAction: 'updateTargetAction',
                getTargetListAction: 'getTargetListAction'
            }),
            goTargetAction: function(targetId) {
                var self = this
                self.$router.push({
                    name: 'targetAction',
                    params: {
                        projectId: self.$route.params.projectId,
                        targetId: targetId ? targetId : 'add',
                        userId: self.user.id
                    }
                })
            },
            addTarget: function() {
                var self = this,
                    obj = {
                        projectId: self.$route.params.projectId,
                        userId: self.user.id,
                        title: self.addData.title,
                        desc: self.addData.desc,
                        date: self.addData.date ? new Date(self.addData.date) : new Date()
                    }
                self.addTargetAction(obj)
            },
            updateTarget: function(renew) {
                var self = this,
                    obj = Object.assign(renew, {
                        projectId: self.$route.params.projectId,
                        date: new Date(renew.date)
                    })
                self.updateTargetAction(obj)
            },
            deleteTarget: function(index) {
                var self = this,
                    obj = Object.assign({}, self.targetList[index], {
                        projectId: self.$route.params.projectId,
                        userId: self.user.id,
                        page: 1,
                        size: self.pagerData.size
                    })
                obj.isDel = 1
                self.updateTargetAction(obj)
            },
            getTargetList: function() {
                var self = this
                if (self.$route.params.projectId) {
                    var obj = {
                        projectId: self.$route.params.projectId,
                        userId: self.user.id,
                        page: self.pagerData.current || 1,
                        size: self.pagerData.size
                    }
                    if (self.keyword) {
                        obj.keyword = self.keyword
                    }
                    self.getTargetListAction(obj)
                } else {
                    self.$route.push({
                        name: 'default'
                    })
                }
            },
            getProjectName: function() {
                var self = this,
                    obj = {
                        projectId: self.$route.params.projectId,
                        userId: self.user.id
                    }
                self.getProjectByIdAction(obj)
            },
            jumpToEvent: function(page) {
                var self = this
                self.pagerData.current = page
                self.getTargetList()
            },
            setTargetDone: function(index) {
                var self = this,
                    obj = Object.assign({}, self.targetList[index], {
                        projectId: self.$route.params.projectId,
                        userId: self.user.id,
                        page: self.pagerData.current,
                        size: self.pagerData.size
                    })
                obj.isDone = !obj.isDone
                self.updateTargetAction(obj)
            }
    },
    created() {
        var self = this
        self.getProjectName()
        self.getTargetList()
    }
}

</script>
