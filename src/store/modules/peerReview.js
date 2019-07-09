import axios from 'axios'
import { make, dispatch } from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    kpiUserList: [],
    reviewList: [],
    selfReview:[]
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getKpiUser({ commit }) {
        try {
            let response = await axios.get('/Same_kpi_members')
            commit('kpiUserList', response.data)
            return true
        } catch (error) {
            return error
        }
    },
    async submitReview({ commit, dispatch }, payload) {
        try {
            let response = await axios.post('/Same_kpi_reviews', payload)
            if (response.status === 200) {
                dispatch('getReview', payload)
                return true
            }
        } catch (error) {

        }
    },
    async getReview({ commit }, payload) {
        try {
            let response = await axios.get('/Same_kpi_reviews')
            if (response.status === 200) {
                commit('reviewList', response.data)
                return true
            }
        } catch (error) {

        }
    },
    async getSelfReview({commit}){
        try {
            let response = await axios.get('Same_kpi_self_reviews')
            commit('selfReview',response.data)
            return true
        } catch (error) {
            return error
        }
    }

}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})