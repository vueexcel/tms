import { make } from "vuex-pathify";
import axios from "axios";

// setup store
const state = {
  allJuniors: [],
  countToReviewReport: 0
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
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
  },
  async getManagersReview({state}){
    try{
      let response = await axios.get('/junior_review_response')
      return response.data
    } catch(err){
      if(err.response){
        return err.response.data.msg
      } else {
          return 'API Server Down'
      }
    }
  },
  async juniorWeeklyReport({state}){
    try{
      let response = await axios.get('junior_weekly_report')
      return response.data
    } catch(err){
      if(err.response){
        return err.response.data.msg
      } else {
          return 'API Server Down'
      }
    }
  },
  async deleteWeeklyReview({state},payload){
    try{
      let response = await axios.delete(`/delete_manager_response/${payload._id}`)
      state.countToReviewReport--
      return true
    } catch(err){
      if(err.response){
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  setCountToReview({state},payload){
    state.countToReviewReport = 0
    for(var i=0;i<payload.reportArray.length;i++){
      payload.reportArray[i].is_reviewed.find(manager =>{
        if(manager._id === payload.user._id && manager.reviewed === false){
          state.countToReviewReport++
        }
      })
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
