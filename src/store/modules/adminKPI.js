// import axios from 'axios'
import {
    make
} from 'vuex-pathify'

// setup store
const state = {
    addCreateNew: false,
    newTeamName: '',
    addNewTeam: [],
    kpiHeading: '',
    kpiDescription: '',
    eraHeading: '',
    eraDescription: '',
    groupInvolvedImg: [{
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
    ],
    searchField: "",
    allMembers: [{
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Mahima Khera",
            role: "VP Operations"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary",
            name: "Shweta",
            role: "HR"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Juhi",
            role: "HR"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Manish",
            role: "CEO"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Ashutosh",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary",
            name: "Danish",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Saurabh",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary",
            name: "Kartik",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Anuj",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary",
            name: "Pharaj",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Mohit",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Faisal",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Puneet",
            role: "Business Development"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary",
            name: "Rohit Chhabra",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Manish Joy",
            role: "Web Dev"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary",
            name: "Mridul",
            role: "Cheet Gaya"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Nadeem",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a5.84f014f0.jpg",
            variant: "primary",
            name: "Prashant Tyagi",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary",
            name: "Nidhi",
            role: "Jr Web Dev"
        },
        {
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary",
            name: "Yuvraj Singh",
            role: "Web Dev"
        },
    ]
}
const mutations = make.mutations(state)
// const actions = {}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    // actions
})