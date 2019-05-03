<template>
  <div>
    <b-breadcrumb class="ml-3">
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item class="active_class">Performance Review</b-breadcrumb-item>
    </b-breadcrumb>
    <span class="page-title ml-3 row" style="font-size: 43px;">Weekly Report Review</span>
    <div class="shadow pt-4">
      <h5 class="page-title ml-3 row" style="font-size: 24px;">Team View</h5>
      <b-container class="no-gutters">
        <b-row>
          <!-- <b-col xs="12" class="column" v-for="employee in emp_arr" :key="employee.id"> -->
          <b-col xs="12" class="column" v-for="employee in weeklyData" :key="employee._id">
            <WeeklyReviewComponent
              :employee="employee"
              @setActive="setActive"
              :activeId="activeId"
              :page="'Weekly'"
              :activeClass="activeClass"
            />
          </b-col>
        </b-row>
      </b-container>
      <div class="container-fluid">
        <div class="mt-5 mb-3 row">
          <span style="font-size: 24px;">{{activeEmp.post}}</span>
          <!-- <span style="font-size: 24px;">Hell</span> -->
        </div>
        <transition name="fade">
          <div v-if="weeklyData">
            <PerformanceBox :performanceData="weeklyData" v-if="show"/>
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
      activeId: 1,
      show: true,
      activeEmp: null,
      activeClass: {
        background_color: "fafbff",
        border: "c1ccd3"
      },
      weeklyData: null
    };
  },
  computed: {
    emp_arr: get("performanceReview/Employee_Array")
  },
  created() {
    this.activeEmp = this.emp_arr[0];
  },
  mounted() {
    this.fetchWeeklyReport();
    console.log(this.emp_arr);
  },
  methods: {
    getWeeklyReport_: call("weeklyReportReview/getWeeklyReport"),
    setActive(emp) {
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = emp.id;
      this.activeEmp = emp;
    },
    fetchWeeklyReport() {
      console.log("inside api");
      // this.loader = true;
      this.getWeeklyReport_()
        .then(resp => {
          this.weeklyData = resp.data;
          // console.log(resp);
        })
        .catch(err => {
          console.log(err);
          // this.loader = false;
          // this.loginfailed = true;
        });
    }
  }
};
</script>

<style src="./WeeklyReport.scss" lang="scss" scoped />
