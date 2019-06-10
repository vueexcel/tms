import axios from './../axios'
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
    }
}
//create store
export default {
    namespaced: true,
    state,
    actions,
}