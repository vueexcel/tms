import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    user: {},
    activity: {},
    alert360: false
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({ commit, dispatch }, payload) {
        try {
            let response = await axios.get('/auth/profile')
            if (response) {
                commit('user', response.data)
                if (payload && payload.reload) {
                    return true
                } else {
                    if (response.data.role === 'Admin') {
                        router.push("/admin/manageKpi");
                    } else {
                        dispatch('getManagerReviewStatus')
                        if (payload === undefined) {
                            router.push("/app/profile");

                        }
                    }

                }
                return true
            }
            else {
                // commit('loginfailed', err)
            }
        } catch (error) {
            console.log(error);

            if (error.response.data.msg === 'Token has expired') {
                localStorage.removeItem('authenticated')
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
    },
    async getManagerReviewStatus({ commit }, payload) {
        let response = await axios.get('/360_review_mandatory')
        if (response) {
            commit('alert360', !response.data.is_reviwed)
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