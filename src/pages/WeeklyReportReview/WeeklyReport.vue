<template>
  <div>
    <span class="page-title ml-3 row" style="font-size: 43px;">Weekly Report Review</span>
    <div class="shadow pt-4">
      <!-- <div class="w-100"> -->
      <h5 class="page-title ml-3 row" style="font-size: 24px;">Team View</h5>
      <i class="fas fa-circle-notch text-success fa-spin float-right mr-5 size" v-if="loading"></i>
      <!-- </div> -->
      <b-container class="no-gutters">
        <div v-if="weeklyData.length <1 && allweeklyData.length<1">
          <b-alert
            :show="error"
            dismissible
            class="alert-transparent alert-danger mt-5"
          >{{errorMessage}}</b-alert>
        </div>
        <b-row v-if="weeklyData.length">
          <b-col
            lg="2"
            md="4"
            xs="12"
            class="column"
            v-for="employee in weeklyData"
            :key="employee._id"
          >
            <WeeklyReviewComponent
              :employee="employee"
              @setActive="setActive"
              :activeId="activeId"
              :page="'Weekly'"
              :activeClass="activeClass"
              :allemployee="weeklyData"
            />
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col
            lg="2"
            md="4"
            xs="12"
            class="column"
            v-for="employee in allweeklyData"
            :key="employee._id"
          >
            <WeeklyReviewComponent
              :employee="employee"
              @setActive="setActive"
              :activeId="activeId"
              :page="'Weekly'"
              :allemployee="allweeklyData"
              :activeClass="activeClass"
            />
          </b-col>
        </b-row>
      </b-container>
      <div class="container-fluid">
        <div class="mt-5 mb-3 row">
          <!-- <span style="font-size: 24px;">{{activeEmp.post}}</span> -->
          <!-- <span style="font-size: 24px;">Hell</span> -->
        </div>
        <transition name="fade">
          <div v-if="weeklyData.length">
            <PerformanceBox :performanceData="weeklyData" :activeEmployee="activeEmp" v-if="show"/>
          </div>
          <div v-else>
            <PerformanceBox
              :performanceData="allweeklyData"
              :activeEmployee="activeEmp"
              v-if="show"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import WeeklyReviewComponent from "@/components/weeklyReviewComponent/WeeklyReview";
import PerformanceBox from "@/components/weeklyReviewComponent/WeeklyReview/WeeklyReviewBox";
import { get, call } from "vuex-pathify";

export default {
  name: "PerformanceReview",
  components: { WeeklyReviewComponent, PerformanceBox },
  data() {
    return {
      activeId: null,
      show: true,
      activeEmp: null,
      activeClass: {
        background_color: "fafbff",
        border: "c1ccd3"
      },
      weeklyData: [],
      allweeklyData: [],
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  mounted() {
    this.fetchWeeklyReport();
    this.fetchallWeeklyReport();
  },
  methods: {
    getWeeklyReport_: call("weeklyReportReview/getWeeklyReport"),
    getallWeeklyReport_: call("weeklyReportReview/getallWeeklyReport"),
    setActive(employee) {
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = employee._id;
      this.activeEmp = employee;
    },
    fetchWeeklyReport() {
      this.loading = true;
      this.getWeeklyReport_()
        .then(resp => {
          if (!resp.data.length) {
            this.error = true;
            this.errorMessage = "There is no data to review";
          } else {
            this.weeklyData = resp.data;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "There is some issue in fetching data";
        });
    },
    fetchallWeeklyReport() {
      this.loading = true;
      this.getallWeeklyReport_()
        .then(resp => {
          if (!resp.data.length) {
            this.error = true;
            this.errorMessage = "There is no data to review";
          } else {
            this.allweeklyData = resp.data;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "There is some issue to getting result";
        });
    }
  }
};
</script>

<style src="./WeeklyReport.scss" lang="scss" scoped />
