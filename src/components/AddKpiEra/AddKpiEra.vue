<template>
  <div>
    <b-row v-for="(team,index) in array_.slice().reverse()" :key="index">
      <b-col lg="8" xs="12">
        <div class="pb-xlg">
          <Widget class="mb-0 p-0">
            <h4 class="pl-4 pt-3">{{ team.kpi_name }}</h4>
            <hr>
            <b-container class="pb-0 pl-0 pr-0">
              <!-- v-if="!team.kpi_json[0].addKpi" -->
              <b-row v-if="!team.kpi_json[0].addKpi">
                <b-col>
                  <!--=== KPI ADD BUTTON & FORM === -->
                  <div class="mb-0 p-0">
                    <h5 class="pl-4 pt-3 fw-bold">
                      KPI
                      <span
                        @click="showKpiform = index"
                        @dblclick="showKpiform = -1"
                        class="float-right mr-4 ml-1 circle bg-success cursor text-white fw-bold"
                      >
                        <i class="fas fa-plus fs-lg"></i>
                      </span>
                    </h5>
                    <form
                      v-show="index == showKpiform"
                      class="inline pl-4 pr-4 pt-2 pb-2"
                      @submit.prevent
                    >
                      <b-form-input name="text" placeholder="KPI Heading" v-model="kpiHeading"></b-form-input>
                      <br>
                      <!-- <textarea id="textarea1" @keydown="inputHandler" rows="6"></textarea> -->
                      <b-form-textarea
                        id="textarea1"
                        v-model="kpiDescription"
                        placeholder="Description..."
                        :rows="3"
                        :max-rows="6"
                      ></b-form-textarea>
                      <a
                        class="btn btn-default btn-sm mt-2 pl-4 pr-4"
                        @click="addKpi(index, team); showKpiform = -1"
                      >
                        <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                        Add
                      </a>
                    </form>
                  </div>
                  <!--=== KPI ADD BUTTON & FORM ENDS=== -->

                  <!--=== --- KPI HEADING & DESCRIPTION ---=== -->
                  <!-- MAIN : ==== {{team.kpi_json}} -->
                  <div class="mb-5">
                    <div v-for="(kpiera, indexkpi) in team.kpi_json" :key="indexkpi">
                      <div class="container pl-4">
                        <hr v-show="kpiera.title !== '' && kpiera.desc!== ''">
                        <i
                          v-if="kpiera.title !== '' && kpiera.desc!== '' && kpiera.edit == false"
                          class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-3"
                          @click="deleteKpi(team)"
                        ></i>
                        <span
                          v-if="kpiera.edit == false"
                          class="text-primary fs-larger"
                          @dblclick="editKPI(indexkpi, kpiera)"
                        >{{kpiera.title}}</span>
                        <input
                          v-on:keyup.enter="updateKpi(indexkpi, kpiera, team)"
                          v-model="kpiera.title"
                          v-show="kpiera.edit == true"
                          id="user-name"
                          type="text"
                          class="form-control"
                        >
                        <!-- v-show="kpiera.edit == false" -->
                        <section class="bg-white">
                          <div class="w-75" style="white-space: pre-line;">
                            <h4 class="text-primary"></h4>
                            <span>{{kpiera.desc}}</span>
                            <b-form-textarea
                              id="textarea1"
                              v-show="kpiera.edit == true"
                              v-model="kpiera.desc"
                              :rows="3"
                              :max-rows="6"
                            ></b-form-textarea>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                  <!-- v-if="!team.kpi_json[0].addKpi" -->
                  <hr>
                  <!--=== --- KPI HEADING & DESCRIPTION ENDS---=== -->
                </b-col>
              </b-row>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ==== -->
              <!-- v-if="!team.era_json[0].addEra" -->
              <b-row v-if="!team.era_json[0].addEra">
                <b-col>
                  <div class="mb-0 p-0">
                    <h5 class="pl-4 pt-3 fw-bold">
                      ERA
                      <span
                        @click="showEraform = index"
                        @dblclick="showEraform = -1"
                        class="float-right mr-4 ml-1 circle bg-success cursor text-white fw-bold"
                      >
                        <i class="fas fa-plus fs-lg"></i>
                      </span>
                    </h5>
                    <form
                      v-show="index == showEraform"
                      class="inline pl-4 pr-4 pt-2 pb-3"
                      @submit.prevent
                    >
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
                        @click="addEra(index,team); showEraform = -1"
                      >
                        <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                        Add
                      </a>
                    </form>
                  </div>
                  <div>
                    <!--=== --- ERA HEADING & DESCRIPTION ---=== -->
                    <div class="mb-3" v-for="(kpiera, indexera) in team.era_json" :key="indexera">
                      <hr class="ml-4 mr-4" v-if="kpiera.title !== '' && kpiera.desc !== ''">
                      <div class="container pl-4">
                        <i
                          v-show="kpiera.edit == false"
                          class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-3"
                          @click="deleteEra(kpiera, team)"
                        ></i>
                        <span
                          v-if="kpiera.edit == false && kpiera.title !== ''"
                          @dblclick="editERA(indexera, team)"
                          class="text-primary fs-larger"
                        >{{kpiera.title.toUpperCase()}}</span>
                        <input
                          v-show="kpiera.edit == true"
                          v-on:keyup.enter="updateEra(indexera, team)"
                          v-model="kpiera.title"
                          id="user-name"
                          type="text"
                          class="form-control"
                        >

                        <section class="bg-white">
                          <div class="w-75" style="white-space: pre-line;">
                            <h4 class="text-primary"></h4>
                            <span
                              v-show="kpiera.edit == false && kpiera.desc !== ''"
                            >{{kpiera.desc}}</span>
                            <b-form-textarea
                              id="textarea1"
                              v-show="kpiera.edit == true"
                              v-model="kpiera.desc"
                              :rows="3"
                              :max-rows="6"
                            ></b-form-textarea>
                          </div>
                        </section>
                      </div>
                    </div>
                    <!--=== --- ERA HEADING & DESCRIPTION ENDS---=== -->
                  </div>
                </b-col>
              </b-row>
              <div class="mb-4"></div>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ENDS ==== -->
              <!-- ####################### AddKPI/ERA BIG BUTTONS ################################ -->
              <!-- v-if="team.kpi_json[0].addKpi || team.era_json[0].addEra" -->
              <b-row class="text-center">
                <!-- v-if="team.kpi_json[0].addKpi" -->
                <b-col v-if="team.kpi_json[0].addKpi" class="pb-4">
                  <h5 class="text-primary pb-2">Add KPI</h5>
                  <a
                    @click="addNewKPI(index, team)"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus text-success"></i>
                  </a>
                </b-col>
                <!-- v-if="team.era_json[0].addEra" -->
                <b-col v-if="team.era_json[0].addEra" class="pb-4">
                  <h5 class="text-primary pb-2">Add ERA</h5>
                  <a
                    @click="addNewERA(index, team)"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus text-success"></i>
                  </a>
                </b-col>
              </b-row>
              <!-- ####################### AddKPI/ERA BIG BUTTONS ENDS ################################ -->
            </b-container>
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
  components: { Widget, Group },
  computed: {
    addNewTeam: sync("adminKPI/addNewTeam"), //array
    kpiHeading: sync("adminKPI/kpiHeading"), //v-model
    kpiDescription: sync("adminKPI/kpiDescription"), //v-model
    eraHeading: sync("adminKPI/eraHeading"), //v-model
    eraDescription: sync("adminKPI/eraDescription"), //v-model
    searchField: sync("adminKPI/searchField") //v-model
  },
  mounted() {},
  data() {
    return {
      showKpiform: -1,
      showEraform: -1
    };
  },
  methods: {
    getProfile: call("profile/getProfile"),
    api_AddKpi: call("adminKPI/addKpi"),
    api_delKpi: call("adminKPI/delKpi"),
    api_updateKpi: call("adminKPI/updateKpi"),
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
      }
    },
    get_profile: function() {
      this.getProfile({
        Authorization: localStorage.getItem("authenticated")
      });
    },
    addKpi: function(index, team_) {
      // update API needs to be called everyTime
      let team = {
        addKpi: true,
        _id: team_._id,
        kpi_name: team_.kpi_name,
        kpi_json: [{ title: this.kpiHeading, desc: this.kpiDescription }]
      };
      this.api_updateKpi({
        data: team
      });
      (this.kpiHeading = ""), (this.kpiDescription = "");
    },
    editKPI: function(index, val) {
      console.log(index, val, "9090909090909");
      // val.kpi_json[index].edit = true;
      val.edit = true;
    },
    updateKpi: function(index, kpiera, team) {
      console.log(index, kpiera, team, "update me ya aa rha hai?");

      team.kpi_json[index].edit = false;
      // team.edit = false;
      let somevar = {
        updateKpi: true,
        addKpi: true,
        kpi_json: [
          {
            desc: kpiera.desc,
            edit: kpiera.edit,
            title: kpiera.title
          }
        ],
        kpi_name: team.kpi_name,
        _id: team._id
      };
      // team["addKpi"] = true;
      // team["kpi_json"] = team;
      this.api_updateKpi({
        data: somevar
      });
    },
    editERA: function(index, val) {
      val.era_json[index].edit = true;
    },
    updateEra(index, team) {
      team["addEra"] = true;
      this.api_updateKpi({
        data: team
      });
      team.era_json[index].edit = false;
    },
    editKpiDesc: function(index, indexkpi, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].kpiList[
        indexkpi
      ].desc = val;
    },
    deleteKpi: function(team) {
      this.api_delKpi({
        id: team._id
      });
    },
    addEra: function(index, team_) {
      let eraData = {
        addEra: true,
        _id: team_._id,
        kpi_name: team_.kpi_name,
        era_json: [{ title: this.eraHeading, desc: this.eraDescription }]
      };
      this.api_updateKpi({
        data: eraData
      });
      (this.eraHeading = ""), (this.eraDescription = "");
    },
    // editEra: function(index, indexera, val) {
    //   if (val !== "") {
    //     this.addNewTeam[this.$props.array_.length - 1 - index].eraList[
    //       indexera
    //     ].heading = val;
    //   } else {
    //     this.addNewTeam[this.$props.array_.length - 1 - index].eraList.splice(
    //       indexera,
    //       1
    //     );
    //   }
    // },
    deleteEra: function(index, team) {
      this.api_delKpi({
        id: team._id
      });
    },
    addMember: function(i, index, name) {
      for (let index = 0; index < this.allMembers.length; index++) {
        const element = this.allMembers[index].name;
        if (element == name) {
          var addMemberToList = this.allMembers[index];
        }
      }
      this.addNewTeam[this.$props.array_.length - 1 - index].memberList.push(
        addMemberToList
      );
    },
    removeMember: function(key, index) {
      this.addNewTeam[this.$props.array_.length - 1 - index].memberList.splice(
        key,
        1
      );
    },
    addNewKPI(index, team) {
      team.kpi_json[0].addKpi = false;
    },
    addNewERA(index, team) {
      team.era_json[0].addEra = false;
    }
  }
};
</script>

<style src="./AddKpiEra.scss" lang="scss" />
