import {
    make
} from 'vuex-pathify'
import axios from 'axios'
import router from './../../Routes'

// setup store

const state = {
    status: ``,
    reason: false,
    // Text area
    genReport: ``,
    genReportReason: ``,
    highlightTask: ``,
    changeSelectOption: null,
    // getAllReports
    reports: []
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async dailyCheckin({ commit, dispatch }, payload) {
        const checkDate = payload.date
        let res = await axios.post('/checkin', payload)
        return { res: res, date: checkDate }
    },
    async deleteDailyCheckin({ commit, dispatch }, payload) {
        await axios
            .delete(`/delete/${payload}`)
            .then((res) => {
                dispatch('getAllCheckins')
            })
            .catch((err) => {
            })
    },

    async getAllCheckins({ state, commit }) {
        let res = await axios
            .get('/reports')
            .then((res) => {

                commit('reports', res.data)
            })
            .catch((err) => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    router.push("/")
                }
            })
    },
    async getAllSlackChannels({ state, commit }) {
        try {
            let response = await axios.get('/slack')
            return response.data
        } catch (err) {
            if (err.response) {
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
        }

    },
    async juniorCheckin() {
        let res = await axios.get('/juniors_chechkin')
        return res
    }
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})