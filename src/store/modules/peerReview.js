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
            if(error.response){
                return error.response.data.msg
            } else {
                return 'Api Server Down'
            }
        }
    },
    async deleteReview({commit},payload){
        let url = `/delete_peer_report/${payload.user.loggedInUserReview._id}`
        try {
            let response = await axios.delete(url)
            if(response.status === 200){
                let errorResponse = {
                    error : false,
                    msg : 'Successfully deleted your review'
                } 
                return errorResponse 
            }
        } catch (error) {
            let errorResponse = {
                error : true,
                msg : ''
            }
            if(error.response.status === 403){
                errorResponse.msg = error.response.data.msg
                return errorResponse
            } else {
                errorResponse.msg = 'Api Server Down' 
                return errorResponse
            }
            
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
            errorResponse.msg = 'Api Server Down' 
            return errorResponse
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