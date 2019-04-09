// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'

// setup store
const state = {
    allMember: [],
    gettingMemberError:""
}
const mutations = make.mutations(state)
const actions = {
    async getAllMember({state}){
        await axios.get(process.env.VUE_APP_ROOT_API + '/user/list').then((response) =>{
            if(response){
                state.allMember = response.data
            }
        }).catch(error =>{
            state.gettingMemberError = 'Can not get all members' + error
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