/**
 * 全局指令
 * @author monopieces
 * @date 2016-08
 */

import Vue  from 'vue'


Vue.directive('limit-number', {
    twoWay: true,
    bind: function() {
        this.handler = function(event) {
            var key = event.key,
                whiteList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Enter']
            if (whiteList.indexOf(event.key) < 0) {
                event.preventDefault()
            }
            // else if((event.metaKey || event.ctrlKey) && key.toUpperCase() == 'V') {
            //     // Ctrl + V console.log(event)
            //     // this.el.value = this.el.value.replace(/[^0-9]+/g, '')
            // }
        }.bind(this)

        this.el.addEventListener('keydown', this.handler)
    },
    unbind: function() {
        this.el.removeEventListener('keydown', this.handler)
    }
})
export default {}
