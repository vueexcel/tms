<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item class="active_class">Manage Employees</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Team Members</h1>
    <div v-for="(team, index) in groupByTeam" :key="index">
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
  mounted() {
    this.getallMembers();
  },
  computed: {
    // name: get("profile/name"),
    groupByTeam:get('allMember/teams'),
    allMembers: get("allMember/allMember"),
    // members(){
    //   this.groupByTeam.map(data =>{
    //     console.log(data.teamArray.length, data.teamname)
    //   })
    //   return this.groupByTeam
    // }
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getAllMember_:call("allMember/getAllMember"),
    get_profile: function() {
      this.getProfile();
    },
    getallMembers() {
      this.getAllMember_();
    }
  }
};
</script>

<style src="./ManageEmployee.scss" lang="scss" scoped />
