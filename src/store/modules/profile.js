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
        await axios.get('/auth/profile').then((response) => {
            commit('user', response.data)
            console.log(response.data, '11111');
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