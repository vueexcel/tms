import axios from './../axios'
import { get } from 'https';
import profile from './profile'
const state = {
    count360: 0
}
const actions = {
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
        try {
            let res = await axios.get('/360_reviews')
            return res
        } catch (err) {
            console.log(err);
            
        }
    },
    // ######### fetch reviews for managers & admin only ##########
    async getAllJuniorReviews({ state, commit }) {
        let role = ''
        if (profile.state.user.role === 'Admin') {
            role = '/admin_get_reviews'
        } else {
            role = '/360_get_juniors_reviews'
        }
        let res = await axios.get(`${role}`)
        state.count360 = 0
        res.data.forEach(element => {
            if (element.seen_id === profile.state.user._id) {
                state.count360++
            }
        });
        return res
    },
    async setSeenStatus({ state, commit }, payload) {
        let res = await axios.put(`/360_updates/${payload}`)
        return res
    },

}
const mutations = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}