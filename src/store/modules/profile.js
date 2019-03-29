import axios from 'axios'
import {make} from 'vuex-pathify'

// setup store
const state = {
    user: {}
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({commit}, payload) {
        await axios.get('http://5.9.144.226:8000/auth/profile',{
            headers: {
                "Authorization" : `Bearer ${payload.Authorization}`
            }
        }).then((response) => {
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