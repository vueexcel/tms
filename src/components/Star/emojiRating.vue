<template>
    <div class="justify-content-between">
    <div class="text-dark">
        <b-row class="text-center">
            <b-col v-bind:class="{ 'text-danger' : ratingValue === 3 || ratedStar === 3 }">
                <h1>
                    <i class="far fa-frown-open pointer" @click="rating(3)"></i>
                </h1>
                <strong>Bad</strong>
            </b-col>
            <b-col v-bind:class="{ 'text-info' : ratingValue === 5 || ratedStar === 5}">
                <h1>
                    <i class="far fa-meh pointer" @click="rating(5)"></i>        
                </h1>
                <strong>Neutral</strong>
            </b-col>
            <b-col v-bind:class="{ 'text-success' : ratingValue === 8 || ratedStar === 8}">
                <h1>
                    <i class="far fa-grin pointer" @click="rating(8)"></i>        
                </h1>
                <strong>Good</strong>
            </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emoticonRating',
  data () {
    return {
        ratingValue: null
    }
  },
  props: {
    ratedStar: {type: Number, default: 0},
    disableStar: { type: Boolean }
  },
  methods: {
      rating (value) {
        if (this.disableStar === false) {
            this.ratingValue = value
            this.$emit("starRatingSelected", value);
        }
      }
  }
}
</script>

<style>

</style>