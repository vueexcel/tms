import { make } from 'vuex-pathify'
import axios from 'axios'

// setup store
const state = {}
const mutations = make.mutations(state)
const actions = {
    ...make.actions(state),
    async weeklyReview({
        state,
        commit
    }, payload) {
        let res = await axios
            .post('/weekly', payload)
            .then((res) => {
                alert('weekly review submitted success')
            })
            .catch((err) => {
            })
    },
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})