import axios from 'axios'
import { make } from 'vuex-pathify'
import router from './../../Routes'

const state = {
    authenticated: null,
    loginfailed: false,
    sidebar: true,
    loader: false
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async login_({ state, commit }, payload) {
        commit('loader', true)
        await axios
            .post(process.env.VUE_APP_ROOT_API + '/auth/login', payload)
            .then((response) => {
                commit('authenticated', response.data.access_token)
                commit('loginfailed', false)
                commit('loader', false)
                window.localStorage.setItem("authenticated", response.data.access_token);
                router.push("/admin/manageKpi");
            }).catch((err) => {
                commit('loginfailed', true)
                commit('loader', false)
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
