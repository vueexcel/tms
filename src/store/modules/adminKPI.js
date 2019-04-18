// import axios from 'axios'
import { make } from 'vuex-pathify'
import axios from './../axios'
import { log } from 'util';

// setup store
const state = {
    addCreateNew: true,
    newTeamName: '',
    addNewTeam: [],
    kpiHeading: '',
    kpiDescription: '',
    eraHeading: '',
    eraDescription: '',
    searchField: '',
    groupInvolvedImg: [
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
    allMembers: [
        {
            name: 'Mahima',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Manish',
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            name: 'Saurabh',
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            name: 'Manish Joy',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Deepak Mishra',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Prateek',
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            name: 'Juhi',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Shweta',
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            name: 'Kartik',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Nadeem',
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            name: 'Mridul',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Vivek',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Yogendra',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Rohit',
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
        {
            name: 'Ruchi',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Shraddha',
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            name: 'Arun',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Sagar',
            src: "/img/a5.84f014f0.jpg",
            variant: "primary"
        },
        {
            name: 'Ashutosh',
            src: "/img/a3.f6dc73f2.jpg",
            variant: "primary"
        },
        {
            name: 'Nitin',
            src: "/img/a6.2966ab8e.jpg",
            variant: "primary"
        },
    ]
}
const mutations = make.mutations(state)
const actions = {
    async addManagement({ commit, dispatch }, payload) {
        let data = {
            kpi_name: payload.kpi_name,
            kpi_json: [
                {
                    addKpi: true,
                    title: "",
                    desc: "",
                    edit: false
                }
            ],
            era_json: [
                {
                    addEra: true,
                    title: "",
                    desc: "",
                    edit: false
                }
            ]
        }
        await axios.post(process.env.VUE_APP_ROOT_API + '/kpi', data).then(response => {
            dispatch('getKpiEra', { kpiEraId: response.data, token: payload.token })
        })
    },
    async getKpiEra({ commit }, data) {
        await axios.get(process.env.VUE_APP_ROOT_API + '/kpi', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('authenticated')
            }
        }).then(response => {
            commit('addNewTeam', response.data)
        })
    },
    checkValidPayload({ commit }, payload) {
        let kpiEraArray = []
        if (payload.data.addKpi) {
            payload.data.kpi_json.map(kpi => {
                if (kpi.title !== '' && kpi.desc !== '') {
                    kpiEraArray.push(kpi)
                }
            })
            payload.data.kpi_json = kpiEraArray
        } else {
            payload.data.era_json.map(kpi => {
                if (kpi.title !== '' && kpi.desc !== '') {
                    kpiEraArray.push(kpi)
                }
            })
            payload.data.era_json = kpiEraArray
        }
        return payload
    },
    //########### every time when we ADD new KPI/ERA #########
    async updateKpi({ state, commit, dispatch }, payload) {
        if (payload.data.updateKpi && payload.data.updateKpi === true) {
            let addNewTeam = state.addNewTeam.slice().reverse()
            dispatch('updateKpiEra', addNewTeam[payload.indexOfMainArray])
        } else {
            state.addNewTeam.map(team => {
                if (team._id === payload.data._id) {
                    if (payload.data.addKpi === true) {
                        if (team.era_json.length !== 0) {
                            payload['isKraJson'] = true
                        } else {
                            payload['isKraJson'] = false
                        }
                        dispatch('getKpiData', payload).then(resp => {
                            if (resp) {
                                resp['_id'] = payload.data._id
                                dispatch('updateKpiEra', resp)
                            }
                        })
                    } else {
                        if (team.kpi_json !== 0) {
                            payload['isKpiJson'] = true
                        } else {
                            payload['isKpiJson'] = false
                        }
                        dispatch('getEraData', payload).then(resp => {
                            if (resp) {
                                resp['_id'] = payload.data._id
                                dispatch('updateKpiEra', resp)
                            }
                        })
                    }
                }

            })

        }
    },
    async updateKpiEra({ commit, dispatch }, payload) {
        await axios.put(process.env.VUE_APP_ROOT_API + `/kpi/${payload._id}`, payload).then(response => {
            dispatch('getKpiEra', { token: payload.Authorization })
        }).catch(e => {
        })
    },
    getKpiData({ state, dispatch }, payload) {
        let data = {}
        state.addNewTeam.map(team => {
            if (team._id === payload.data._id) {
                if (team.kpi_json.length !== 0) {
                    team.kpi_json.push({
                        title: payload.data.kpi_json[0].title,
                        desc: payload.data.kpi_json[0].desc,
                        edit: false
                    })
                    if (payload.isKraJson === true) {
                        data = {
                            kpi_name: payload.data.kpi_name,
                            kpi_json: team.kpi_json,
                            era_json: team.era_json
                        }
                    } else {
                        if (team.era_json.length === 0) {
                            data = {
                                kpi_name: payload.data.kpi_name,
                                kpi_json: team.kpi_json,
                                era_json: [{
                                    addEra: false,
                                    title: "",
                                    desc: "",
                                    edit: false
                                }]
                            }
                        }
                    }
                }
            }
        })
        return data
    },
    getEraData({ state, dispatch }, payload) {

        let data = {}
        state.addNewTeam.map(team => {
            if (team._id === payload.data._id) {
                if (team.era_json.length !== 0) {
                    team.era_json.push({
                        title: payload.data.era_json[0].title,
                        desc: payload.data.era_json[0].desc,
                        edit: false
                    })
                    if (payload.isKpiJson === true) {
                        data = {
                            kpi_name: payload.data.kpi_name,
                            kpi_json: team.kpi_json,
                            era_json: team.era_json
                        }
                    } else {
                        if (team.kpi_json.length === 0) {
                            data = {
                                kpi_name: payload.data.kpi_name,
                                kpi_json: [{
                                    addKpi: false,
                                    title: "",
                                    desc: "",
                                    edit: false
                                }],
                                era_json: team.era_json
                            }
                        }
                    }
                }
            }
        })
        return data
    },
    async delKpi({ state, dispatch }, payload) {
        let addNewTeam = state.addNewTeam.slice().reverse()
        if (payload.KPIorERA === "kpi") {
            addNewTeam[payload.mainIndex].kpi_json.splice(payload.index, 1)
            if (addNewTeam[payload.mainIndex].kpi_json.length === 0) {
                addNewTeam[payload.mainIndex].kpi_json.push({
                    addKpi: false,
                    desc: "",
                    edit: false,
                    title: ""
                })
            }
        } else if (payload.KPIorERA === "era") {
            addNewTeam[payload.mainIndex].era_json.splice(payload.index, 1)
            if (addNewTeam[payload.mainIndex].era_json.length === 0) {
                addNewTeam[payload.mainIndex].era_json.push({
                    addEra: false,
                    desc: "",
                    edit: false,
                    title: ""
                })
            }
        }
        dispatch('updateKpiEra', addNewTeam[payload.mainIndex])
    }
}

// create store
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})