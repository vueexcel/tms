import { make } from "vuex-pathify";
import axios from "axios";
// setup store
const state = {
  allJuniors: [],
  allweeklyReport: [],
  countToReviewReport: 0,
  revokeLoader: false,
  errorMessageDelete: ""
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  async getallWeeklyReport({ state }) {
    try {
      let res = await axios.get("/manager_weekly_all");
      state.allweeklyReport = res.data
      return true
    } catch (err) {
      if (err.response) {
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  async setWeeklyReportReview({ state, dispatch }, payload) {
    try {
      let payloadToSend = {
        rating: payload.rating,
        comment: payload.comment
      }
      let res = await axios.post(`/manager_weekly/${payload.id}`, payloadToSend);
      if (res) {
        dispatch('getallWeeklyReport')
        state.countToReviewReport--
        return true
      }
    } catch (err) {
      if (err.response) {
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  async getAllJuniors({ state }) {
    try {
      let response = await axios.get('/managers_juniors')
      state.allJuniors = response.data
      return true
    } catch (err) {
      if (err.response) {
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  async getManagersReview() {
    try {
      let response = await axios.get('/junior_review_response')
      return response.data
    } catch (err) {
      if (err.response) {
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  async juniorWeeklyReport() {
    try {
      let response = await axios.get('junior_weekly_report')
      return response.data
    } catch (err) {
      if (err.response) {
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  async deleteWeeklyReview({ state }, payload) {
    state.errorMessageDelete = ""
    try {
      await axios.delete(`/delete_manager_response/${payload._id}`)
      state.countToReviewReport++
      return true
    } catch (err) {
      if (err.response) {
        state.errorMessageDelete = err.response.data.msg
        return err.response.data.msg
      } else {
        return 'API Server Down'
      }
    }
  },
  setCountToReview({ state }, payload) {
    state.countToReviewReport = 0
    for (var i = 0; i < payload.reportArray.length; i++) {
      payload.reportArray[i].is_reviewed.find(manager => {
        if (manager._id === payload.user._id && manager.reviewed === false) {
          state.countToReviewReport++
        }
      })
    }
  },
  // eslint-disable-next-line
  async skipReportReview({ commit }, payload) {
    let payloadToSend = {
      selected : payload.selected,
      reason: payload.reason
    }
    try {
      let response = await axios.post(`/skip_review/${payload.weeklyId._id}`,payloadToSend)
      if (response) {
        return true
      }
    } catch (error) {
      if (error.response) {
        return error.response.data.msg
      } else {
        return 'Api Server down'
      }
    }
  },
  // eslint-disable-next-line
  async updateReportReview({}, payload) {
    let url = `manager_weekly/update/${payload.id}`
    let payloadToSend = {
      rating: payload.rating,
      comment: payload.comment
    }
    try {
      let response = await axios.put(url, payloadToSend)
      if (response.data.status === 'success') {
        return true
      } else {
        return 'Please review again'
      }
    } catch (error) {
      if (error.response) {
        return error.response.data.msg
      } else {
        return 'Api Server down'
      }
    }
  },
  // eslint-disable-next-line
  async revokeWeekly({ commit }, payload) {
    const id = payload._id
    const report = {
      user: payload.user,
      created_at: payload.created_at
    }
    // api call
    let response = await axios.put(`/weekly_revoked/${id}`, report)
    if (response) {
      // console.log(response);
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
