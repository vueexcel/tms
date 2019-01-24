import {make} from 'vuex-pathify'
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
            .post('http://127.0.0.1:5000/weekly', payload, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authenticated')
                },
            })
            .then((res) => {
                console.log(res, 'weekly review added success')
                alert('weekly review submitted success')
            })
            .catch((err) => {
                console.log(err, 'weekly review addition failed')
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