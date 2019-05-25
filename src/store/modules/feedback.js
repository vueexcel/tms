import axios from './../axios'
const actions = {
    async postFeedback({ state, commit }, payload) {
        let res = await axios.post('/employee_feedback', payload)
        return res
    },
    async getFeedback({ state, commit }) {
        let res = await axios.get('/employee_feedback')
        return res
    }
}
export default {
    namespaced: true,
    actions,
}