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
          <div class="mt-2" v-for="(kpi,index) in user.kpi_json" :key="index">
            <span v-if="kpi.desc" class="text-uppercase fw-semi-bold text-secondary">{{ kpi.title }}</span>
            <p v-if="kpi.desc">{{ kpi.desc }}</p>
            <hr v-if="kpi.desc && user.kpi_json.length-1 !== index">
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
          <div class="mt-2" v-for="(era, index) in user.era_json" :key="index">
            <span
              class="text-uppercase fw-semi-bold text-secondary"
              v-if="era.title"
            >{{ era.title }}</span>
            <p v-if="era.desc">{{ era.desc }}</p>
            <hr v-if="era.desc && user.era_json.length-1 !== index">
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
          <h6 class="ml-3 mt-3 white-space-pre ">{{reporthighlight.report }}</h6>
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
    result() {}
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
