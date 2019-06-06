import axios from './../axios'
import { make } from "vuex-pathify";
const state = {
    activeEmployee: "0"
}
const mutations = make.mutations(state)
const actions = {
    async getUsersMonthlyReports({ state, commit }) {
        let res = await axios.get('/manager_monthly_all')
        if (res) {
            console.log(res);
            return res
        }
    },
}
//create store
export default {
    namespaced: true,
    state,
    actions,
    mutations
}