import {
    make
} from 'vuex-pathify'
import axios from 'axios'

// setup store
axios.defaults.headers.common = {
    "Authorization": 'Bearer ' + localStorage.getItem('authenticated'),
};


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
            .post(process.env.VUE_APP_ROOT_API+'/checkin', payload)
            .then((res) => {
                dispatch('getAllCheckins')
            })
            .catch((err) => {
            })
    },

    async getAllCheckins({ state, commit }) {
        let res = await axios
            .get(process.env.VUE_APP_ROOT_API+'/reports')
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