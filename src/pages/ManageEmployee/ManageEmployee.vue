<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Manage Employees</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Team Members</h1>
    <h4 class="page-title">Team Name</h4>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="3" xs="12" v-for="employee in emp_arr" :key="employee.id">
          <employeeWidget :employee="employee"/>
        </b-col>
      </b-row>
    </b-container>
    <h4 class="page-title">Team Name</h4>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="3" xs="12" v-for="employee in emp_arr" :key="employee.id">
          <employeeWidget :employee="employee"/>
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
import { get, call } from "vuex-pathify";

export default {
  name: "ManageEmployee",
  components: {
    employeeWidget
  },
  mounted() {
    this.get_profile();
  },
  computed: {
    name: get("profile/name"),
    emp_arr: get("manageEmployee/employees"),
  },
  methods: {
    getProfile: call("profile/getProfile"),
    get_profile: function() {
      this.getProfile({
        Authorization: localStorage.getItem("authenticated")
      });
    }
  }
};
</script>

<style src="./ManageEmployee.scss" lang="scss" scoped />
