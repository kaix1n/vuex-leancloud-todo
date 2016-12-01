<style>
.scroll-wrapper {
    position: fixed;
    bottom: -30px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
.scroll-wrapper.show {
    bottom: 20px;
}
.scroll-wrapper:before {
    content: "\e260";
    font-family: 'Glyphicons Halflings';
    -webkit-font-smoothing: antialiased;
}
</style>

<template>
    <div class="scroll-wrapper" v-bind:class="{ 'show': isBottom }" @click="scroll()"></div>
</template>

<script type="text/javascript">

import { mapState } from 'vuex'

import scrolltopService from '../assets/service/scrolltop'

export default {
    computed: {
        ...mapState({
            isBottom: state => state.isBottom
        })
    },
    methods: {
        scroll: function() {
            $('html,body').animate({
                scrollTop: 0
            }, 500)
        },
    },
    created: function() {
        scrolltopService.init()
    }
}

</script>
