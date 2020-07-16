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
        try{
            let response = await axios.post('/auth/login', payload)
            commit('authenticated', response.data.access_token)
            window.localStorage.setItem("authenticated", response.data.access_token);
            return true
        } catch(err){   
            if(err.response){
                return err.response.data.msg
            } else {
                return 'API Server Down'
            }
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
