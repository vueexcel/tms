<template>
  <div class="d-flex justify-content-between">
    <div class="text-dark" data-testid="star">
      <h2>
        <i
          class="far fa-star mr-xs pointer"
          v-for="starKey in displayStar"
          :key="starKey"
          @click="rating(starKey)"
          v-bind:class="{ 'fa' : starKey <=  ratedStar ,'text-warning' : true === variantWarning }"
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
    ratedStar: { type: Number, default: 0 },
    starSize: { type: String },
    variantWarning: { type: Boolean, default: true },
    disableStar: { type: Boolean }
  },
  methods: {
    rating(value) {
      if (this.disableStar === false) {
        this.$emit("starRatingSelected", value);
      }
    }
  }
};
</script>

<style>
</style>
