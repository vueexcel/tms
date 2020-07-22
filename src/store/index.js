import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line
import pathify from "./pathify";
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
import settings from './modules/settings'
import peerreview from './modules/peerReview'
import notes from './modules/notes'

import layout from "./layout";

Vue.use(Vuex);

export const store = {
  // plugins: [pathify.plugin],
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
    review360,
    settings,
    peerreview,
    notes
  }
}

export default new Vuex.Store(store);