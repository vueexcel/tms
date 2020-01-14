// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'

// setup store
const state = {
    allMember: [],
    allJuniors:[],
    userToCheckByAdmin:{}
}
const mutations = make.mutations(state)
const actions = {
    async getAllMember({ state }) {
        state.allMember = []
        try{
            let response = await axios.get(`/user/list`)
            if (response) {
                state.allMember = response.data
                return true
            }
        } catch(err){
            if(err.response){
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
    },
    async addManager({ dispatch }, payload) {
        try{
            await axios.put(`/user/role/${payload.manager._id}/manager`)
            let response = await dispatch('assignManager', payload)
            if(response === true){
                return true
            } else {
                return response
            }
        } catch(err) {
            if(err.response){
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
        
    },
    async assignManager({}, payload) {
        try{
            let response = await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${payload.weight ? payload.weight : 1}`)
            if (response) return true
        } catch(err){
            if(err.response){
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
    },
    async deleteManager({}, payload) {
        try{
            let response = await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${0}`)
             if (response) return true
        } catch(error){
            if(error.response){
                return error.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
    },
    async getAllJuniors({state}, payload){
        let url = '/managers_juniors'
        try{
            let response = await axios.get(url)
            state.allJuniors = response.data
            return true
        } catch(error){
            if(error.response){
                return error.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
    },
    async goToDashboard({state},payload){
        let url = `/dashboard_profile/${payload._id}`
        let resToSend = {
            error : false,
            res : null
        }
        try{
            let response = await axios.get(url)
            state.userToCheckByAdmin = response.data
            resToSend.res = response.data
        } catch(error){
            resToSend.error = true
            if(error.response){
                resToSend.res = error.response.data.msg
            } else {
                resToSend.res = 'API Server Down'
            }
        }
        return resToSend
    },
    async resetRating ({},payload) {
        let url = `/system/rating_reset/${payload.employee_id}`
        try {
            let response = await axios.put(url,{msg: payload.msg ? payload.msg : null})
            if (response.data.status === 'success') {
                return true
            } else {
                return 'Oops, Please reset again'
            }
        } catch (error) {
            if(error.response){
                return error.response.data.msg
            } else {
                return 'API Server Down'
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