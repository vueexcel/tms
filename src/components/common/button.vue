<template>
    <button type="submit" :disabled="isLoading" class="btn btn-sm mt-4" :class="[variant, width]">
        <span v-if="!isLoading">{{text}}</span>
        <span v-if="isLoading">
            <i class="fa fa-circle-o-notch fa-spin"></i> Loading...
        </span>
    </button>
</template>

<script>
export default {
    props: ['text', 'isLoading', 'variant', 'width']
}
</script>

<style>

</style>