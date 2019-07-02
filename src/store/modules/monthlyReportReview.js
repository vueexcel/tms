import axios from './../axios'
import { make } from "vuex-pathify";
import profile from './profile'
const state = {
    activeEmployee: "",
    activeEmployeReport: null,
    employee: '',
    unreadMonthlyReport: 0,
    reviewCount: 0
}
const mutations = make.mutations(state)
const actions = {
    async getUsersMonthlyReports({ state, dispatch, commit }) {
        state.employee = ''
        let res = await axios.get('/manager_monthly_all')
        if (res) {
            state.employee = res.data
            await dispatch('setactiveEmp')
            dispatch('setCountToReview')
            return res
        }
    },
    // set active employee report  
    setactiveEmp({ state, dispatch, commit }) {
        commit('activeEmployeReport', null)
        if (state.activeEmployee) {
            // if employee has report
            state.employee.forEach(element => {
                if (element.user.id === state.activeEmployee) {
                    commit('activeEmployeReport', element)
                }
            });
        }
    },
    // api for manager admin to post review
    async postMonthlyReview({ state, commit }, payload) {
        let res = await axios.post(`/manager_monthly/${payload.id}`, { comment: payload.comment })
        if (res) {
            return res
        }
    },
    // delete api for managers/ admin
    async deleteMonthlyReview({ state, commit }, payload) {
        let id = payload.id
        let res = await axios.delete(`/delete_manager_monthly_response/${id}`)
        if (res) {
            return res
        }
    },
    setCountToReview({ state }) {
        state.unreadMonthlyReport = 0
        for (var i = 0; i < state.employee.length; i++) {
            state.employee[i].is_reviewed.find(manager => {                
                if (manager.username === profile.state.user.username && manager.reviewed === false) {
                    state.unreadMonthlyReport++
                }
            })
        }
    }
}
//create store
export default {
    namespaced: true,
    state,
    actions,
    mutations
}