// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'

// setup store
const state = {
    allMember: [],
    gettingMemberError: "",
    teams : []
}
const mutations = make.mutations(state)
const actions = {
    async getAllMember({ state , dispatch}) {
        await axios.get('/user/list').then((response) => {
            if (response) {
                state.allMember = response.data
                dispatch('groupByTeam', response.data)
            }
        }).catch(error => {
            state.gettingMemberError = 'Can not get all members' + error
        })
    },
    groupByTeam({state}, payload){
        var groups = {}
        state.teams = []
        payload.forEach(element => {
            var list =  groups[element.team]
            if(list){
                list.push(element)
            } else{
                groups[element.team] = [element]
            }
        });
        for (var team in groups){
            let data = {
                teamname: team,
                teamArray : groups[team]
            }
            state.teams.push(data)
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