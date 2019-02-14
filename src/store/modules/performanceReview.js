// import axios from 'axios'
import { make } from "vuex-pathify";

const state = {
  Employee_Array: [
    {
      name: 'Mahima Khera',
      id: 1,
      post: 'VP Operations',
      image: "/img/a3.f6dc73f2.jpg",
    },
    {
        name: 'Arun Kumar',
        id: 2,
        post: 'Project Manager ReactJs',
        image: "/img/a3.f6dc73f2.jpg",
    },
    {
        name: 'Deepak Mishra',
        id: 4,
        post: 'Project Manager Magento',
        image: "/img/a3.f6dc73f2.jpg",
    },
    {
        name: 'Saurabh Khatri',
        id: 5,
        post: 'Sr. Magento Developer',
        image: "/img/a3.f6dc73f2.jpg",
    },
    {
        name: 'Manish Joy',
        id: 6,
        post: 'Sr. Magento Developer',
        image: "/img/a3.f6dc73f2.jpg",
    }
  ]
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  
};

//create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
