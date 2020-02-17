<template>
  <div>
    <h1 class="page-title">View Junior's Weekly Report</h1>
    <Alert360 />
    <div v-if="error">
      <b-alert class="alert-transparent alert-danger" show>
        <span>{{errorMessage}}</span>
      </b-alert>
    </div>
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <div>Loading...</div>
    </div>
    <juniorsWeekly :juniorReport="juniorReport" />
  </div>
</template>

<script>
/*eslint-disable*/
import moment from "moment";
import { get, call } from "vuex-pathify";
import image from "./../../assets/avatar.png";
import Stars from "@/components/Star/Star.vue";
import Alert360 from "@/components/Alert360/alert360";
import juniorsWeekly from "@/components/JuniorsReport/JuniorsWeeklyReport"

export default {
  name: "Timeline",
  data() {
    return {
      image,
      juniorReport: [],
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  components: {
    Stars,
    Alert360
  },
  computed: {
    user: get("profile/user")
  },
  created() {
    this.getJuniorWeekReport();
  },
  methods: {
    juniorWeeklyReport_api: call("weeklyReportReview/juniorWeeklyReport"),
    async getJuniorWeekReport() {
      this.loading = true;
      let response = await this.juniorWeeklyReport_api();
      if (response.length && typeof response !== "string") {
        this.isReviewed(response);
        this.juniorReport = response;
      } else {
        this.error = true;
        if (typeof response === "string") {
          this.errorMessage = response;
        } else {
          this.errorMessage = "No Weekly report from you juiniors";
        }
      }
      this.loading = false;
    },
    isReviewed(reportArray) {
      for (var i = 0; i < reportArray.length; i++) {
        if (reportArray[i].is_reviewed) {
          var found = reportArray[i].is_reviewed.find(manager => {
            if (manager._id._id === this.user._id) {
              reportArray[i]["reviewedByUser"] = manager.reviewed;
            }
          });
        }
      }
      // this.juniorReport = reportArray;
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM DD YYYY [at] hh:mm a");
    },
    time: function(time) {
      return moment(time).format("hh:mm a");
    },
    day: function(day) {
      return moment(day).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "MMMM DD,YYYY",
        sameElse: "MMMM DD,YYYY"
      });
    }
  }
};
</script>

<style src="./../ViewCheckin/Timeline.scss" lang="scss" scoped />
