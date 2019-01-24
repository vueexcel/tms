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
    allMembers: [{
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