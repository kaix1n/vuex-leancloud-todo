<style lang="scss">
    .project-nav {
        overflow: auto;
        .nav-sidebar li > a {
            // overflow: auto;
        }
        .btn-add {
            background: transparent;
            color: #b8c7ce;
            width: 100%;
            margin: 5px 0 10px;
        }
        .btn-add:hover {
            color: #3c8dbc;
            background: transparent;
        }
        .nav .operation {
            float: right;
        }
        .modal-container {
            width: 400px;
        }
        .glyphicon {
            color: #777;
        }

        .project-link {
            display: flex;
            justify-content: space-between;

            .name {
                flex: 3;
            }
            .action {
                flex: 1;
                display: flex;
                justify-content: space-around;
            }
            .action .trigger:hover {
                visibility: hidden;
            }
        }
    }
    .project-action {
        float: right;
        position: relative;

        .btn-trigger {

        }
        .popout {
            // visibility: visible;
            visibility: hidden;
        }
        &:hover .popout {
            visibility: visible;
        }
    }

</style>

<template>

<div class="project-nav">
    <button type="button" class="btn btn-default btn-add" @click="openDialog('add')">Add</button>

    <ul class="nav nav-sidebar">
        <li v-for="(proj, index) in projectList">
            <router-link :to="{ name: 'targetList', params: { projectId: proj.id }}" class="project-link">
                <div class="name hide-row">{{proj.name}}</div>
                <div class="action">
                    <span class="glyphicon glyphicon-edit" @click="openDialog('edit', proj)"></span>
                    <span class="glyphicon glyphicon-remove" @click="deleteProject(proj)"></span>
                </div>

                <!-- <div class="action">
                    <div class="trigger">－－－</div>
                    <div class="popup">
                        <div>Edit</div>
                        <div>Delete</div>
                    </div>
                </div> -->
            </router-link>
        </li>
    </ul>

    <Modal :show.sync="dialogModal.show" :class="dialogModal.css">
        <h4 slot="header">{{dialogModal.title[dialogModal.type]}}</h4>
        <div slot="body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-md-3 control-label">Name:</label>
                    <div class="col-md-8">
                        <input type="text" name="name" v-model="dialogData.name" class="form-control">
                    </div>
                </div>
            </form>
        </div>
        <div slot="footer">
            <div>
                <button type="button" class="btn btn-success" @click="saveProject(dialogModal.type)">Save</button>
                <button type="button" class="btn btn-danger" @click="close()">Cancel</button>
            </div>
        </div>
    </Modal>
</div>

</template>

<script>

import {
    mapState, mapActions
}
from 'vuex'
import Modal from './Modal'

export default {
    components: {
        Modal
    },
    data() {
        return {
            dialogModal: {
                css: 'detail-modal-container',
                show: false,
                type: 'banner',
                title: {
                    add: 'Add',
                    edit: 'Edit'
                }
            },
            dialogData: {
                projectId: '',
                name: ''
            }
        }
    },
    computed: {
        ...mapState({
            projectList: state => state.project.projectList,
            user: state => state.user.user
        })
    },
    watch: {
        'user': function() {
            var self = this
            self.getProjectListAction(self.user.id)
        }
    },
    methods: {
        ...mapActions({
                getProjectListAction: 'getProjectListAction',
                addProjectAction: 'addProjectAction',
                delProjectAction: 'delProjectAction',
                updateProjectAction: 'updateProjectAction'
            }),
            saveProject: function(type) {
                var self = this,
                    obj = Object.assign({}, self.dialogData, {
                        userId: self.user.id
                    })
                if (type === 'add') {
                    obj.startDate = new Date()
                    self.addProjectAction(obj).then(function(msg) {
                        self.close()
                    })
                } else {
                    self.updateProjectAction(obj).then(function(msg) {
                        self.close()
                    })
                }
            },
            deleteProject: function(proj) {
                var self = this,
                    obj = Object.assign({}, proj, {
                        isDel: 1,
                        userId: self.user.id
                    })
                self.updateProjectAction(obj)
            },
            editProject: function(proj) {
                var self = this
            },
            openDialog: function(type, proj) {
                var self = this
                    /**
                     * @date 2016-11
                     * @note {userId} is an Object id edit status, updateProjectAction get error
                     */
                proj ? (self.dialogData = Object.assign({}, proj)) : self.resetDialogData()
                self.dialogModal.type = type
                self.dialogModal.show = true
            },
            close: function() {
                var self = this
                self.dialogModal.show = false
            },
            resetDialogData: function() {
                var self = this
                self.dialogData = {
                    name: ''
                }
            }
    },
    mounted() {
        var self = this
        self.getProjectListAction(self.user.id)
    },
    beforeDestory() {
        var self = this
            // self.getProjectListAction(self.user.id)
    }
}

</script>
