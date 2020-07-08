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
                event.preventDefault()
            }
        }
    }
}
</script>

<style>

</style>