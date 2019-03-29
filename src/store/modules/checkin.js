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
    async dailyCheckin({ state, commit }, payload) {
        let res = await axios
            .post('http://5.9.144.226:8000/checkin', payload, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authenticated')
                },
            })
            .then((res) => {
                console.log(res, 'daily checkin added success')
                alert('data submitted success')
            })
            .catch((err) => {
                console.log(err, 'daily checkin addition failed')
            })
    },

    async getAllCheckins({ state, commit }, payload) {
        let res = await axios
            .get('http://5.9.144.226:8000/reports', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authenticated')
                },
            })
            .then((res) => {
                console.log(res.data, 'get all checkins fetched')
                commit('reports', res.data)
                // alert('data submitted success')
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