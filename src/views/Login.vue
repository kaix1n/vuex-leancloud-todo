

<template>

<div class="login-wrapper">
    <!-- <h3>Admin</h3> -->
    <form class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="Username" v-model="user.username" required/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="password" class="form-control" placeholder="Password" v-model="user.password" required/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <button type="submit" class="btn btn-success" @click.prevent="login">Login</button>
                <a @click="goSignup()">Signup</a>
            </div>
        </div>
    </form>
</div>

</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                email: ''
            }
        }
    },
    methods: {
        ...mapActions({
            loginAction: 'loginAction'
        }),
        login: function(e) {
            var self = this
            self.user.successCB = function(msg) {
                self.$router.push({
                    name: 'default'
                })
            }
            self.user.failCB = function(err) {
                window.alert(err)
            }
            self.loginAction(self.user)
        },
        goSignup: function() {
            var self = this
            self.$router.replace({
                name: 'signup'
            })
        }
    }
}

</script>
