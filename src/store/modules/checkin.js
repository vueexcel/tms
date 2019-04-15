import {
    make
} from 'vuex-pathify'
import axios from 'axios'

// setup store

const state = {
    status: '',
    reason: false,
    reasonHighlight: false,
    // Text area
    genReport: '',
    genReportReason: '',
    highlightTask: '',
    highlightTaskReason: '',
    // getAllReports
    reports: []
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async dailyCheckin({ commit, dispatch }, payload) {
        await axios
            .post('/checkin', payload)
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
            })
    },
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})