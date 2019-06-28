import { make } from "vuex-pathify";
import axios from "axios";
import router from './../../Routes'
// setup store
const state = {
  report: {},
  reviewedReport: []
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  async getReport({ commit, dispatch }) {
    let response = await axios.get("/week_checkin");
    // if (response) {
    //   commit('report', response.data)
    //   return true;
    // }
    if (response.data.length) {
      commit('report', response.data)
      return true;
    } else {
      dispatch('revoke_checkin').then(res => {
        if (res)
          return true
      })
    }
  },
  // fetch revoked reports
  async revoke_checkin({ commit }) {
    let response = await axios.get('/revoke_checkin');
    if (response) {
      commit('report', response.data)
      return true;
    }
  },
  async weeklyReview({ state, commit }, payload) {
    try {
      let response = await axios.post("/weekly", payload)
      if (response) {
        alert("weekly review submitted success");
        return true
      }
    } catch (err) {
      if (err.response) {
        return err.response
      } else {
        return 'Api Server Down'
      }
    }
  },
  async getReports({ state, commit }, ) {
    try {
      let response = await axios.get('/weekly')
      return response.data
    } catch (err) {
      if (err.response.status === 401) {
        router.push("/")
      } else if (err.response) {
        return err.response
      } else {
        return 'Api server down'
      }
    }
  },
  async deleteWeeklyReport({ state }, payload) {
    try {
      let response = await axios.delete(`/delete_weekly/${payload._id}`)
      if (response) {
        return true
      }
    } catch (err) {
      if (err.response) {
        return err.response
      } else {
        return 'Api server Down'
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
