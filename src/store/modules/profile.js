import axios from 'axios'
import {make} from 'vuex-pathify'

// setup store
const state = {
    name: null
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async getProfile({state,commit}, payload) {
        let response = await axios
            .get('http://127.0.0.1:5000/profile', {
                headers: {
                    'Authorization': 'Bearer ' + payload.Authorization
                },
            }, )
            .then((response) => {
                commit('name', response.data.name)
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