<style media="screen">

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    /*border-radius: 2px;*/
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}
.modal-wrapper .panel-footer .btn {
    margin-left: 10px;
    margin-right: 10px;
}


/*
* the following styles are auto-applied to elements with
* v-transition="modal" when their visiblity is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter,
.modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

</style>

<template>
    <div class="modal-mask" v-show="show" transition="modal">
        <div class="modal-wrapper">

            <div class="panel panel-primary modal-container">
                <div class="panel-heading">
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
                    <slot name="header"></slot>
                </div>
                <div class="panel-body">
                    <slot name="body"></slot>
                </div>
                <div class="panel-footer text-center">
                    <slot name="footer"></slot>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    },
    methods: {
        /**
         * 关闭弹窗
         * @note 父级容器可能会重置数据
         * @author monopieces
         * @date 2016-07
         */
        close: function() {
            var self = this
            if(self.$parent.close) {
                self.$parent.close()
            } else {
                self.show = false
            }
        }
    }

}
</script>
