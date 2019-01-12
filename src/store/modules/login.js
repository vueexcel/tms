import axios from 'axios'
import {make} from 'vuex-pathify'
import router from './../../Routes'

// setup store
const state = {
    authenticated: null,
    loginfailed: null
}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    // async login_({state,commit}, payload) {
    //     let response = await axios
    //         .post('http://127.0.0.1:5000/login', payload)
    //         .then((response) => {
    //             commit('authenticated', response.data.access_token)
    //             window.localStorage.setItem("authenticated", response.data.access_token);
    //             router.push("/admin/manageKpi");
    //         }).catch ((err) => {
    //             commit('loginfailed', err)
    //         })
    // }
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})