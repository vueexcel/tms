<template>
  <div>
    <b-row v-for="(team,index) in array_" :key="index">
      <b-col lg="8" xs="12">
        <div class="pb-xlg">
          <Widget class="mb-0 p-0">
            <h4 class="pl-4 pt-3">{{ team.name }}</h4>
            <!-- <hr> -->
            <b-container class="pb-5 pt-3">
              <b-row v-if="team.addNewKpi">
                <b-col>
                  <!--=== KPI ADD BUTTON & FORM === -->
                  <div class="mb-0 p-0">
                    <h5 class="pl-4 pt-3 fw-bold">
                      KPI
                      <span
                        v-show="!showKpiform"
                        @click="showKpiform = true"
                        class="float-right mr-4 ml-1 circle bg-success text-white fw-bold"
                      >+</span>
                    </h5>
                    <hr class="ml-4 mr-4">
                    <form v-show="showKpiform" class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent>
                      <b-form-input name="text" placeholder="KPI Heading" v-model="kpiHeading"></b-form-input>
                      <br>
                      <b-form-textarea
                        id="textarea1"
                        v-model="kpiDescription"
                        placeholder="Description..."
                        :rows="3"
                        :max-rows="6"
                      ></b-form-textarea>
                      <a
                        class="btn btn-default btn-sm mt-2 pl-4 pr-4"
                        @click="addKpi(index); showKpiform = false"
                      >
                        <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                        Add
                      </a>
                      <hr>
                    </form>
                  </div>
                  <!--=== KPI ADD BUTTON & FORM ENDS=== -->
                  <!--=== --- KPI HEADING & DESCRIPTION ---=== -->
                  <div v-if="team.kpiList.length">
                    <div v-for="(kpiera, indexkpi) in team.kpiList" :key="indexkpi">
                      <div class="container pl-4">
                        <span
                          class="text-primary fs-larger"
                          v-show="!kpiera.edit"
                          @dblclick="kpiera.edit = true;"
                        >{{kpiera.heading.toUpperCase()}}</span>
                        <input
                          v-model="kpiera.heading"
                          v-show="kpiera.edit"
                          id="user-name"
                          type="text"
                          class="form-control"
                          @blur="kpiera.edit = false"
                          @keypress.enter="kpiera.edit = false; editKpi(index, indexkpi, kpiera.heading)"
                        >
                        <section class="bg-white">
                          <div class="w-75" style="white-space: pre-line;">
                            <h4 class="text-primary"></h4>
                            <span
                              v-show="!kpiera.edit"
                              @dblclick="kpiera.edit = true;"
                            >{{kpiera.desc}}</span>
                            <b-form-textarea
                              id="textarea1"
                              v-model="kpiera.desc"
                              v-show="kpiera.edit"
                              @blur="kpiera.edit = false"
                              @keypress.enter="kpiera.edit = false; editKpiDesc(index, indexkpi, kpiera.desc)"
                              :rows="3"
                              :max-rows="6"
                            ></b-form-textarea>
                          </div>
                        </section>
                      </div>
                      <hr>
                    </div>
                  </div>
                  <!--=== --- KPI HEADING & DESCRIPTION ENDS---=== -->
                </b-col>
              </b-row>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ==== -->
              <b-row v-if="team.addNewEra">
                <b-col>
                  <div class="mb-0 p-0">
                    <h5 class="pl-4 pt-3 fw-bold">
                      ERA
                      <span
                        v-show="!showEraform"
                        @click="showEraform = true"
                        class="float-right mr-4 ml-1 circle bg-success text-white fw-bold"
                      >+</span>
                    </h5>
                    <hr class="ml-4 mr-4">
                    <form v-show="showEraform" class="inline pl-4 pr-4 pt-2 pb-4" @submit.prevent>
                      <b-form-input name="text" placeholder="ERA Heading" v-model="eraHeading"></b-form-input>
                      <br>
                      <b-form-textarea
                        id="textarea1"
                        v-model="eraDescription"
                        placeholder="Description..."
                        :rows="3"
                        :max-rows="6"
                      ></b-form-textarea>
                      <a
                        class="btn btn-default btn-sm mt-2 pl-4 pr-4"
                        @click="addEra(index) ; showEraform = false"
                      >
                        <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                        Add
                      </a>
                      <hr>
                    </form>
                  </div>
                </b-col>
              </b-row>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ENDS ==== -->
              <b-row class="text-center">
                <b-col v-if="!team.addNewKpi">
                  <h5 class="text-primary pb-2">Add KPI</h5>
                  <a
                    @click="team.addNewKpi = true"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus" style="color:green;"></i>
                  </a>
                </b-col>
                <b-col v-if="!team.addNewEra">
                  <h5 class="text-primary pb-2">Add ERA</h5>
                  <a
                    @click="team.addNewEra = true"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus" style="color:green;"></i>
                  </a>
                </b-col>
              </b-row>
            </b-container>

            <!--===========================================
               =========== ERA'S CLOSABLE WIDGET ===========
            ================================================-->
            <div v-if="team.eraList.length">
              <div v-for="(kpiera, indexera) in team.eraList" :key="indexera">
                <div class="container pl-4">
                  <span
                    class="text-primary fs-larger"
                    v-show="!kpiera.edit"
                    @dblclick="kpiera.edit = true;"
                  >{{kpiera.heading.toUpperCase()}}</span>
                  <input
                    v-model="kpiera.heading"
                    v-show="kpiera.edit"
                    id="user-name"
                    type="text"
                    class="form-control"
                    @blur="kpiera.edit = false"
                    @keypress.enter="kpiera.edit = false; editEra(index, indexera, kpiera.heading)"
                  >
                  <section class="bg-white">
                    <div class="w-75" style="white-space: pre-line;">
                      <h4 class="text-primary"></h4>
                      <span v-show="!kpiera.edit" @dblclick="kpiera.edit = true;">{{kpiera.desc}}</span>
                      <b-form-textarea
                        id="textarea1"
                        v-model="kpiera.desc"
                        v-show="kpiera.edit"
                        @blur="kpiera.edit = false"
                        @keypress.enter="kpiera.edit = false; editEraDesc(index, indexera, kpiera.desc)"
                        :rows="3"
                        :max-rows="6"
                      ></b-form-textarea>
                    </div>
                  </section>
                </div>
                <hr>
              </div>
            </div>
            <!--===================================================
               =========== ERA'S CLOSABLE WIDGET ENDS ===========
            =======================================================-->
          </Widget>
        </div>
      </b-col>
      <b-col lg="4" xs="12">
        <!--##=== group involved for add new member here ===##-->
        <div class="h-auto pb-3" lg="4" xs="12">
          <div class="pb-1 bg-white">
            <h4 class="pl-4 pt-3">Group Involved</h4>
            <hr>
            <b-container class="pb-3 pt-1" v-if="false">
              <b-row class="text-center">
                <b-col>
                  <h6 class="text-primary fw-normal fs-larger">Add Member</h6>
                  <a class="btn btn-outline-success rounded-circle btn-sm">
                    <i class="fas fa-plus" style="color:green;"></i>
                  </a>
                </b-col>
              </b-row>
            </b-container>
            <!--@@@ ADDED MEMBERS CONTAINER @@@-->
            <b-container class="pb-4 pt-1" v-if="team.memberList.length">
              <b-row v-for="(member, key) in team.memberList" :key="key">
                <b-col class="col-md-1">
                  <span class="position-relative" @click="removeMember(key, index)">
                    <img class="rounded-circle" :src="member.src" width="33" height="33" alt="...">
                    <b-badge
                      variant="danger"
                      class="circle-2 fs-sm position-absolute badgePosSelected p-0"
                    >
                      <i class="fas fa-times" style="color:white; font-size:10px"></i>
                    </b-badge>
                  </span>
                </b-col>
                <b-col class="ml-2">
                  <span class="text-primary fs-larger fw-normal">{{ member.name }}</span>
                  <h6>Vp Operations</h6>
                </b-col>
              </b-row>
            </b-container>
            <!--@@@ ADDED MEMBERS CONTAINER ENDS @@@-->
            <div class="pl-4 pr-4 pb-1">
              <b-form-input type="search" v-model="searchField" name="search" placeholder="Search"></b-form-input>
            </div>
            <p class="text-center m-0">
              <small>ALL MEMBERS</small>
            </p>
          </div>
          <div class="p-2">
            <!-- ============================
              ======= MEMBER Image with badge (loop)
            ==================================-->
            <span class="position-relative ml-1" v-for="(img, i) in searchFilter" :key="i">
              <img
                @click="addMember(i, index, img.name)"
                v-b-tooltip.hover
                :title="img.name"
                class="rounded-circle"
                :src="img.src"
                width="25"
                height="25"
                alt="..."
              >
              <b-badge :variant="img.variant" class="circle-2 position-absolute badgePos p-0">
                <i class="fa fa-plus" style="color:white; font-size:10px"></i>
              </b-badge>
            </span>
            <!-- ============================
              ======= MEMBER Image with badge (loop) ends
            ==================================-->
          </div>
        </div>
        <!--##=== group involved for add new member here ENDS ===##-->
        <!--!@!@ WHEN GROUP INVOLVED MEMBERS WILL BE ADDED @!@!-->
        <!--@@@ (v-if) made false to turn of this div @@@ -->
        <div class="h-auto mt-5" v-if="false">
          <div class="pb-2 bg-white">
            <h5 class="pl-4 pt-3">Group Involved</h5>
            <hr>
            <b-container class="pb-4 pt-1">
              <b-row>
                <b-col class="col-md-1">
                  <span class="position-relative">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a6.jpg"
                      width="33"
                      height="33"
                      alt="..."
                    >
                    <b-badge
                      variant="danger"
                      class="rounded-circle fs-sm position-absolute badgePosSelected"
                    >
                      <i class="fas fa-times" style="color:white;"></i>
                    </b-badge>
                  </span>
                </b-col>
                <b-col class="ml-2">
                  <span class="text-primary fs-larger fw-normal">Mahima Khera</span>
                  <h6>Vp Operations</h6>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-md-1">
                  <span class="position-relative">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a4.jpg"
                      width="33"
                      height="33"
                      alt="..."
                    >
                    <b-badge
                      variant="danger"
                      class="rounded-circle fs-sm position-absolute badgePosSelected"
                    >
                      <i class="fas fa-times" style="color:white;"></i>
                    </b-badge>
                  </span>
                </b-col>
                <b-col class="ml-2">
                  <span class="text-primary fs-larger fw-normal">Shweta Govila</span>
                  <h6>HR</h6>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-md-1">
                  <span class="position-relative">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a1.jpg"
                      width="33"
                      height="33"
                      alt="..."
                    >
                    <b-badge
                      variant="danger"
                      class="rounded-circle fs-sm position-absolute badgePosSelected"
                    >
                      <i class="fas fa-times" style="color:white;"></i>
                    </b-badge>
                  </span>
                </b-col>
                <b-col class="ml-2">
                  <span class="text-primary fs-larger fw-normal">Aakriti Dey</span>
                  <h6>HR</h6>
                </b-col>
              </b-row>
            </b-container>
            <div class="pl-4 pr-4 mb-2">
              <b-form-input type="search" name="search" placeholder="Search"></b-form-input>
            </div>
            <h6 class="text-center fs-mini">ALL MEMBERS</h6>
          </div>
          <div class="p-2">
            <!-- ============================
              =======Image with badge
            ==================================-->
            <span class="position-relative ml-1" v-for="(img, index) in imgData" :key="index">
              <img class="rounded-circle" :src="img.src" width="25" height="25" alt="...">
              <b-badge
                :variant="img.variant"
                class="rounded-circle fs-sm position-absolute badgePos"
              >
                <i class="fas fa-check" style="color:white;"></i>
              </b-badge>
            </span>
          </div>
        </div>
        <!--!@!@ WHEN GROUP INVOLVED MEMBERS WILL BE ADDED @!@!-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import $ from "jquery";
import "imports-loader?window.jQuery=jquery,this=>window!widgster"; // eslint-disable-line
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import Widget from "@/components/Widget/Widget";
import { get, call, sync } from "vuex-pathify";
export default {
  name: "AddKpiEra",
  props: { array_: { type: Array } },
  components: { Widget },
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
  mounted() {},
  data() {
    return {
      showKpiform: true,
      showEraform: true,
      user: {
        name: "",
        email: ""
      },
      editField: ""
    };
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
          desc: this.kpiDescription,
          edit: false
        });
      }
      (this.kpiHeading = ""), (this.kpiDescription = "");
    },
    editKpi: function(index, indexkpi, val) {
      console.log("EDIT KPI", index, val);
      this.addNewTeam[index].kpiList[indexkpi].heading = val;
    },
    editKpiDesc: function(index, indexkpi, val) {
      console.log("EDIT KPIDESCRIPTION", index, val);
      this.addNewTeam[index].kpiList[indexkpi].desc = val;
    },
    addEra: function(index) {
      console.log("inside add era block");
      if ((this.eraHeading && this.eraDescription) !== "") {
        this.addNewTeam[index].eraList.push({
          heading: this.eraHeading,
          desc: this.eraDescription,
          edit: false
        });
      }
      (this.eraHeading = ""), (this.eraDescription = "");
    },
    editEra: function(index, indexera, val) {
      console.log("EDIT ERA", index, val);
      this.addNewTeam[index].eraList[indexera].heading = val;
    },
    editEraDesc: function(index, indexera, val) {
      console.log("EDIT ERADESCRIPTION", index, val);
      this.addNewTeam[index].eraList[indexera].desc = val;
    },
    addMember: function(i, index, name) {
      for (let index = 0; index < this.allMembers.length; index++) {
        const element = this.allMembers[index].name;
        if (element == name) {
          var addMemberToList = this.allMembers[index];
        }
      }
      this.addNewTeam[index].memberList.push(addMemberToList);
    },
    removeMember: function(key, index) {
      this.addNewTeam[index].memberList.splice(key, 1);
    }
  }
};
</script>

<style src="./AddKpiEra.scss" lang="scss" />
