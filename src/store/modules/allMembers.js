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
        let response = await axios.get('/user/list')
        if (response) {
            state.allMember = response.data
            return response
        } else {
            console.log(response, 'error in gettingAllMember APi');
        }
    },
    async addManager({ dispatch }, payload) {
        await axios.put(`/user/role/${payload.manager._id}/manager`).then(response => {
            if (response) {
                dispatch('assignManager', payload)
            }
        })
        return true
    },
    async assignManager({ dispatch }, payload) {
        await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${payload.weight ? payload.weight : 1}`).then(response => {
            dispatch('getAllMember')
        })
        return true
    },
    async deleteManager({ dispatch }, payload) {
        await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${0}`).then(response => {
            dispatch('getAllMember')
        })
        return true
    }
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})