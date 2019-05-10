<template>
  <div>
    <span class="page-title ml-3 row" style="font-size: 43px;">Monthly Manager Review</span>
    <h5 class="page-title ml-3 row" style="font-size: 24px;">Team View</h5>
    <b-container class="no-gutters">
      <b-row class="row-altered">
        <div class="members" v-for="employee in emp_arr" :key="employee.id">
          <MonthlyPerformanceReviewComponent
            :employee="employee"
            @setActive="setActive"
            :activeId="activeId"
          />
        </div>
      </b-row>
    </b-container>
    <div class="container-fluid">
      <div class="mt-5 mb-3 row">
        <span style="font-size: 24px;">Business Development Executives</span>
      </div>
      <transition name="fade">
        <PerformanceBox :activeId="activeId" v-if="show"/>
      </transition>
    </div>
  </div>
</template>

<script>
// import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import MonthlyPerformanceReviewComponent from "@/components/monthlyPerformanceReview/monthlyPerformanceReview";
import PerformanceBox from "@/components/monthlyPerformanceReview/monthlyPerformanceReview/PerformanceBox";
import { get, call } from "vuex-pathify";

export default {
  name: "PerformanceReview",
  components: { MonthlyPerformanceReviewComponent, PerformanceBox },
  data() {
    return {
      activeId: 0,
      show: true
    };
  },
  computed: {
    emp_arr: get("performanceReview/Employee_Array")
  },
  methods: {
    setActive(emp) {
      this.show = !this.show;
      setTimeout(() => {
        this.show = true;
      }, 500);
      this.activeId = emp.id;
    }
  }
};
</script>

<style src="./MonthlyPerformanceReview.scss" lang="scss" scoped />
