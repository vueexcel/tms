import Vue from "vue";
import Vuex from "vuex";
import pathify from "./pathify";
// import createPersistedState from "vuex-persistedstate";
import login from "./modules/login";
import checkin from "./modules/checkin";
import profile from "./modules/profile";
import weeklyReview from "./modules/weeklyReview";
import adminKPI from "./modules/adminKPI";
import manageEmployee from "./modules/manageEmployee";
import performanceReview from "./modules/performanceReview";
import allMember from './modules/allMembers'
import weeklyReportReview from './modules/weeklyReportReview'
import feedback from './modules/feedback'
import monthlyReport from './modules/monthlyReport'
import monthlyReportReview from './modules/monthlyReportReview'
import review360 from './modules/review360'

import layout from "./layout";

Vue.use(Vuex);
export default new Vuex.Store({
  // plugins: [createPersistedState(), pathify.plugin],
  modules: {
    layout,
    login,
    checkin,
    profile,
    weeklyReview,
    adminKPI,
    manageEmployee,
    performanceReview,
    allMember,
    weeklyReportReview,
    feedback,
    monthlyReport,
    monthlyReportReview,
    review360
  }
});