<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Manage Kpi's</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">KPI Management
      <!-- <a class="btn btn-success rounded-circle btn-sm" @click="addCreateNew = true">
        <i class="fas fa-plus" style="color:white;"></i>
      </a>-->
      <span class="bg-success circle text-white" @click="addCreateNew = true">
        <i class="la la-plus"></i>
      </span>
    </h1>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="8" xs="12">
          <!--=================== CREATE NEW ============================-->
          <div class="pb-xlg">
            <Widget class="mb-0 p-0" v-if="addCreateNew">
              <h4 class="pl-4 pt-3">Create New</h4>
              <hr>
              <form class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent="addNewTeam_">
                <b-input-group>
                  <b-form-input v-model="newTeamName" name="text" placeholder="Add New Team"></b-form-input>
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
      <b-row v-if="false">
        <b-col lg="8" xs="12">
          <div class="pb-xlg">
            <Widget class="mb-0 p-0">
              <h4 class="pl-4 pt-3">Jr. Web Developer</h4>
              <h5 class="pl-4 pt-3 fw-bold">KPI</h5>
              <hr>
              <form class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent>
                <b-form-input name="text" placeholder="KPI Heading"></b-form-input>
                <br>
                <b-form-textarea
                  id="textarea1"
                  placeholder="Description..."
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <a class="btn btn-default btn-sm mt-2 pl-4 pr-4">
                  <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                  Add
                </a>
              </form>
            </Widget>
            <widget
              title="<h5 class='text-primary'>LIGHT BLUE REACHED $300</h5>"
              close
              customHeader
              class="m-0 pb-5"
            >
              <section class="bg-white">
                <div class="w-75">
                  <h4 class="text-primary"></h4>First 700 people will take part in building first human settlement
                  outside of earth. Thats awesome right?
                </div>
              </section>
            </widget>
            <Widget class="mb-0 p-0">
              <h5 class="pl-4 pt-3 fw-bold">ERA</h5>
              <hr>
              <form class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent>
                <b-form-input name="text" placeholder="ERA Heading"></b-form-input>
                <br>
                <b-form-textarea
                  id="textarea1"
                  placeholder="Description..."
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <a class="btn btn-default btn-sm mt-2 pl-4 pr-4">
                  <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                  Add
                </a>
              </form>
            </Widget>
          </div>
        </b-col>
      </b-row>
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
    // console.log(localStorage.getItem("authenticated"));
    this.get_profile();
  },
  computed: {
    name: get("profile/name"),
    imgData: get("adminKPI/groupInvolvedImg"),
    addCreateNew: sync("adminKPI/addCreateNew"), //create New Button
    newTeamName: sync("adminKPI/newTeamName"), //v-model
    addNewTeam: sync("adminKPI/addNewTeam"), //array
    kpiHeading: sync("adminKPI/kpiHeading"), //v-model
    kpiDescription: sync("adminKPI/kpiDescription"), //v-model
    eraHeading: sync("adminKPI/eraHeading"), //v-model
    eraDescription: sync("adminKPI/eraDescription"), //v-model
    searchField: sync("adminKPI/searchField"), //v-model
    allMembers: sync("adminKPI/allMembers"), //array
    searchFilter: function() {
      return this.allMembers.filter(item => {
        return item.name.toLowerCase().includes(this.searchField.toLowerCase());
      });
    }
  },
  methods: {
    getProfile: call("profile/getProfile"),
    get_profile: function() {
      this.getProfile({
        Authorization: localStorage.getItem("authenticated")
      });
    },
    addNewTeam_: function() {
      if (this.newTeamName !== "") {
        this.addNewTeam.push({
          name: this.newTeamName,
          addNewKpi: false,
          addNewEra: false,
          kpiList: [],
          eraList: [],
          memberList: []
        });
        this.newTeamName = "";
      }
    },
    addKpi: function(index) {
      console.log("inside add kpi block");
      if ((this.kpiHeading && this.kpiDescription) !== "") {
        this.addNewTeam[index].kpiList.push({
          heading: this.kpiHeading,
          desc: this.kpiDescription
        });
      }
      (this.kpiHeading = ""), (this.kpiDescription = "");
    },
    addEra: function(index) {
      console.log("inside add era block");
      if ((this.eraHeading && this.eraDescription) !== "") {
        this.addNewTeam[index].eraList.push({
          heading: this.eraHeading,
          desc: this.eraDescription
        });
      }
      (this.eraHeading = ""), (this.eraDescription = "");
    },
    addMember: function(i, index) {
      console.log(i, index, "===========", this.allMembers[i]);
      this.addNewTeam[index].memberList.push(this.allMembers[i]);
    }
  }
};
</script>

<style src="./Kpi.scss" lang="scss" scoped />
