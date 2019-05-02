<template>
  <div>
    <h1 class="page-title">
      KPI Management
      &nbsp;
      <span
        v-if="!addCreateNew"
        class="circle bg-success text-white fs-larger align-middle"
        @click="addCreateNew = true"
      >
        <i class="fas fa-plus fs-lg"></i>
      </span>
    </h1>
    <b-container fluid class="p-0 m-0">
      <b-row>
        <b-col lg="8" xs="12">
          <!--=================== CREATE NEW ============================-->
          <div class="pb-xlg">
            <Widget class="mb-0 p-0" v-if="addCreateNew">
              <h4 class="pl-4 pt-3">Create New</h4>
              <hr>
              <form class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent="addNewTeam_">
                <b-input-group>
                  <b-form-input v-model="newTeamName" name="text" placeholder="Add New KPI"></b-form-input>
                  <b-input-group-append>
                    <b-btn type="submit" class="btn btn-warning btn-lg fs-sm pl-4 pr-4">
                      <i class="fas fa-plus" style="color:white;"></i>
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </form>
            </Widget>
          </div>
          <!--=================== CREATE NEW ENDS=========================-->
        </b-col>
      </b-row>
      <!--############### ROW FOR REACT DEV add KPI/ERA ############ -->
      <AddKpiEra :array_="addNewTeam"/>
    </b-container>
  </div>
</template>

<script>
import $ from "jquery";
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import Widget from "@/components/Widget/Widget";
import AddKpiEra from "@/components/AddKpiEra/AddKpiEra";
import { get, call, sync } from "vuex-pathify";

export default {
  name: "Profile",
  components: { Widget, AddKpiEra },
  mounted() {
    this.get_profile();
  },
  computed: {
    authenticated: sync("login/authenticated"), //login page authentication token
    addCreateNew: sync("adminKPI/addCreateNew"), //create New Button
    newTeamName: sync("adminKPI/newTeamName"), //v-model
    addNewTeam: sync("adminKPI/addNewTeam"), //array,
    searchFilter: function() {
      return this.allMembers.filter(item => {
        return item.name.toLowerCase().includes(this.searchField.toLowerCase());
      });
    }
  },
  created() {
    if (
      window.localStorage.getItem("authenticated") &&
      this.authenticated == null
    ) {
      this.authenticated = window.localStorage.getItem("authenticated");
    }
  },
  methods: {
    getProfile: call("profile/getProfile"),
    addManagement: call("adminKPI/addManagement"),
    getKpiEra: call("adminKPI/getKpiEra"),
    get_profile: function() {
      this.getProfile();
    },
    addNewTeam_: function() {
      if (this.newTeamName !== "") {
        let data = {
          kpi_name: this.newTeamName,
          token: localStorage.getItem("authenticated")
        };
        this.addManagement(data);
        this.newTeamName = "";
        this.addCreateNew = false;
      }
    },
    getAllKpiEra() {
      this.getKpiEra();
    }
  },
  created() {
    if (localStorage.getItem("authenticated")) {
      this.getAllKpiEra();
    }
  }
};
</script>

<style src="./Kpi.scss" lang="scss" scoped />
