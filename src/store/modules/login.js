import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

const state = {
    authenticated: null,
    sidebar: true,
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async login_({ state, commit }, payload) {
        let response = await axios.post('/auth/login', payload)
        if (response) {
            commit('authenticated', response.data.access_token)
            window.localStorage.setItem("authenticated", response.data.access_token);
            // call("profile/getProfile")
            // router.push("/admin/manageKpi");
            return true
        } else {
            return false
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
