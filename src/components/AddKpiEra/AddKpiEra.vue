<template>
  <div>
    <b-row v-for="(team,index) in array_.slice().reverse()" :key="index">
      <b-col lg="8" xs="12">
        <div class="pb-xlg">
          <Widget class="mb-0 p-0">
            <h4 class="pl-4 pt-3">{{ team.name }}</h4>
            <hr v-if="!team.addNewKpi">
            <b-container class="pb-0 pl-0 pr-0">
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
                      ><i class="fas fa-plus fs-lg"></i></span>
                    </h5>
                    <form v-show="showKpiform" class="inline pl-4 pr-4 pt-2 pb-2" @submit.prevent>
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
                    </form>
                  </div>
                  <!--=== KPI ADD BUTTON & FORM ENDS=== -->
                  <!--=== --- KPI HEADING & DESCRIPTION ---=== -->
                  <div v-if="team.kpiList.length">
                    <div v-for="(kpiera, indexkpi) in team.kpiList" :key="indexkpi">
                      <div class="container pl-4">
                        <hr v-show="!kpiera.edit">
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
                    </div>
                  </div>
                  <hr>
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
                      ><i class="fas fa-plus fs-lg"></i></span>
                    </h5>
                    <form v-show="showEraform" class="inline pl-4 pr-4 pt-2 pb-3" @submit.prevent>
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
                    </form>
                  </div>
                  <div v-if="team.eraList.length">
              <div v-for="(kpiera, indexera) in team.eraList" :key="indexera">
                <hr class="ml-4 mr-4 mt-2">
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
              </div>
              <hr>
            </div>
                </b-col>
              </b-row>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ENDS ==== -->
              <b-row class="text-center">
                <b-col v-if="!team.addNewKpi" class="pb-4">
                  <h5 class="text-primary pb-2">Add KPI</h5>
                  <a
                    @click="team.addNewKpi = true"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus text-success"></i>
                  </a>
                </b-col>
                <b-col v-if="!team.addNewEra" class="pb-4">
                  <h5 class="text-primary pb-2">Add ERA</h5>
                  <a
                    @click="team.addNewEra = true"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus text-success"></i>
                  </a>
                </b-col>
              </b-row>
            </b-container>

            <!--===========================================
               =========== ERA'S CLOSABLE WIDGET ===========
            ================================================-->
           <!-- <div v-if="team.eraList.length">
              <div v-for="(kpiera, indexera) in team.eraList" :key="indexera">
                <hr class="ml-4 mr-4 mt-2">
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
              </div>
              <hr>
            </div> -->
             <!--===================================================
               =========== ERA'S CLOSABLE WIDGET ENDS ===========
            =======================================================-->
          </Widget>
        </div>
      </b-col>
      <b-col lg="4" xs="12">
        <!--##=== group involved for add new member here ===##-->
        <Group :team="team" :index="index" :array_="array_"/>
        <!--##=== group involved for add new member here ENDS ===##-->
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
import Group from "@/components/Group/Group";
import { get, call, sync } from "vuex-pathify";
export default {
  name: "AddKpiEra",
  props: { array_: { type: Array } },
  components: { Widget, Group},
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
    addKpi: function(index) {
      if ((this.kpiHeading && this.kpiDescription) !== "") {
        this.addNewTeam[this.$props.array_.length - 1 - index].kpiList.push({
          heading: this.kpiHeading,
          desc: this.kpiDescription,
          edit: false
        });
      }
      (this.kpiHeading = ""), (this.kpiDescription = "");
    },
    editKpi: function(index, indexkpi, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].kpiList[
        indexkpi
      ].heading = val;
    },
    editKpiDesc: function(index, indexkpi, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].kpiList[
        indexkpi
      ].desc = val;
    },
    addEra: function(index) {
      if ((this.eraHeading && this.eraDescription) !== "") {
        this.addNewTeam[this.$props.array_.length - 1 - index].eraList.push({
          heading: this.eraHeading,
          desc: this.eraDescription,
          edit: false
        });
      }
      (this.eraHeading = ""), (this.eraDescription = "");
    },
    editEra: function(index, indexera, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].eraList[
        indexera
      ].heading = val;
    },
    editEraDesc: function(index, indexera, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].eraList[
        indexera
      ].desc = val;
    },

  }
};
</script>

<style src="./AddKpiEra.scss" lang="scss" />
