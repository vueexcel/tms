import axios from './../axios'
import { get } from 'https';
import profile from './profile'
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
    },
    // @bp.route("/360_get_juniors_reviews", methods=["GET"])  for managers
    // @bp.route("/admin_get_reviews", methods=["GET"]) for admin
    // ######### fetch reviews for managers & admin only ##########
    async getAllJuniorReviews({ state, commit }) {
        let role = ''
        if (profile.state.user.role === 'Admin') {
            role = '/admin_get_reviews'
        } else {
            role = '/360_get_juniors_reviews'
        }
        let res = await axios.get(`${role}`)
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