import { make } from "vuex-pathify";
import axios from "axios";

// setup store
const state = {};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  async getWeeklyReport({ state, commit }, payload) {
    let res = await axios.get("/manager_weekly");
    if (res) {
      console.log(res);
      
      return res;
    }
  },
  async getallWeeklyReport({ state, commit }, payload) {
    let res = await axios.get("/manager_weekly_all");
    if (res) {
      return res;
    }
  },
  async setWeeklyReportReview({ state, commit }, payload) {
    let res = await axios.post(`/manager_weekly/${payload.id}`, payload);
    if(res) {
      return true
    }
  }
};
// create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
