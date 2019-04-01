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
        let token = localStorage.getItem('authenticated') 
        await axios
            .post('http://5.9.144.226:8000/checkin', payload, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
            .then((res) => {
                dispatch('getAllCheckins',token)
            })
            .catch((err) => {
                console.log(err, 'daily checkin addition failed')
            })
    },

    async getAllCheckins({ state, commit }, payload) {
        let res = await axios
            .get('http://5.9.144.226:8000/reports', {
                headers: {
                    'Authorization': 'Bearer ' + payload
                },
            })
            .then((res) => {
                commit('reports', res.data)
            })
            .catch((err) => {
                console.log(err, 'get all checkins error code')
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