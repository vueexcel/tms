<template>
  <div>
    <span class="page-title ml-3 row" style="font-size: 43px;">Monthly Report Review</span>
    <div class="col-12 d-flex">
      <span>Reports to be review</span>
      <input class="apple-switch form-control ml-2" v-model="setReportToReview" type="checkbox" />
    </div>
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
      <!-- <div v-if="getActiveEmp">{{getActiveEmp.user.name}}</div> -->
      <b-row class="row-altered">
        <!-- list of all employees -->
        <div class="members ml-5" v-for="employee in empToShow" :key="employee.id">
          <MonthlyReviewComponent
            :employee="employee"
            @setActive="setActive"
            :activeId="activeId"
            :employees="empToShow"
          />
        </div>
        <!-- list of all employees ends -->
      </b-row>
    </b-container>
    <!-- left right boxes for user data & form -->
    <div class="container-fluid" v-if="getActiveEmp && empToShow.length">
      <div class="mt-5 mb-3 row"></div>
      <transition name="fade">
        <!-- <PerformanceBox :activeId="activeId" v-if="show"/> -->
        <PerformanceBox v-if="show" :employees="empToShow"/>
      </transition>
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
// import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import MonthlyReviewComponent from "@/components/monthlyPerformanceReview/monthlyPerformanceReview";
import PerformanceBox from "@/components/monthlyPerformanceReview/monthlyPerformanceReview/PerformanceBox";
import { get, call, sync } from "vuex-pathify";

export default {
  name: "PerformanceReview",
  components: { MonthlyReviewComponent, PerformanceBox },
  data() {
    return {
      // activeId: "0",
      show: true,
      loading: false,
    };
  },
  mounted() {
    this.getallJuniors();
    this.employeeToShow(false)
  },
  computed: {
    setReportToReview:sync("monthlyReportReview/setReportToReview"),
    emp_arr: get("weeklyReportReview/allJuniors"),
    activeId: sync("monthlyReportReview/activeEmployee"),
    allReports: sync("monthlyReportReview/employee"),
    getActiveEmp: get("monthlyReportReview/activeEmployeReport"),
    userProfile: get("profile/user"),
    empToShow:sync('monthlyReportReview/employeeToShowArray'),
  },
  watch:{
    setReportToReview(newValue, oldValue){
      if(newValue === true){
        this.employeeToShow(true)
      } else {
        this.employeeToShow(false)
      }
    }

  },
  methods: {
    api_getallJuniors: call("weeklyReportReview/getAllJuniors"),
    employeeToShow: call('monthlyReportReview/employeeToShow'),
    api_activeEmp: call("monthlyReportReview/setactiveEmp"),
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
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      // this.activeId = emp.id;
      // console.log(this.getActiveEmp);
    }
  },
  beforeDestroy(){
    this.setReportToReview = false
  }
};
</script>

<style src="./MonthlyReportReview.scss" lang="scss" scoped />
