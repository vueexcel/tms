import { make } from "vuex-pathify";
import axios from "axios";

// setup store
const state = {
  allJuniors: []
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  async getWeeklyReport({ state, commit }, payload) {
    let res = await axios.get("/manager_weekly");
    if (res) {
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
  },
  async getAllJuniors({state}){
    try {
      let response = await axios.get('/managers_juniors')
      state.allJuniors = response.data
      return true 
    } catch(err){
      if(err.response){
        return err.response.data.msg
      } else {
          return 'API Server Down'
      }
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
