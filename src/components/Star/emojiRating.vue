<template>
    <div class="justify-content-between">
    <div class="text-dark">
        <b-row class="text-center">
            <b-col v-bind:class="{ 'text-danger' : ratedStar === 3 }">
                <h1>
                    <i class="far fa-frown-open pointer" id="bad" @click="rating(3)"></i>
                </h1>
                <strong>Bad</strong>
                <b-tooltip variant="danger" target="bad">3</b-tooltip>
            </b-col>
            <b-col v-bind:class="{ 'text-info' : ratedStar === 5}">
                <h1>
                    <i class="far fa-meh pointer" id="neutral" @click="rating(5)"></i>        
                </h1>
                <strong>Neutral</strong>
                <b-tooltip variant="info" target="neutral">5</b-tooltip>
            </b-col>
            <b-col v-bind:class="{ 'text-success' : ratedStar === 8}">
                <h1>
                    <i class="far fa-grin pointer" id="good" @click="rating(8)"></i>
                </h1>
                <strong>Good</strong>
                <b-tooltip variant="success" target="good">8</b-tooltip>        
            </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emoticonRating',
  props: {
    ratedStar: {type: Number, default: 0},
    disableStar: { type: Boolean }
  },
  methods: {
      rating (value) {
        if (this.disableStar === false) {
            this.$emit("starRatingSelected", value);
        }
      }
  }
}
</script>

<style>

</style>