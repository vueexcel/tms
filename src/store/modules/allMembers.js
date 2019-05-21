// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'

// setup store
const state = {
    allMember: [],
    gettingMemberError: "",
    managers: []
}
const mutations = make.mutations(state)
const actions = {
    async getAllMember({ state, dispatch }) {
        state.allMember = []
        try{
            let response = await axios.get('/user/list')
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
    async assignManager({ dispatch }, payload) {
        try{
            let response = await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${payload.weight ? payload.weight : 1}`)
            return true
        } catch(err){
            if(err.response){
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
        }
    },
    async deleteManager({ dispatch }, payload) {
        try{
            let response = await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${0}`)
            return true
        } catch(error){
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