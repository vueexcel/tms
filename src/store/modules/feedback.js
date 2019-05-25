import axios from './../axios'
const actions = {
    async postFeedback({ state, commit }, payload) {
        let res = await axios.post('/employee_feedback', payload)
        return res
    },
    async getFeedback({ state, commit }) {
        let res = await axios.get('/employee_feedback')
        return res
    },
    // for admin only - to fetch feedbacks
    async fetchFeedback({ state, commit }) {
        let res = await axios.get('/admin_fb_reply')
        return res
    },
    async postFeedback({ state, commit }, payload) {
        console.log(payload);
        let res = await axios.post(`/admin_fb_reply/${payload.user._id}`, { reply: payload.comment })
        return res
    }
}
export default {
    namespaced: true,
    actions,
}