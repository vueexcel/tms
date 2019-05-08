import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    user: {},
    activity:{}
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({ commit }, payload) {
        let response = await axios.get('/auth/profile')
        if (response) {
            commit('user', response.data)
            if (response.data.role === 'Admin') {
                router.push("/admin/manageKpi");
            } else {
                router.push("/app/profile");
            }
            return true
        }
        else {
            // commit('loginfailed', err)
        }
    },

    async getActivity({ commit }, payload) {
        let response = await axios.get('/user/recent_activities')
        if (response) {
            commit('activity', response.data)

            return true
        }
    }
    // async getProfile({ commit }, payload) {
    //     await axios.get('/auth/profile').then((response) => {
    //         commit('user', response.data)
    //     }).catch((err) => {
    //         // commit('loginfailed', err)
    //     })
    // }

}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})