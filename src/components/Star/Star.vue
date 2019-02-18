<template>
    <div class="d-flex justify-content-between mb-lg">
        <div class="text-dark">
            <h2>
                <i class="far fa-star text-warning mr-xs pointer" 
                v-for="starKey in displayStar" :key="starKey" 
                @click="rating(starKey)"
                v-bind:class="{ 'fa' : starKey <=  starRate}"
                />
            </h2>
        </div>
    </div>
</template>

<script>

export default {
    name: "starRating",
    data() {
        return{
            starRate: 1
        }
    },
    props: {
        displayStar:{ type: Array, default: [1,2,3,4,5]},
        ratedStar: {type: Number, default: 1}
    },
    watch:{
        ratedStar: function(newVal, oldVal) { // watch it
            this.starRate = newVal
        }
    },
    created(){
        this.rating(1)
    },
    methods: {
        rating(value) {
            this.starRate =  value
            this.$emit('submitStarRate', this.starRate)
        }
    }

}
</script>

<style>

</style>
