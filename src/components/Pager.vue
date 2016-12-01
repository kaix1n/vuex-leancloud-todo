<style>

.page-wrapper {
    text-align: center;
}

.page-wrapper .pagination > li {
    position: relative;
}

.page-wrapper .info {
    background: transparent;
    min-width: 200px;
    color: #ccc;
}

</style>

<template>

<nav class="page-wrapper" v-show="pages.length > 0">
    <ul class="pagination">
        <li v-on:click="jump(1)">
            <a aria-label="First">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <li v-on:click="jump(current - 1)" :class="{ 'disabled': current == 1  }">
            <a aria-label="Previous">
                <span aria-hidden="true">&lsaquo;</span>
            </a>
        </li>

        <li v-for="i in pages" :class="{'active': i == current }" v-on:click="jump(i)"><a>{{i}}</a></li>

        <li v-on:click="jump(current + 1)" :class="{ 'disabled': current == last  }">
            <a aria-label="Next">
                <span aria-hidden="true">&rsaquo;</span>
            </a>
        </li>

        <li v-on:click="jump(last)">
            <a aria-label="Last">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    <div class="info">(共 {{last}} 页，共 {{total}} 条。)</div>
</nav>

</template>

<script type="text/javascript">

export default {
    computed: {
        pages: function() {
            var self = this;
            return self.initPages(self.current, self.total, self.size) || [];
        },
        last: function() {
            var self = this;
            return Math.ceil(self.total / self.size);
        }
    },
    props: {
        showInfo: Boolean,

            current: {
                type: Number,
                required: true
            },
            size: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }

    },
    methods: {
        initPages: function(current, total, size) {
            var self = this,
                pages = [],
                offset = 0,
                start = 1,
                end = -1,
                maxPages = 10;
            offset = self.last - self.current;

            if(self.last > 0 && self.last <= maxPages) {
                start = 1;
                end = self.last;
            } else if(self.last > maxPages){
                if (current <= maxPages) {
                    end = maxPages;
                    start = 1;
                } else if (current > maxPages) {
                    if (offset > 1) {
                        end = current + 1;
                        start = current - (maxPages - 2);
                    } else if (offset <= 1) {
                        end = self.last;
                        start = self.last - (maxPages - 1);
                    }
                }
            }

            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        jump: function(page) {
            var self = this;
            if (page >= 1 && page <= self.last) {
                self.$emit('jumpto',page);
            }
        }
    }
}

</script>
