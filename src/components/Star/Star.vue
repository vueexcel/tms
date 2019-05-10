<template>
  <div class="d-flex justify-content-between mb-lg pb-2">
    <div class="text-dark">
      <h2>
        <i
          :disable="forDaisable === true ? true : false"
          class="far fa-star text-warning mr-xs pointer"
          v-for="starKey in displayStar"
          :key="starKey"
          @click="rating(starKey)"
          v-bind:class="{ 'fa' : starKey <=  ratedStar && forDaisable === false}"
          :style="{'font-size' : `${starSize}`}"
        />
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "starRating",
  props: {
    displayStar: { type: Number, default: 5 },
    ratedStar: { type: Number, default: 1 },
    starSize: { type: String },
    forDaisable: { type: Boolean }
  },
  created() {
    this.rating(1);
  },
  methods: {
    rating(value) {
      this.$emit("starRatingSelected", value);
    }
  }
};
</script>

<style>
</style>
