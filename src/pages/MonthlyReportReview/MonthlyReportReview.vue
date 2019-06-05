<template>
  <div>
    <span class="page-title ml-3 row" style="font-size: 43px;">Monthly Report Review</span>
    <h5 class="page-title ml-3 row" style="font-size: 24px;">Team View</h5>
    <b-container class="no-gutters">
      <b-row class="row-altered">
        <!-- list of all employees -->
        <div class="members" v-for="employee in emp_arr" :key="employee.id">
          <MonthlyReviewComponent :employee="employee" @setActive="setActive" :activeId="activeId"/>
        </div>
        <!-- list of all employees ends -->
      </b-row>
    </b-container>
    <!-- left right boxes for user data & form -->
    <div class="container-fluid">
      <div class="mt-5 mb-3 row"></div>
      <transition name="fade">
        <!-- <PerformanceBox :activeId="activeId" v-if="show"/> -->
        <PerformanceBox v-if="show"/>
      </transition>
    </div>
    <!-- left right boxes for user data & form ends -->
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
      show: true
    };
  },
  mounted() {
    this.getallJuniors();
  },
  computed: {
    emp_arr: get("weeklyReportReview/allJuniors"),
    activeId: sync("monthlyReportReview/activeEmployee")
  },
  methods: {
    api_getallJuniors: call("weeklyReportReview/getAllJuniors"),
    api_getUsersMonthlyReports: call(
      "monthlyReportReview/getUsersMonthlyReports"
    ),
    getallJuniors() {
      this.api_getallJuniors().then(res => {
        if (res && this.emp_arr[0]) {
          this.activeId = this.emp_arr[0].id;
          this.getAllReports(); // calling all reports
        } else {
          alert(`sorry you don't have any junior`);
          this.$router.push("/app/monthlyReport");
        }
      });
    },
    getAllReports() {
      this.api_getUsersMonthlyReports();
    },
    setActive(emp) {
      console.log(emp);
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = emp.id;
    }
  }
};
</script>

<style src="./MonthlyReportReview.scss" lang="scss" scoped />
