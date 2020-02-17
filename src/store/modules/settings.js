 /*eslint-disable*/
import axios from 'axios'
import { log } from 'util';
const actions = {
    // @bp.route('/slack_settings', methods=["PUT","GET"])
    // @bp.route('/schdulers_settings', methods=["PUT","GET"])
    // @bp.route('/schduler_mesg', methods=["GET","PUT"])
    async slackSettings() {
        let res = await axios.get('/system/slack_settings')
        return res
    },
    async setSlackSettings({ state, commit }, payload) {
        let res = await axios.put('/system/slack_settings', payload)
        return res
    },


    async schedularSettings() {
        let res = await axios.get('/system/schdulers_settings')
        return res
    },
    async setSchedularSettings({ state, commit }, payload) {
        let res = await axios.put('/system/schdulers_settings', payload)
        console.log(payload,"{{{{}}}}}");
        return res
    },


    async schedularMsg() {
        let res = await axios.get('/system/schduler_mesg')
        return res
    },

    async setSchedularMsg({ state, commit }, payload) {
        let res = await axios.put('/system/schduler_mesg', payload)
        return res
    },

    async setReportsSetting ({}, payload) {
        try {
            let res = await axios.put('/system/put/reports_settings', payload)
            return res
        } catch (error) {
            return error
        }
    }
}
// create store
export default ({
    namespaced: true,
    actions
})