<template>
  <div ref="messageDisplay">
    <b-row>
      <div class="col-md-8 col-12 size">
        <span class="page-title ml-3 row">Monthly Report Review</span>
      </div>
      <div class="col-md-4 col-12 month_parent mt-4">
        <div class="d-flex float-right">
          <span class="text-success font-weight-bold">Reports to be review</span>
          <input class="apple-switch form-control ml-2" v-model="setReportToReview" type="checkbox" />
        </div>
      </div>
    </b-row>
    <div class="w-100">
      <span class="page-title ml-3" style="font-size: 24px;">
        Team View
        <span class="fs-sm d-flex flex-column flex-wrap d-md-inline pl-3">
          <span>
            <i class="fa fa-circle text-info" /> Selected
          </span>
          <span>
            <i class="fa fa-circle" style="color: red" /> Report Available ( Border color )
          </span>
          <span>
            <i class="fa fa-circle" style="color: orange" /> Report Reviewed ( Border color )
          </span>
          <span>
            <i class="fa fa-circle" style="color: black" /> No Report ( Border color )
          </span>
        </span>
      </span>
      <i class="fas fa-circle-notch text-success fa-spin float-right mr-5 size" v-if="loading"></i>
    </div>
    <b-container class="no-gutters">
      <b-row class="row-altered">
        <!-- list of all employees -->

        <b-col
          lg="2"
          md="4"
          xs="12"
          class="column"
          v-for="(employee,index) in empToShow"
          :key="index"
        >
          <MonthlyReviewComponent
            :employee="employee"
            @setActive="setActive"
            :activeId="activeId"
            :employees="empToShow"
          />
        </b-col>

        <!-- list of all employees ends -->
      </b-row>
    </b-container>

    <!-- left right boxes for user data & form -->
    <div class="container-fluid" v-if="getActiveEmp && empToShow.length">
      <div class="mt-5 mb-3 row"></div>
      <!-- <transition name="fade"> -->
        <PerformanceBox  v-if="show" :employees="empToShow" />
        <!-- @moveToBottom="scrollToBottom()" -->
      <!-- </transition> -->
    </div>

    <!-- left right boxes for user data & form ends -->

    <div v-else>
      <p class="pl-3">
        <b-alert show class="alert-transparent alert-danger">No Report</b-alert>
      </p>
    </div>
  </div>
</template>

<script>
import MonthlyReviewComponent from "@/components/monthlyPerformanceReview/monthlyPerformanceReview";
import PerformanceBox from "@/components/monthlyPerformanceReview/monthlyPerformanceReview/PerformanceBox";
import { get, call, sync } from "vuex-pathify";
// import Alert360 from "@/components/Alert360/alert360";

export default {
  name: "PerformanceReview",
  components: { 
    MonthlyReviewComponent,
    PerformanceBox,
    // Alert360
  },
  data() {
    return {
      // activeId: "0",
      show: true,
      loading: false
    };
  },
  mounted() {
    this.getallJuniors();
    this.employeeToShow(false);
  },
  computed: {
    setReportToReview: sync("monthlyReportReview/setReportToReview"),
    emp_arr: get("weeklyReportReview/allJuniors"),
    activeId: sync("monthlyReportReview/activeEmployee"),
    allReports: sync("monthlyReportReview/employee"),
    getActiveEmp: get("monthlyReportReview/activeEmployeReport"),
    userProfile: get("profile/user"),
    empToShow: sync("monthlyReportReview/employeeToShowArray")
  },
  watch: {
    setReportToReview(newValue) {
      if (newValue === true) {
        this.employeeToShow(true);
      } else {
        this.employeeToShow(false);
      }
    }
  },
  methods: {
    api_getallJuniors: call("weeklyReportReview/getAllJuniors"),
    employeeToShow: call("monthlyReportReview/employeeToShow"),
    api_activeEmp: call("monthlyReportReview/setactiveEmp"),
    // scrollToBottom() {
    //   var messageDisplay = this.$refs.messageDisplay;
    //   messageDisplay.scrollTop = messageDisplay.scrollHeight;
    //   setTimeout(() => {
    //     window.scrollTo({
    //       top: messageDisplay.scrollHeight,
    //       left: 0,
    //       behavior: "smooth"
    //     });
    //   }, 500);
    // },
    api_getUsersMonthlyReports: call(
      "monthlyReportReview/getUsersMonthlyReports"
    ),
    getallJuniors() {
      this.api_getallJuniors().then(res => {
        if (res && this.emp_arr[0]) {
          this.activeId = this.emp_arr[0].id;
          this.getAllReports(); // calling all reports
        } else {
          // alert(`sorry you don't have any junior`);
          // this.$router.push("/app/monthlyReport");
        }
      });
    },
    getAllReports() {
      this.api_getUsersMonthlyReports();
    },
    setActive(emp) {
      this.activeId = emp.id;
      this.api_activeEmp(); // calling action monthlyReportReview
      // this.show = !this.show;
      // setTimeout(() => {
        this.show = true;
      // }, 100);
      // this.activeId = emp.id;
      // console.log(this.getActiveEmp);
    }
  },
  beforeDestroy() {
    this.setReportToReview = false;
  }
};
</script>

<style src="./MonthlyReportReview.scss" lang="scss" scoped />
