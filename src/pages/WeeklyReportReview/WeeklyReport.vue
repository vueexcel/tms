<template>
  <div>
    <span class="page-title ml-3 row" style="font-size: 43px;">Weekly Report Review</span>
    <div class="shadow pt-4">
      <div class="w-100">
        <span class="page-title ml-3" style="font-size: 24px;">
          Team View
          <span class="fs-sm">
            <i class="pl-5 fa fa-circle" style="color: #006400"/> Report Available ( Border color )
          </span>
        </span>
        <i class="fas fa-circle-notch text-success fa-spin float-right mr-5 size" v-if="loading"></i>
      </div>
      <b-container class="no-gutters">
        <div v-if="!allweeklyData.length ">
          <b-alert
            :show="error"
            dismissible
            class="alert-transparent alert-danger mt-5"
          >{{errorMessage}}</b-alert>
        </div>
        <b-row class="employees" v-if="allJuniors_.length">
          <b-col lg="2"  md="4" xs="12"   class="column" v-for="employee in allJuniors_" :key="employee._id">
            <WeeklyReviewComponent
              :employee="employee"
              @setActive="setActive"
              :highlightEployeeArray="highlightEmployees"
              :activeId="activeId"
              :page="'Weekly'"
              :allemployee="allJuniors_"
              :allreport="allweeklyData"
              :activeClass="activeClass"
            />
          </b-col>
        </b-row>
      </b-container>
      <div class="container-fluid">
        <div class="mt-5 mb-3 row">
        </div>
        <div v-if="allweeklyData.length && allJuniors_.length">
          <PerformanceBox
            :performanceData="allweeklyData"
            :employee="activeEmp"
            @deleteReview="deleteReviewUser"
          />
          </div>
          <div v-if="!allweeklyData.length && !error" class="pb-5">
            <b-alert
            show
            dismissible
            class="alert-transparent alert-danger mt-5"
            >No Report</b-alert>
          </div>
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
      errorMessage: "",
      highlightEmployees: []
    };
  },
  mounted() {
    this.fetchallWeeklyReport();
    this.getAllJuniors();
  },
  computed: {
    allJuniors_: get("weeklyReportReview/allJuniors"),
    userProfile: get("profile/user"),
  },
  methods: {
    getallWeeklyReport_: call("weeklyReportReview/getallWeeklyReport"),
    getAllJuniors_:call("weeklyReportReview/getAllJuniors"),
    setCountToReview_: call("weeklyReportReview/setCountToReview"),
    deleteWeeklyReview_: call("weeklyReportReview/deleteWeeklyReview"),
    setActive(employee) {
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = employee._id;
      this.activeEmp = employee;
    },
    onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
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
            this.setActiveEmployeeReports(this.allweeklyData);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "There is some issue to getting result";
        });
    },
    async deleteReviewUser(report){
      let resp = await this.deleteWeeklyReview_(report)
      if(resp == true){
        this.fetchallWeeklyReport()
      }else {
        this.error = true;
        this.errorMessage = "There is some issue to getting result";
      }
    },
    setActiveEmployeeReports(array){
      array.forEach(data =>{
        for(var i = 0; i < this.allJuniors_.length ; i++){
          if(data.user === this.allJuniors_[i]._id){
            this.highlightEmployees.push(this.allJuniors_[i])
          }
        }
      })
      this.setCountToReview_({
        user:this.userProfile,
        reportArray: this.allweeklyData
      })
    },
    async getAllJuniors() {
      let response = await this.getAllJuniors_();
      if (response !== true) {
        this.loading = false;
        this.error = true;
        this.errorMessage = response;
      }
    }
  }
};
</script>

<style src="./WeeklyReport.scss" lang="scss" scoped />
