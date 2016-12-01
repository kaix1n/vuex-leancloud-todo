<style>
.view {
    transition: all 1s ease;
}

.fadein-enter,
.fadein-leave {
    opacity: 0;
    transform: translate3d(10px, 0, 0);
}

[v-cloak] {
    display: none;
}
</style>

<template>
    <div id="app">
        <div class="main-wrapper">
            <Topmenu></Topmenu>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2  sidebar">
                        <project-list-nav></project-list-nav>
                    </div>
                    <div class="col-md-10 col-md-offset-2 main">
                        <transition name="fadein" mode="out-in">
                            <router-view class="view"></router-view>
                       </transition>
                    </div>

                </div>
            </div>
            <Scrolltop></Scrolltop>
            <Loading></Loading>
        </div>
    </div>
</template>

<script>

import projectListNav from './components/ProjectListNav'
import Topmenu from './components/Menu'
import Loading from './components/Loading'
import Scrolltop from './components/Scrolltop'
export default {
    name: 'app',
    components: {
        projectListNav,
        Topmenu,
        Loading,
        Scrolltop
    }
}
</script>
