<template>
  <div class="content p-0">
    <p>
      <img
        class="rounded-circle mr-2 mt-1 float-left"
        src="@/assets/people/a6.jpg"
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
      type: Object,
      default: function() {
        return { message: "default" };
      }
    }
  },
  computed: {
    report() {
      console.log(this.$props.generatedReport, " < ======== >");

      if (this.$props.generatedReport.genReport) {
        return this.$props.generatedReport.genReport;
      } else {
        return "#report worked on singapp created login component installed vuex worked on HMG";
      }
    }
  }
};
</script>

<style src="../Checkin.scss" lang="scss" scoped />
