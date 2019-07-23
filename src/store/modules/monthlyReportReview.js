import axios from './../axios'
import { make } from "vuex-pathify";
import profile from './profile'
const state = {
    activeEmployee: null,
    activeEmployeReport: null,
    setReportToReview: false,
    employeeToShowArray: [],
    employee: [],
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
            await dispatch('employeeToShow', state.setReportToReview)
            dispatch('setCountToReview')
            return res
        }
    },
    // set active employee report  
    setactiveEmp({ state, dispatch, commit }) {
        commit('activeEmployeReport', null)
        if (state.activeEmployee) {
            // if employee has report
            if(state.employee.length){
                state.employee.forEach(element => {
                    if (element.user.id === state.activeEmployee) {
                        commit('activeEmployeReport', element)
                    }
                });
            }
        }
    },
    // api for manager admin to post review
    async postMonthlyReview({ state, dispatch }, payload) {
        let errorResponse = {
            error:  false,
            res : null
        }
        try {
            let res = await axios.post(`/manager_monthly/${payload.id}`, { comment: payload.comment })
            dispatch('employeeToShow', true)
            errorResponse.res = res
            return errorResponse
            
            // if (state.setReportToReview === true) {
            //     console.log('999999999999999999999999999');
                
            // }
        } catch (error) {
            errorResponse.error = true
            if(error.response.status === 401 ){
                errorResponse.res = 'Please login again'
            }  else if (error.response.status === 403 || error.response.status === 400) {
                errorResponse.res = error.response.data.msg
            }
            else {
                errorResponse.res = 'Api Server down'
            }
            return errorResponse
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
    },
    employeeToShow({ commit, state, dispatch, rootState }, payload) {
        if (rootState.weeklyReportReview.allJuniors.length) {
            if (payload === false) {
                commit('activeEmployee', rootState.weeklyReportReview.allJuniors[0].id)
                dispatch('setactiveEmp')
                commit('employeeToShowArray', rootState.weeklyReportReview.allJuniors)
            } else {
                let aarayOfUser = []
                rootState.weeklyReportReview.allJuniors.forEach(employee => {
                    if (state.employee.length) {
                        state.employee.find(report => {
                            if (employee._id === report.user._id) {
                                report.is_reviewed.forEach(element => {
                                    if (element._id === rootState.profile.user._id) {
                                        if (element.reviewed === false) {
                                            aarayOfUser.push(employee);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
                if(aarayOfUser.length){
                    commit('activeEmployee', aarayOfUser[0].id)
                    dispatch('setactiveEmp')
                    commit('employeeToShowArray', aarayOfUser)
                } else {
                    commit('employeeToShowArray', aarayOfUser)
                }
            }
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