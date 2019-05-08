<template>
  <div>
    <b-row class="pb-5">
      <b-col xs="12" sm="6" class="rounded-left first-box">
        <!-- <ExtraWorkFeedback :data="data" :variant="'#9964e3 !important'"/> -->
        <ExtraWorkFeedback :data="activeEmployee" :variant="'#9964e3 !important'"/>
      </b-col>
      <b-col xs="12" sm="6" class="rounded-right">
        <b-alert
          show
          class="Alert-class"
        >Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
        <div class="mb-3">
          <h6 class="rating-header mb-2">Overall Rating</h6>
          <div class="border-top"></div>
          <div class="mt-2 font-weight">Based on Weekly Review</div>
        </div>
        <starRating
          class="border-bottom"
          :displayStar="5"
          :ratedStar="ratedStarWeekly"
          :starSize="starSize"
          @starRatingSelected="submitStarRateWeekly"
        />
        <div
          class="mt-2 font-weight"
        >Difficulty level of Project (if project work you did was difficult/required more effort)</div>
        <starRating
          class="border-bottom"
          :displayStar="5"
          :ratedStar="ratedStarDifficulty"
          :starSize="starSize"
          @starRatingSelected="submitStarRateDifficulty"
        />
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
          <b-button
            class="btn btn-default btn-lg mb-xs bg-primary text-white mt-4"
            @click="submit"
          >Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
import { get, call } from "vuex-pathify";

export default {
  name: "PerformanceBox",
  data() {
    return {
      text: "",
      ratedStarWeekly: 2,
      ratedStarDifficulty: 2,
      starSize: "20px",
      id: null
      // data: {
      //   widgetColor: "bg-warning rounded-left",
      //   kpi: [
      //     {
      //       heading: "First Human Colony on Mars",
      //       content:
      //         "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
      //     },
      //     {
      //       heading: "First Human Colony on Mars",
      //       content:
      //         "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
      //     }
      //   ],
      //   era: [
      //     {
      //       heading: "First Human Colony on Mars",
      //       content:
      //         "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
      //     },
      //     {
      //       heading: "First Human Colony on Mars",
      //       content:
      //         "First 700 people will take part in building first human settlement outside of earth.Thats awesome right"
      //     }
      //   ],
      //   extraWork: "Worked on Xspaces",
      //   highlightCheckin:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      // }
    };
  },
  components: {
    starRating,
    ExtraWorkFeedback
  },
  props: {
    activeEmployee: {
      type: Object
    }
  },
  methods: {
    setWeeklyReportReview: call("weeklyReportReview/setWeeklyReportReview"),
    submit() {
      // this.text, this.ratedStarWeekly, this.ratedStarDifficulty;
      this.$props.activeEmployee.forEach(element => {
        this.id = element._id;
      });
      this.setWeeklyReportReview({
        difficulty: this.ratedStarDifficulty,
        rating: this.ratedStarWeekly,
        comment: this.text,
        id: this.id
      });
    },
    submitStarRateWeekly(value) {
      this.ratedStarWeekly = value;
    },
    submitStarRateDifficulty(value) {
      this.ratedStarDifficulty = value;
    }
  }
};
</script>

<style src="./../WeeklyReview.scss" lang="scss">
</style>
