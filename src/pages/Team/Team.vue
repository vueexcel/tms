<template>
  <div>
    <h1 class="page-title">Employee Team Page</h1>
    <div class="color_line">
      <hr>
    </div>
    <div class="mt-3 margin">
      <a
        href="#"
        class="btn btn-rounded-f button-for-employee mr-2 team_name pr-4 pl-4"
        @click="setTeam(teamName)"
        v-for="teamName in team"
        :key="teamName.Team_Id"
        :class="{ selectedTab: teamName.Team_Id == selectedTeamId }"
      >
        <div class="text-gray" style="font-size: 12px;">{{teamName.name}}</div>
      </a>
    </div>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="3" xs="12" v-for="employee in emp_arr" :key="employee.id">
          <employeeWidget :employee="employee" :showManager="false"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import employeeWidget from "@/components/Employee/employeeWidget";
import Team from "./Team.json";
import Group from "@/components/Group/allMembers.json";
import { get, call } from "vuex-pathify";

export default {
  name: "Team",
  data() {
    return {
      team: Team,
      activeTeam: {
        name: "All"
      },
      selectedTeamId: 1
    };
  },
  components: {
    employeeWidget
  },
  mounted() {
    // this.get_profile();
  },
  computed: {
    // name: get("profile/name"),
    // emp_arr: get("manageEmployee/employees"),
    emp_arr() {
      Group.forEach(element => {
        element["technology"] = element.team;
        element["post"] = element.work;
      });
      if (this.activeTeam.name === "All") {
        return Group;
      } else {
        let team = [];
        Group.forEach(element => {
          if (this.activeTeam.name === element.team) {
            team.push(element);
          }
        });
        return team;
      }
    }
  },
  methods: {
    // getProfile: call("profile/getProfile"),
    // get_profile: function() {
    //   this.getProfile();
    // }
    setTeam(team) {
      this.activeTeam = team;
      this.selectedTeamId = team.Team_Id;
    }
  }
};
</script>

<style src="./Team.scss" lang="scss" scoped />
