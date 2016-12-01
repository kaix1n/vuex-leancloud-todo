<style lang="scss">
    .sidebar-quicklink {

    }
</style>
<template>

<div class="navbar navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <!-- hide sidebar for @media-query -->
            <a class="sidebar-quicklink" @click="toggleNav()"><span></span></a>
            <a class="navbar-brand" href="/app">{{systemName}}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a>{{ user.username }}</a></li>
                <li><a @click="logout">Logout</a></li>
            </ul>
        </div>
    </div>
</div>

</template>

<script>
import appConfig from '../assets/config/appConfig'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            systemName: appConfig.systemName
        }
    },
    computed: {
        ...mapState({
            user: state=> state.user.user
        })
    },
    methods: {
        ...mapActions({
            logoutAction: 'logoutAction',
            getCurrentUserAction: 'getCurrentUserAction'
        }),
        logout: function(e) {
            var self = this
            self.logoutAction()
            self.$router.push({
                name: 'login'
            })
        },
        toggleNav: function() {
            var self = this,
                className = 'quicklink-mode',
                $sidebar = $('.sidebar'),
                $main = $('.main')
            if($sidebar.is('.' + className)) {
                $sidebar.removeClass(className)
                $main.removeClass(className)
            } else {
                $sidebar.addClass(className)
                $main.addClass(className)
            }
        }
    },
    beforeMount: function() {
        var self = this
        self.getCurrentUserAction()
    }
}

</script>
