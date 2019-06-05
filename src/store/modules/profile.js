import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    user: {},
    activity: {}
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({ commit }, payload) {
        try {
            let response = await axios.get('/auth/profile')
            if (response) {
                commit('user', response.data)
                if (response.data.role === 'Admin') {
                    router.push("/admin/manageKpi");
                } else {
                    if (payload === undefined) {
                        router.push("/app/profile");

                    }
                }
                return true
            }
            else {
                // commit('loginfailed', err)
            }
        } catch (error) {
            console.log(error.response.data.msg);
            if (error.response.data.msg === 'Token has expired') {
                localStorage.removeItem('authenticated')
                $cookies.remove("keepLoggedIn");
                // alert(error.response.data.msg + ' login again to continue')
                router.push('/')
            }
        }

    },

    async getActivity({ commit }, payload) {
        let response = await axios.get('/recent_activities')
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