<template>
  <div>
    <b-row>
      <div class="col-md-8 col-12 size">
        <span class="page-title">Weekly Report Review</span>
      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex week_parent float-right mt-4">
          <span class="text-success font-weight-bold">Reports to be review</span>
          <input class="apple-switch form-control ml-2" v-model="setReportToReview" type="checkbox" />
        </div>
      </div>
    </b-row>
    <div class="shadow pt-4">
      <div class="w-100">
        <span class="page-title ml-3" style="font-size: 24px;">
          Team View
          <span class="fs-sm">
            <i class="pl-5 fa fa-circle text-info" /> Selected
            <!-- <i class="pl-1 fa fa-circle" style="color: #006400"/> Report Available ( Border color ) -->
            <i class="pl-1 fa fa-circle" style="color: red" /> Report Available ( Border color )
            <i class="pl-1 fa fa-circle" style="color: orange" /> Report Reviewed ( Border color )
            <i class="pl-1 fa fa-circle" style="color: black" /> No Report ( Border color )
          </span>
        </span>
        <i class="fas fa-circle-notch text-success fa-spin float-right mr-5 size" v-if="loading"></i>
      </div>
      <b-container class="no-gutters">
          <b-alert
            :show="error"
            dismissible
            class="alert-transparent alert-danger mt-5"
          >{{errorMessage}}</b-alert>
        <div v-if="!allweeklyReport_.length ">
        </div>
        <b-row class="employees" v-if="juniorsToShow.length">
          <b-col
            lg="2"
            md="4"
            xs="12"
            class="column"
            v-for="employee in juniorsToShow"
            :key="employee._id"
          >
            <WeeklyReviewComponent
              :employee="employee"
              @setActive="setActive"
              :highlightEployeeArray="highlightEmployees"
              :activeId="activeId"
              :page="'Weekly'"
              :allemployee="juniorsToShow"
              :allreport="allweeklyReport_"
              :activeClass="activeClass"
              :allData="allDataToComponent"
            />
          </b-col>
        </b-row>
      </b-container>
      <div class="container-fluid">
        <div class="mt-5 mb-3 row"></div>
        <div v-if="allweeklyReport_.length && juniorsToShow.length">
          <PerformanceBox
            :performanceData="allweeklyReport_"
            :employee="activeEmp"
            @deleteReview="deleteReviewUser"
            @update-highlight="updateHighlight"
            @skipReport="skipReportReview"
            @revoke="revoke"
          />
        </div>
        <div v-if="!allweeklyReport_.length && !error" class="pb-5">
          <b-alert show dismissible class="alert-transparent alert-danger mt-5">No Report</b-alert>
        </div>
      </div>
      <Toasts :rtl="true" class="toast" :time-out="25000"></Toasts>
    </div>
  </div>
</template>

<script>
// import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import WeeklyReviewComponent from "@/components/weeklyReviewComponent/WeeklyReview";
import PerformanceBox from "@/components/weeklyReviewComponent/WeeklyReview/WeeklyReviewBox";
import { get, call, sync } from "vuex-pathify";
import { setTimeout } from 'timers';

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
      loading: false,
      showTaost: false,
      setReportToReview: false,
      error: false,
      errorMessage: "",
      highlightEmployees: [],
      allDataToComponent: []
    };
  },
  mounted() {
    this.fetchallWeeklyReport();
    this.getAllJuniors();
  },
  computed: {
    allJuniors_: get("weeklyReportReview/allJuniors"),
    userProfile: get("profile/user"),
    allweeklyReport_: get("weeklyReportReview/allweeklyReport"),
    revokeLoader: sync("weeklyReportReview/revokeLoader"),
    juniorsToShow() {
      if (this.setReportToReview === true) {
      let arrayOfEmployee = [];
        this.allJuniors_.forEach(employee => {
          this.allweeklyReport_.forEach(report => {
            if (employee._id == report.user) {
              let response = report.is_reviewed.find(review => {
                return review._id === this.userProfile._id;
              });
              let isEmployeeExist = arrayOfEmployee.includes(employee)
              if(!isEmployeeExist){
                if (response.reviewed === false) arrayOfEmployee.push(employee);
              }
            }
          });
        });
        return arrayOfEmployee;
      } else {
        return this.allJuniors_;
      }
    }
  },
  methods: {
    getallWeeklyReport_: call("weeklyReportReview/getallWeeklyReport"),
    getAllJuniors_: call("weeklyReportReview/getAllJuniors"),
    setCountToReview_: call("weeklyReportReview/setCountToReview"),
    deleteWeeklyReview_: call("weeklyReportReview/deleteWeeklyReview"),
    // skipReportReview_: call("weeklyReportReview/skipReportReview"),
    api_revokeWeekly: call("weeklyReportReview/revokeWeekly"),
    updateHighlight(val) {
      this.fetchallWeeklyReport();
    },
    async skipReportReview(value) {
      if(value === true){
        this.$toast.success(`You have skipped the report successfully.`);
        this.fetchallWeeklyReport();
      }
    //  await this.skipReportReview_(value).then(response =>{
    //    if (response === true) {
    //    } else {
    //     this.error = true;
    //     this.errorMessage = response;
    //    }
    //   });
    },
    setActive(employee) {
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = employee._id;
      this.activeEmp = employee;
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    async fetchallWeeklyReport() {
      this.loading = true;
      let response = await this.getallWeeklyReport_();
      if (response !== true) {
        this.error = true;
        this.errorMessage = response;
      } else {
        this.setActiveEmployeeReports();
      }
      this.loading = false;
    },
    async deleteReviewUser(report) {
      let resp = await this.deleteWeeklyReview_(report);
      if (resp == true) {
        this.fetchallWeeklyReport();
      } else {
        this.error = true;
        this.errorMessage = "There is some issue to getting result";
      }
    },
    setActiveEmployeeReports() {
      this.allweeklyReport_.forEach(data => {
        for (var i = 0; i < this.juniorsToShow.length; i++) {
          if (data.user === this.juniorsToShow[i]._id) {
            this.highlightEmployees.push(this.juniorsToShow[i]);
          }
        }
      });
      this.setCountToReview_({
        user: this.userProfile,
        reportArray: this.allweeklyReport_
      });
    },
    async getAllJuniors() {
      let response = await this.getAllJuniors_();
      if (response !== true) {
        this.loading = false;
        this.error = true;
        this.errorMessage = response;
      }
    },
    revoke(report) {
      this.revokeLoader = true;
      this.api_revokeWeekly(report)
        .then(res => {
          console.log(res);
          this.fetchallWeeklyReport();
          this.revokeLoader = false;
        })
        .catch(err => {
          console.log(err.response);
          this.revokeLoader = false;
        });
    }
  }
};
</script>

<style src="./WeeklyReport.scss" lang="scss" scoped />
