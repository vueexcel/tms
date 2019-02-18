<template>
    <div class="d-flex justify-content-between mb-lg">
        <div class="text-dark">
            <h2>
                <i class="far fa-star text-warning mr-xs pointer" 
                v-for="starKey in star_arr" :key="starKey" 
                @click="rating(starKey)"
                v-bind:class="{ 'fa' : starKey <=  vote}"
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
            star_arr:[1,2,3,4,5,6,7,8,9,10],
            vote: 1
        }
    },
    created(){
        this.rating(1)
    },
    methods: {
        rating(value) {
            this.vote =  value
        },
        submit() {
            this.vote = 1
        }
    }

}
</script>

<style>

</style>
