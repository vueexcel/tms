import axios from './../axios'
import router from '../../Routes';
const state = {}
const actions = {
    async postReview({ state, dispatch, commit }, payload) {
        let res = await axios.post('/monthly', { report: payload })
        if (res) {
            return res
        }
    },
    async getReview({ state, commit }) {
        let res = await axios.get('/monthly')
        if (res) {
            return res
        }
    },
    async deleteReport({ state, commit }, payload) {
        const monthlyReportID = payload
        let res = await axios.delete(`/delete_monthly/${monthlyReportID}`)
        if (res) {
            return res
        }
    },
    // for managers & admin to fetch juniors monthly reports
    async getAllJuniorsMonthlyReport({ state, commit }) {
        let res = await axios.get(`/junior_monthly_report`)
        if (res) {
            return res
        }
    },
    // for employee, manager to fetch their submitted monthly report 
    async getViewMonthlyManagerReview({ state, commit }) {
        try {
            let res = await axios.get(`/manager_monthly_response`)
            if (res) {
                return res
            }
        } catch (error) {
            if (error.response.status === 401) {
                router.push("/")
            }
        }
    }
}
//create store
export default {
    namespaced: true,
    state,
    actions,
}