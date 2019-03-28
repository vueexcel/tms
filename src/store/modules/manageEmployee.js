// import axios from 'axios'

import { make } from "vuex-pathify";

const state = {
  employees: [
    {
      name: "Manish Prakash",
      technology: "R.E.A.C.T",
      post: "Sr.ReactJs Developer",
      id: 1,
      manager: [
        {
          image: "/img/a5.84f014f0.jpg",
          manager_id: "one",
          name: "Mahima K",
          work: "VP Operations"
        },
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "two",
          name: "Manish",
          work: "CEO"
        },
        {
          image: "/img/a6.2966ab8e.jpg",
          manager_id: "three",
          name: "Manish",
          work: "CEO"
        },
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "four",
          name: "Arun",
          work: "Sr. MEAN Stack Developer"
        },
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "five",
          name: "Deepak",
          work: "Sr. Magento Developer"
        },
        {
          image: "/img/a6.2966ab8e.jpg",
          manager_id: "six",
          name: "Mahima k",
          work: "VP Operations"
        }
      ]
    },
    {
      name: "Manish Prakash",
      technology: "KPI Name",
      post: "ReactJs Developer",
      id: 2,
      manager: [
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "seven",
          name: "Arun",
          work: "Sr. MEAN Stack Developer"
        },
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "eight",
          name: "Deepak",
          work: "Sr. Magento Developer"
        },
        {
          image: "/img/a6.2966ab8e.jpg",
          manager_id: "nine",
          name: "Mahima k",
          work: "VP Operations"
        }
      ]
    },
    {
      name: "Manish Prakash",
      technology: "KPI Name",
      post: "Project Manager",
      id: 3,
      manager: [
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "ten",
          name: "Arun",
          work: "Sr. MEAN Stack Developer"
        }
      ]
    },
    {
      name: "Manish Prakash",
      technology: "KPI Name",
      post: "ReactJs Developer",
      id: 4,
      manager: [
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "eleven",
          name: "Deepak",
          work: "Sr. Magento Developer"
        },
        {
          image: "/img/a6.2966ab8e.jpg",
          manager_id: "twelve",
          name: "Mahima k",
          work: "VP Operations"
        }
      ]
    },
    {
      name: "Manish Prakash",
      technology: "KPI Name",
      post: "ReactJs Developer",
      id: 2,
      manager: [
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "thirteen",
          name: "Arun",
          work: "Sr. MEAN Stack Developer"
        },
        {
          image: "/img/a3.f6dc73f2.jpg",
          manager_id: "forteen",
          name: "Deepak",
          work: "Sr. Magento Developer"
        },
        {
          image: "/img/a6.2966ab8e.jpg",
          manager_id: "fifteen",
          name: "Mahima k",
          work: "VP Operations"
        }
      ]
    }
  ],
  options: [
    {value: null, text: ''},
    { value: 'MAGENTO', text: 'MAGENTO' },
    { value: 'R.E.A.C.T', text: 'R.E.A.C.T' },
    { value: 'ANGULAR', text: 'ANGULAR' },
    { value: 'VUE', text: 'VUE' },
    { value: 'NODE', text: 'NODE' },
    {value: 'LARAVEL', text: 'LARAVEL'}
  ],
  employeeName: '',
  employeeTechnology: "",
  employeePost: ""
};
const mutations = make.mutations(state);
const actions = {
  ...make.actions(state),
  saveEmployeeInfo({state}, payload) {
    state.employees.forEach((employee, index) => {
      if (employee.id === payload.id) {
        state.employees[index].technology = payload.technology
      }
    });
  },
  deleteManager({state}, payload) {
    state.employees.forEach((employee, index) => {
      if(state.employees[index].id === payload.employeeId) {
        state.employees[index].manager.forEach((manager, managerIndex) => {
          if (state.employees[index].manager[managerIndex].manager_id === payload.manager.manager_id){
            state.employees[index].manager.splice(managerIndex, 1); 
          }
        })
      }
    })
  }
};

//create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
