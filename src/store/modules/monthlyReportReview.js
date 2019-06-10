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
    // set notification count for side bar
    // async notificationCount({ state, dispatch, commit }) {
    //     state.reviewCount = 0
    //     // count total reports without any review
    //     let noreview = await state.employee.filter(ele => {
    //         if (!ele.review) {
    //             return ele;
    //         }
    //     })
    //     // count total report having reviews
    //     let reviews = await state.employee.filter(ele => {
    //         console.log(ele.review);
    //         if (ele.review.length) {
    //             // count total items having current managers comment/ review
    //             var managercomment = ele.review.filter(managercmt => {
    //                 if (managercmt.manager_id.username === profile.state.user.username) {
    //                     return managercmt
    //                 }
    //             })
    //             if (managercomment.length) {
    //                 state.reviewCount = 0
    //             } else {
    //                 console.log(managercomment);
    //                 state.reviewCount = 1
    //             }
    //         }
    //     })
    //     state.unreadMonthlyReport = noreview.length + state.reviewCount
    //     // state.unreadMonthlyReport = reviews.length - noreview.length
    // },
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