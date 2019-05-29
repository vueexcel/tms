<template>
  <div xs="12" sm="6">
    {{result}}
    <span v-if="user">
      <b-btn
        v-b-toggle="'collapse2'"
        class="m-1 mt-2 collapse-button h2"
        v-bind:style="{'color': variant }"
      >KPI/KRA</b-btn>
      <b-collapse id="collapse2">
        <b-container>
          <div class="mt-2">
            <span class="text-uppercase fw-semi-bold text-secondary">
              <span v-if="user.k_highlight.kra">{{user.k_highlight.kra}}</span>
              <span v-else>KPI/ERA Did not mentioned</span>
            </span>
          </div>
          <div class="border-top text-light"></div>
        </b-container>
      </b-collapse>
      <b-btn
        v-b-toggle="'collapse3'"
        class="m-1 collapse-button"
        v-bind:style="{'color': variant }"
      >Work done in Week</b-btn>
      <b-collapse id="collapse3">
        <b-container>
          <div class="mt-2">
            <span class="text-uppercase fw-semi-bold text-secondary">
              <span v-if="user.k_highlight.kpi">{{user.k_highlight.kpi}}</span>
              <span v-else>No Description mentioned</span>
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
          <h6 class="ml-3 mt-3 white-space-pre">{{reporthighlight.report }}</h6>
        </span>
      </div>
      <div>
        <div class="feedback mt-4 pb-2 pl-3">Project Difficulty Level</div>
        <div class="text-dark ml-3 mt-2">
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
      <!-- row -->
      <div class="form-group">
        <!-- col-md-4  -->
        <!-- <label class="control-label text-md-left">All Checkins</label> -->
        <!-- class="col-md-8" -->
        <div class="feedback mt-4 pb-2 pl-3">All weeks checkins</div>
        <div class="pt-2">
          <!-- ======= ACCORDION RIGHT =================-->
          <b-card no-body class="border-0">
            <b-tabs pills card vertical end class="border-0">
              {{date}}
              <b-tab
                v-for="(reportdata,index) in user.all_chekin.slice().reverse()"
                :key="index"
                :title="reportdata.day"
                class="border-0 white-space-pre pl-3 pr-3 pb-3 pt-0"
              >
                {{reportdata.report}}
                <!-- @click="pickDay(index,reportdata)" -->
                <!-- <b-card-text>{{reportdata.report}}</b-card-text> -->
              </b-tab>
            </b-tabs>
          </b-card>

          <!-- ======= ACCORDION RIGHT ENDS=================-->
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import { get } from "vuex-pathify";
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
    result() {},
    date() {
      if(this.$props.user){
        this.$props.user.all_chekin.forEach((v, i) => {
          v.day = this.$moment(v.created_at).format("dddd");
        });
      }
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
