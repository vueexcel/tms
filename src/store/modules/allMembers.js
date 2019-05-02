// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'

// setup store
const state = {
    allMember: [],
    gettingMemberError: "",
    teams : [],
    managers: []
}
const mutations = make.mutations(state)
const actions = {
    async getAllMember({ state , dispatch}) {
        await axios.get('/user/list').then(response =>{
            if (response) {
                state.allMember = response.data
                dispatch('groupByTeam', response.data)
            }
        }).catch(error => {
            state.gettingMemberError = 'Can not get all members' + error
        })
        return true
    },
    groupByTeam({state}, payload){
        var groups = {}
        state.teams = []
        payload.forEach(element => {
            if(element.role !== 'Admin'){
                var list =  groups[element.team]
                if(list){
                    list.push(element)
                } else{
                    groups[element.team] = [element]
                }
            }
        });
        for (var team in groups){
            let data = {
                teamname: team,
                teamArray : groups[team]
            }
            state.teams.push(data)
        }
    },
    async addManager({dispatch}, payload){
        await axios.put(`/user/role/${payload.manager._id}/manager`).then(response =>{
            if(response){
                dispatch('assignManager',payload)
            }
        })
        return true
    },
    async assignManager({dispatch},payload){
        await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${payload.weight ? payload.weight : 1 }`).then(response =>{
            dispatch('getAllMember')
        })
        return true
    },
    async deleteManager({dispatch},payload){
        await axios.get(`/kpi/assign_manager/${payload.user._id}/${payload.manager._id}/${0}`).then(response =>{
            dispatch('getAllMember')
        })
        return true
    }
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})