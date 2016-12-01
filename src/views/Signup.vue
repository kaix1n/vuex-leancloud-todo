<style style="stylus" scoped>
    .login-wrapper form {
        margin: 0 auto;
    }
</style>
<template>

<div class="login-wrapper">
    <form class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="Email" v-model="user.email" required/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="Name" v-model="user.username" required/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="password" class="form-control" placeholder="Password" v-model="user.password" required/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <button type="submit" class="btn btn-primary" @click.prevent="signup">Signup</button>
                <a @click="goLogin()">Login</a>

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
            signupAction: 'signupAction'
        }),
        signup: function(e) {
            var self = this
            self.user.successCB = function(msg) {
                self.$router.push({
                    name: 'default'
                })
            }
            self.user.failCB = function(err) {
                window.alert(err)
            }
            self.signupAction(self.user)
        },
        goLogin: function() {
            var self = this
            self.$router.replace({
                name: 'login'
            })
        }
    }
}

</script>
