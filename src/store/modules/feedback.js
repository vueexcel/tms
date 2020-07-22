import axios from './../axios'
const state = {
    feedbacksCount: []
}
const actions = {
    async postFeedback({ state, commit }, payload) {
        let res = await axios.post('/employee_feedback', payload)
        return res
    },
    async getFeedback({ state, commit }) {
        try {
            let res = await axios.get('/employee_feedback')
            return res
        } catch (error) {
            console.log(error)
        }
    },
    // for admin only - to fetch feedbacks
    async fetchFeedback({ state, commit }) {
        let res = await axios.get('/admin_fb_reply')
        state.feedbacksCount = []
        res.data.forEach(element => {
            if (!element.admin_response) {
                state.feedbacksCount.push(element)
            }
        });
        return res
    },
    async postFeedbackAdmin({ state, commit }, payload) {
        let res = await axios.post(`/admin_fb_reply/${payload.user._id}`, { reply: payload.comment })
        return res
    }
}
export default {
    namespaced: true,
    actions,
    state
}