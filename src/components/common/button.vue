<template>
    <button :type="type" :disabled="isLoading" class="btn" :class="[variant, width, size]" @click="callFunction($event)">
        <span v-if="!isLoading">{{text}}</span>
        <span v-if="isLoading">
            <i class="fa fa-circle-o-notch fa-spin"></i> Loading...
        </span>
    </button>
</template>

<script>
export default {
    data () {
        return {
            count: 0
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    methods:{
        callFunction (event) {
            if (this.type === 'button') {
                this.$emit('clickCall', true)
                event.preventDefault()
            }
        }
    }
}
</script>

<style>

</style>