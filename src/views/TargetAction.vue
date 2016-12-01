<style lang="stylus">
    .target-action {
        .form .form-group {
            overflow: hidden;
        }
        .form .form-group.text-center .btn {
            margin-left: 10px;
            margin-right: 10px;
        }
    }

</style>
<template>

    <div class="wrapper target-action">
        <h3 class="page-header">{{$route.params.targetId == 'add'? '添加': '编辑'}}</h3>
        <form class="form form-horiziontal col-md-8">
            <div class="form-group">
                <label class="control-label col-md-2 text-right">Title</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="targetData.title">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2 text-right">Date</label>
                <div class="col-md-9">
                    <input type="date" class="form-control" v-model="targetData.date">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2 text-right">Desc</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="targetData.desc">
                </div>
            </div>
            <div class="form-group text-center">
                <button type="button" name="button" class="btn btn-primary" @click="saveTarget()">Save</button>
                <button type="button" name="button" class="btn btn-danger" @click="goProject()">Cancel</button>
            </div>
        </form>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            targetData: {
                title: '',
                desc: '',
                date: (new Date()).Format('yyyy-MM-dd')
            }
        }
    },
    computed: {
        ...mapState({
            target: (state) => state.project.target,
            user: state => state.user.user
        })
    },
    watch: {
        'target': function(newVal, oldVal) {
            var self = this

            Vue.set(self, 'targetData', Object.assign({}, newVal, {
                date: new Date(newVal.date.toString()).Format('yyyy-MM-dd')
            }))
        }
    },
    methods: {
        ...mapActions({
            getTargetByIdAction: 'getTargetByIdAction',
            addTargetAction: 'addTargetAction',
            updateTargetAction: 'updateTargetAction'
        }),
        saveTarget: function() {
            var self = this
            if(self.$route.params.targetId && self.$route.params.targetId !== 'add') {
                self.updateTarget()
            } else {
                self.addTarget()
            }
        },
        addTarget: function() {
            var self = this,
                obj = {
                    projectId: self.$route.params.projectId,
                    title: self.targetData.title,
                    desc: self.targetData.desc,
                    date: self.targetData.date ? new Date(self.targetData.date): new Date(),
                    userId: self.user.id
                }
            self.addTargetAction(obj)
                .then(function() {
                    self.goProject()
                })
        },
        updateTarget: function(renew) {
            var self = this,
                obj = Object.assign(self.targetData, {
                    id: self.$route.params.targetId,
                    projectId: self.$route.params.projectId,
                    userId: self.user.id
                })
                obj.date = obj.date ? new Date(obj.date) : new Date()
                self.updateTargetAction(obj)
                    .then(function() {
                        self.goProject()
                    })
        },
        deleteTarget: function(index) {
            var self = this,
                obj = Object.assign({}, self.targetList[index], {
                    projectId: self.$route.params.projectId,
                    userId: self.user.id,
                    isDel: 1
                })
                self.updateTargetAction(obj)
        },
        getTargetById: function() {
            var self = this
            if(self.$route.params.targetId) {
                if(self.$route.params.targetId === 'add') {
                } else {
                    self.getTargetByIdAction(self.$route.params.targetId)
                }
            } else {
                self.goProject()
            }
        },
        goProject: function() {
            var self = this
            self.$router.push({
                name: 'targetList',
                params: {
                    projectId: self.$route.params.projectId
                }
            })
        }
    },
    created() {
        var self = this
        self.getTargetById()
    }
}

</script>
