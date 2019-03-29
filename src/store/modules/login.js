import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    authenticated: null,
    loginfailed: false,
    sidebar: true
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async login_({ state, commit }, payload) {
        await axios
            .post('http://5.9.144.226:8000/auth/login', payload)
            .then((response) => {
                commit('authenticated', response.data.access_token)
                commit('loginfailed', false)
                window.localStorage.setItem("authenticated", response.data.access_token);
                router.push("/admin/manageKpi");
            }).catch((err) => {
                commit('loginfailed', true)
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
