<template>
    <div class="dialog-wrapper"
         :class="{'open':is_open}">
        <div class="overlay" @click="close"></div>
        <div class="dialog">
            <div class="heading">
                <slot name="heading"></slot>
            </div>
            <div class="dialog-body">
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<script>
    import "./dialog.less"
    export default {
        data () {
            return {
                is_open: false
            }
        },
        methods: {
            open() {
                this.is_open = true
                this.$emit('dialogopen')
            },
            close() {
                this.is_open = false
                this.$emit('dialogclose')
            }
        }
    }
</script>