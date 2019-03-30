<template>
  <div class="content p-0">
    <p>
      <img
        src="@/assets/people/a6.jpg"
        class="rounded-circle mr-2 mt-1 float-left"
        width="35"
        height="35"
        alt="..."
      >
      <span>
        <span class="text-primary fs-larger fw-semi-bold">{{ userName }}</span>
        <br>
        <span>{{ date_Time }}</span>
      </span>
    </p>
    <p class="pb-2">{{ report }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      require: true
    },
    userName: {
      type: String,
      require: true
    },
    date_Time: {
      type: String,
      require: true
    },
    userReport: {
      type: String,
      require: true
    },
    generatedReport: {
      type: String,
    },
    highlight:{
      type:String
    }
  },
  computed: {
    report() {
      if (this.$props.generatedReport)  {
        return this.$props.generatedReport + ' ' + this.$props.highlight;
      } else {
        return "Report Not Submitted";
      }
    }
  }
};
</script>

<style src="../Checkin.scss" lang="scss" scoped />
