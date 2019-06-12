import axios from './../axios'
import { get } from 'https';
const state = {

}
const actions = {
    // @Devkant   @bp.route('/get_managers', methods=['GET'])  api route
    // @bp.route("/360_reviews", methods=["GET", "POST"])
    // @bp.route("/360_reviews/<string:review_id>", methods=["PUT"])
    async getmanagers() {
        let res = await axios.get('/get_managers')
        return res
    },
    async submitPost({ state, commit, dispatch }, payload) {
        let res = await axios.post('/360_reviews', payload)
        dispatch('getPost')
        return res
    },
    async getPost({ state, commit }) {
        let res = await axios.get('/360_reviews')
        return res
    }

}
const mutations = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}