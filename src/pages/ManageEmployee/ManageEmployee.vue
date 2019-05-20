<template>
  <div>
    <h1 class="page-title">Team Members</h1>
    <div class="text-center" v-if="!teams.length">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <p>Loading...</p>
    </div>
    <div v-if="groupByTeam.length">
      <div v-for="(team, index) in teams" :key="index">
        <h4 class="page-title" v-if="team.teamname">{{team.teamname}}</h4>
        <h4 class="page-title" v-else>No Team</h4>
        <div>
          <b-container class="no-gutters p-0">
            <b-row>
              <b-col lg="3" xs="12" v-for="(employee, index) in team.teamArray" :key="index">
                <employeeWidget :employee="employee" :index="index"/>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import employeeWidget from "@/components/Employee/employeeWidget";
import { get, call } from "vuex-pathify";

export default {
  name: "ManageEmployee",
  components: {
    employeeWidget
  },
  data() {
    return {
      teams: []
    };
  },
  created() {
    this.getallMembers();
  },
  computed: {
    allMembers: get("allMember/allMember")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getAllMember_: call("allMember/getAllMember"),
    get_profile: function() {
      this.getProfile();
    },
    getallMembers() {
      this.getAllMember_()
        .then(res => {
          console.log(res);
          this.groupByTeam(res.data);
        })
        .catch(err => console.log(err.response));
    },

    // processing data
    groupByTeam(payload) {
      var groups = {};
      this.teams = [];
      payload.forEach(element => {
        if (element.role !== "Admin") {
          var list = groups[element.team];
          if (list) {
            list.push(element);
          } else {
            groups[element.team] = [element];
          }
        }
      });
      for (var team in groups) {
        let data = {
          teamname: team,
          teamArray: groups[team]
        };
        this.teams.push(data);
      }
    }
  }
};
</script>

<style src="./ManageEmployee.scss" lang="scss" scoped />
