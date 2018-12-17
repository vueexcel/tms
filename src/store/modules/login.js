import {make} from 'vuex-pathify'

// setup store
const state = {
    userName: 'admin@java.com',
    password: 'java@123',
    errorMessage: null
}
const mutations = make.mutations(state)

// create store
export default ({
    namespaced: true,
    state,
    mutations
})