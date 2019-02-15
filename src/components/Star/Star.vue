<template>
    <div class="d-flex justify-content-between mb-lg">
        <div class="text-dark">
            <h2>
                <i class="fa fa-star mr-xs pointer" v-for="starKey in star_arr" :key="starKey" @click="rating(starKey)"  v-bind:class="{'text-warning' : starKey <= vote}"/>
            </h2>
        </div>
    </div>
</template>

<script>

export default {
    name: "starRating",
    data() {
        return{
            star_arr:[1,2,3,4,5],
            vote: 1    
        }
    },
    methods: {
        rating(value) {
            this.vote =  value
            this.$emit('starRating', value)
        }
    }

}
</script>

<style>

</style>
