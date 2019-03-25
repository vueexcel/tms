<template>
  <div>
    <b-row class="shadow">
      <b-col xs="12" sm="6" class="bg-warning rounded-left">
        <ExtraWorkFeedback :data="data" :variant="'text-warning'"/>
      </b-col>
      <b-col xs="12" sm="6" class="rounded-right">
        <b-alert
          show
          dismissible
          class="alert-class mt-3"
        >Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
        <div class="mb-3">
          <h6 class="rating-header mb-2">Overall Rating</h6>
          <div class="border-top"></div>
          <div class="mt-2 font-weight">Based on Weekly Review</div>
        </div>
        <starRating :displayStar="5" :ratedStar="ratedStar" @starRatingSelected="submitStarRate"/>
        <div sm="6">
          <h6 class="text-inverse">Comments</h6>
        </div>
        <b-form>
          <b-form-textarea
            :rows="3"
            v-model="text"
            id="default-textarea"
            placeholder="Performance or general comments (if any)..."
          />
          <b-button variant="primary" class="width-100 mb-xs mr-xs mt-4" @click="submit">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
export default {
  name: "PerformanceBox",
  data() {
    return {
      text: "",
      ratedStar: 1,
      data: {
        widgetColor: "bg-warning rounded-left",
        kpi: [
          {
            heading: "First Human Colony on Mars",
            content:
              "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
          },
          {
            heading: "First Human Colony on Mars",
            content:
              "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
          }
        ],
        era: [
          {
            heading: "First Human Colony on Mars",
            content:
              "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
          },
          {
            heading: "First Human Colony on Mars",
            content:
              "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
          }
        ],
        extraWork: "Worked on Xspaces",
        highlightCheckin:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    };
  },
  components: {
    starRating: starRating,
    ExtraWorkFeedback: ExtraWorkFeedback
  },
  methods: {
    submit() {
      this.text = "";
      this.ratedStar = 1;
    },
    submitStarRate(value) {
      this.ratedStar = value;
    }
  }
};
</script>

<style src="./../monthlyPerformanceReview.scss" lang="scss">
</style>
