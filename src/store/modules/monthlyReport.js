import axios from './../axios'
const state = {}
const actions = {
    async postReview({ state, commit }, payload) {
        console.log(payload);
        let res = await axios.post('/monthly', payload)
        if (res) {
            console.log(res);
        }
    }
}
//create store
export default {
    namespaced: true,
    state,
    actions,
}