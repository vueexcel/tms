// import axios from 'axios'
import { make } from "vuex-pathify";

const state = {
    star: [1,2,3,4,5],
    vote: 1,
    difficultyRating:1,
    text: ''
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
    giveRating({state}, payload) {
        state.vote = payload
    },
};

//create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
