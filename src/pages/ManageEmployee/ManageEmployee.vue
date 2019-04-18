<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item class="active_class">Manage Employees</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Team Members</h1>
<<<<<<< HEAD
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
=======
    <h4 class="page-title">Team Name</h4>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="3" xs="12" v-for="(employee, index) in emp_arr" :key="index">
          <employeeWidget :employee="employee"/>
        </b-col>
      </b-row>
    </b-container>
    <h4 class="page-title">Team Name</h4>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="3" xs="12" v-for="(employee, index) in emp_arr" :key="index">
          <employeeWidget :employee="employee"/>
        </b-col>
      </b-row>
    </b-container>
>>>>>>> 9207beb0ac05c3f1c0dfe20c09dc0d642a97a7d2
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
<<<<<<< HEAD

=======
>>>>>>> 9207beb0ac05c3f1c0dfe20c09dc0d642a97a7d2
  components: {
    employeeWidget
  },
  mounted() {
<<<<<<< HEAD
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
=======
    this.get_profile();
  },
  computed: {
    // name: get("profile/name"),
    emp_arr: get("manageEmployee/employees")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    get_profile: function() {
      this.getProfile();
>>>>>>> 9207beb0ac05c3f1c0dfe20c09dc0d642a97a7d2
    }
  }
};
</script>

<style src="./ManageEmployee.scss" lang="scss" scoped />
