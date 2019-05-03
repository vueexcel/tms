import { make } from 'vuex-pathify'
import axios from 'axios'

// setup store
const state = {}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getWeeklyReport({ state, commit }, payload) {
        let res = await axios.get('/manager_weekly')
        if (res) {
            return res
        }
    },
    async setWeeklyReportReview({ state, commit }, payload) {
        console.log(payload);
        let id = payload.id
        let res = await axios.post(`/manager_weekly/${id}`, payload)
    },
}
// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})