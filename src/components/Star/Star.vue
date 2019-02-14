<template>
    <div class="d-flex justify-content-between mb-lg">
            <div class="text-dark">
                <h2>
                    <i class="fa fa-star mr-xs pointer" v-for="starKey in star_arr" :key="starKey" @click="rating(starKey)"  v-bind:class="{'text-warning' : starKey <= vote}"/>
                </h2>
            </div>
        <!-- <span class="text-muted"><small>{{vote.vote}}</small></span> -->
    </div>
</template>

<script>
// import { get, call } from "vuex-pathify";

export default {
    name: "starRating",
    data() {
        return{
            star_arr:[1,2,3,4,5],
            vote: 1    
        }
    },
    computed: {
        // star_arr: get("star/star"),
        // vote: get('star/vote')
    },
    methods: {
        // giveRating: call("star/giveRating"),
        rating(value) {
            this.vote =  value
        }
    }

}
</script>

<style>

</style>
