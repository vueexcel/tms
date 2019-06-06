<template>
  <div xs="12" sm="6">
    <span v-if="user">
      <div class="mt-2">
        <div class="feedback pb-2 mt-4 pl-3">KPI</div>
        <!-- <div class="ml-3 pt-3" v-for="(highlight,index) in user.k_highlight" :key="index"> -->
        <!-- <div class="ml-3 pt-3">
          <div>
            <strong class="text-secondary">KPI/Era : &nbsp;</strong>
            <span>{{highlight.KpiEra}}</span>
            <span></span>
          </div>
          <div>
            <strong class="text-secondary">Highlight Work done in week : &nbsp;</strong>
            <span class="white-space-pre">{{highlight.description}}</span>
            <span class="white-space-pre"></span>
          </div>
          <br>
        </div> -->
      </div>
      <div class="mt-2">
        <div class="feedback pb-2 mt-4 pl-3">ERA</div>
        <!-- <h6 class="ml-3 pt-3">{{ user.extra }}</h6> -->
        <h6 class="ml-3 pt-3"></h6>
      </div>
      <!-- <div>
        <div class="feedback mt-4 pb-2 pl-3">Highlight Check-in</div>
        <span v-for="(reporthighlight, index) in user.select_days" :key="index">
        <span>
          <h6 class="ml-3 mt-3 white-space-pre">{{reporthighlight.report }}</h6>
          <h6 class="ml-3 mt-3 white-space-pre"></h6>
        </span>
      </div> -->
      <!-- <div>
        <div class="feedback mt-4 pb-2 pl-3">Project Difficulty Level</div>
        <div class="text-dark ml-3 mt-2" v-if="false">
          <starRating
            :variantWarning="false"
            class="border-bottom"
            :displayStar="5"
            :ratedStar="user.difficulty"
            :starSize="starSize"
            @starRatingSelected="submitStarRateDifficulty"
          />
        </div>
      </div> -->
      <!-- row -->
      <div class="form-group" v-if="false">
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
              >{{reportdata.report}}</b-tab>
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
  name: "userMonthlyReport",
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
  mounted() {
    // console.log(this.$props.user);
  },
  computed: {
    date() {
      if (this.$props.user) {
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

<style src="./UserMonthlyReport.scss" lang="scss" />
