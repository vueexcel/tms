import axios from 'axios'
import { make, dispatch } from 'vuex-pathify'

// setup store
const state = {
    kpiUserList: [],
    reviewList: [],
    selfReview: []
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async submitNote({ dispatch }, payload) {
        let payloadToSend = {
            comment: payload.text,
            junior_id: payload.user._id
        }
        let returnResponse = {
            error: false,
            text: ''
        }
        let url = '/review_note'
        try {
            let response = await axios.post(url, payloadToSend)
            if (response) {
                returnResponse.text = 'Successfully submitted notes'
                return returnResponse
            }
        } catch (error) {
            returnResponse.error = true
            if (error.response) {
                returnResponse.text = error.response.data.msg
            } else {
                returnResponse.text = 'Api server down'
            }
        }
    },
    async getNotes({commit}){
        let url = '/review_note/get_review'
        let returnResponse = {
            error : false,
            response : null
        }
        try {
            let response = await axios.get(url)
            returnResponse.response = response.data
            return returnResponse
        } catch (error) {
            returnResponse.error = true
            if (error.response) {
                returnResponse.response = error.response.data.msg
            } else {
                returnResponse.response = 'Api server down'
            }
        }
    },
    async updateNote({commit},payload){
        let url =  `/review_note/delete_review/${payload.junior.notes._id}`
        let payloadToSend = {
            comment: payload.comment,
            junior_id: payload.junior._id
        }
        try {
            let response = await axios.put(url,payloadToSend)
            if(response){
                return true
            }
        } catch (error) {
            if(error.response){
                return error.response.data.msg
            } else {
                return 'Api server down'
            }
        }  
    },
    async deleteNote({commit},payload){
        let url = `/review_note/delete_review/${payload.notes._id}`
        try {
            let response = await axios.delete(url)
            if(response){
                return true
            }
        } catch (error) {
            if(error.response){
                return error.response.data.msg
            } else {
                return 'Api server down'
            }
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