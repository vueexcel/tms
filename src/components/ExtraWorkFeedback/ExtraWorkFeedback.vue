<template>
  <div xs="12" sm="6">
    {{result}}
    <!-- <span> -->
    <!-- @mouseover="activeCollapse" -->
    <!-- :class="{hover_variant : activeCollapse}" -->
    <span v-if="user">
      <b-btn
        v-b-toggle="'collapse2'"
        class="m-1 mt-2 collapse-button h2"
        v-bind:style="{'color': variant }"
      >KPI</b-btn>
      <b-collapse id="collapse2">
        <b-container>
          <div class="mt-2" v-for="(kpi,index) in user.k_highlight.kpi" :key="index">
            <span class="bold-text" v-for="(userkpi,index) in kpi" :key="index">
              <h6>{{index+1}}. {{userkpi}}</h6>
            </span>
          </div>
          <div class="border-top text-light"></div>
        </b-container>
      </b-collapse>
      <b-btn
        v-b-toggle="'collapse3'"
        class="m-1 collapse-button"
        v-bind:style="{'color': variant }"
      >ERA</b-btn>
      <b-collapse id="collapse3">
        <b-container>
          <div class="mt-2">
            <span class="bold-text">
              <h6>{{ user.k_highlight.kra }}</h6>
            </span>
          </div>
          <div class="border-top text-light"></div>
        </b-container>
      </b-collapse>
      <div class="mt-2">
        <div class="feedback pb-2 mt-4 pl-3">Extra work/ Feedback/ Issues</div>
        <h6 class="ml-3 pt-3">{{ user.extra }}</h6>
      </div>
      <div>
        <div class="feedback mt-4 pb-2 pl-3">Highlight Check-in</div>
        <span v-for="(reporthighlight, index) in user.select_days" :key="index">
          <h6 class="ml-3 mt-3">{{reporthighlight.report }}</h6>
        </span>
      </div>
      <div>
        <div class="feedback mt-4 pb-2 pl-3">Project Difficulty Level</div>
        <div class="text-dark ml-3 mb-5 mt-2">
          <starRating
            :variantWarning="false"
            class="border-bottom"
            :displayStar="5"
            :ratedStar="user.difficulty"
            :starSize="starSize"
            @starRatingSelected="submitStarRateDifficulty"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
export default {
  name: "ExtraWorkFeedback",
  components: {
    starRating
  },
  props: {
    user: {
      type: Object
    },
    variant: {
      type: String
    }
  },
  computed: {
    result() {
      console.log(this.user, "555555");
    }
  },
  data() {
    return {
      activeCollapse: false,
      starSize: "20px",
      ratedStarWeekly: 1,
      ratedStarDifficulty: 3
    };
  },
  methods: {
    submitStarRateWeekly(value) {
      this.ratedStarWeekly = value;
    },
    submitStarRateDifficulty(value) {
      this.ratedStarDifficulty = value;
    }
  }
};
</script>

<style src="./ExtraWorkFeedback.scss" lang="scss" />
