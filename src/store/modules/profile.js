import axios from 'axios'
import { make } from 'vuex-pathify'

// setup store
const state = {
    user: {}
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({ commit }, payload) {
        await axios.get(process.env.VUE_APP_ROOT_API + '/auth/profile').then((response) => {
            commit('user', response.data)
        }).catch((err) => {
            // commit('loginfailed', err)
        })
    }

}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})