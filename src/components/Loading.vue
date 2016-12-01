<style>
.loading-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: transparent;
    width: 32px;
    height: 32px;
    overflow: hidden;
    margin-left: -16px;
    margin-top: -16px;
    z-index: 999999;
}
</style>

<template>

<div class="loading-wrapper" v-show="isLoading">
    <img src="../assets/img/loading.gif" alt="">
</div>

</template>

<script type="text/javascript">


import { mapState } from 'vuex'

export default {
    /**
     * @date 2016-10
     * @note bind vuex state
     */
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    }
}

</script>
