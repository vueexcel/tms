<template>
  <div>
    <span v-if="activeEmployee">
      <span v-for="(reviews,index) in activeEmployee.is_reviewed" :key="index">
        <span v-if="userProfile._id == reviews._id">
          <b-row class="pb-5">
            <b-col xs="12" sm="6" class="rounded-left first-box">
              <ExtraWorkFeedback :user="activeEmployee" :variant="'#9964e3 !important'"/>
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
                  :disableStar="reviews.reviewed"
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
                  :disableStar="reviews.reviewed"
                />
              <div sm="6">
                <h6 class="text-inverse">Comments</h6>
              </div>
              <b-form>
                <b-form-textarea
                  :rows="3"
                  :disabled="reviews.reviewed == true "
                  v-model="text"
                  id="default-textarea"
                  placeholder="Performance or general comments (if any)..."
                />
                <b-button
                  :disabled="reviews.reviewed == true"
                  class="btn btn-default btn-lg mb-xs bg-primary text-white mt-4"
                  @click="submit"
                >Submit</b-button>
                <b-button variant="danger" class=" btn-lg width-100 mb-xs mr-xs mt-4 float-right" :disabled="userProfile.role == 'admin'?true:false">Delete</b-button>
              </b-form>
            </b-col>
          </b-row>
        </span>
      </span>
    </span>
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
  computed: {
    userProfile: get("profile/user"),
    result(){      
    }

  },
  methods: {
    setWeeklyReportReview: call("weeklyReportReview/setWeeklyReportReview"),
    async submit() {
      await this.setWeeklyReportReview({
        difficulty: this.ratedStarDifficulty,
        rating: this.ratedStarWeekly,
        comment: this.text,
        id: this.activeEmployee._id
      }).then(res => {
        this.ratedStarWeekly = 1
        this.ratedStarDifficulty = 1
        this.text = ''
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
