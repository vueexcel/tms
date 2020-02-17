<template>
  <div>
    <h1 class="page-title">View Junior's Monthly Report</h1>
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
      <juniorsReport :juniorReport="juniorReport" />
  </div>
</template>

<script>
/*eslint-disable*/
import moment from "moment";
import { get, call } from "vuex-pathify";
import image from "./../../assets/avatar.png";
import Stars from "@/components/Star/Star.vue";
import Alert360 from "@/components/Alert360/alert360";
import juniorsReport from "@/components/JuniorsReport/JuniorsMonthlyReport";

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
    Alert360,
    juniorsReport
  },
  computed: {
    user: get("profile/user")
  },
  created() {
    this.getJuniorMonthlyReport();
  },
  methods: {
    // juniorWeeklyReport_api: call("weeklyReportReview/juniorWeeklyReport"),
    api_juniorMonthlyReport: call("monthlyReport/getAllJuniorsMonthlyReport"),
    async getJuniorMonthlyReport() {
      this.loading = true;
      let response = await this.api_juniorMonthlyReport()
        .then(res => {
          this.juniorReport = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.loading = false;
    }
  }
};
</script>

<style src="./../ViewCheckin/Timeline.scss" lang="scss" scoped />
