<template>
  <div>
    <b-row v-for="(team,index) in array_.slice().reverse()" :key="index">
      <b-col lg="8" xs="12">
        <div class="pb-xlg">
          <Widget class="mb-0 p-0">
            <h4 class="pl-4 pt-3">
              {{ team.kpi_name }}
              <i
                v-if="team.kpi_json.length <2 && team.era_json.length <2 "
                class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-4"
                @click="deleteFullKpi(team)"
              ></i>
            </h4>
            <hr />
            <b-container class="pb-0 pl-0 pr-0">
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
                      <br />
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
                        @click="addKpi(index, team); showKpiform = -1; uuid = $uuid.v4()"
                      >
                        <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                        Add
                      </a>
                    </form>
                  </div>
                  <!--=== KPI ADD BUTTON & FORM ENDS=== -->

                  <!--=== --- KPI HEADING & DESCRIPTION ---=== -->
                  <div class="mb-5">
                    <b-alert
                      class="alert-transparent ml-3 mr-3"
                      show
                      v-if="alertIndex == index"
                      variant="danger"
                    >
                      both fields are mandatory!
                      <i
                        class="fas fa-times fs-mini text-secondary cursor pull-right pt-1"
                        @click="closeAlert()"
                      ></i>
                    </b-alert>
                    <div v-for="(kpiera, indexkpi) in team.kpi_json" :key="indexkpi">
                      <div class="container pl-4">
                        <hr v-show="kpiera.title !== '' && kpiera.desc!== ''" />
                        <i
                          v-if="kpiera.title !== '' && kpiera.desc!== '' && kpiera.edit == false"
                          class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-3"
                          @click="deleteKpi(indexkpi, index, 'kpi')"
                        ></i>
                        <span
                          v-if="kpiera.edit == false"
                          class="text-primary fs-larger capitalize"
                        >{{kpiera.title}}</span>
                        <span v-if="kpiera.title">
                          <i
                            v-if="kpiera.edit == false"
                            @click="editKPI(indexkpi, kpiera)"
                            class="fa fa-pencil ml-3 text-secondary cursor"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <!-- sort btn up down ends -->
                        <span
                          v-if="kpiera.title !== '' && kpiera.desc!== '' && kpiera.edit == false"
                          class="pull-right mr-3"
                        >
                          <i
                            v-if="indexkpi !== 1"
                            class="glyphicon glyphicon-chevron-up cursor"
                            @click="sort( team.kpi_json, kpiera,indexkpi,'UP',team )"
                          ></i>
                          <i
                            v-if="team.kpi_json.length-1 !== indexkpi"
                            class="glyphicon glyphicon-chevron-down ml-2 cursor"
                            @click="sort( team.kpi_json, kpiera,indexkpi,'DOWN',team )"
                          ></i>
                        </span>
                        <!-- sort btn up down ends -->
                        <input
                          v-on:keyup.enter="updateKpi(indexkpi, kpiera, team, index)"
                          v-model="kpiera.title"
                          v-show="kpiera.edit == true"
                          id="user-name"
                          type="text"
                          class="form-control"
                        />
                        <section class="bg-white">
                          <div class="w-75" style="white-space: pre-line;">
                            <h4 class="text-primary"></h4>
                            <span v-show="kpiera.edit == false">{{kpiera.desc}}</span>
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
                  <hr />
                  <!--=== --- KPI HEADING & DESCRIPTION ENDS---=== -->
                </b-col>
              </b-row>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ==== -->
              <AddEra :index="index" :team="team" :showEraform="showEraform" />
              <div class="mb-4"></div>
              <!-- ==== ROW FOR ERA (ADDED) ERA's ENDS ==== -->
              <!-- ####################### AddKPI/ERA BIG BUTTONS ################################ -->
              <b-row class="text-center">
                <b-col v-if="team.kpi_json[0].addKpi" class="pb-4">
                  <h5 class="text-primary pb-2">Add KPI</h5>
                  <a
                    @click="addNewKPI(index, team)"
                    class="position-relative btn btn-outline-secondary rounded-circle fs-large btn-Custom"
                  >
                    <i class="fas fa-plus position-absolute customPosPlus text-success"></i>
                  </a>
                </b-col>
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
        <Group :index="index" :array_="getAllMember" />
        <!--##=== group involved for add new member here ENDS ===##-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
//eslint-disable-next-line
import $ from "jquery";
// import "imports-loader?window.jQuery=jquery,this=>window!widgster"; // eslint-disable-line
// import "imports-loader?jQuery=jquery,this=>window!flot";
// import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import AddEra from "@/components/AddKpiEra/AddEra";
import Widget from "@/components/Widget/Widget";
import Group from "@/components/Group/Group";
//eslint-disable-next-line
import { get, call, sync } from "vuex-pathify";
import { uuid } from "vue-uuid";
export default {
  name: "AddKpiEra",
  props: { array_: { type: Array } },
  components: { Widget, Group, AddEra },
  computed: {
    addNewTeam: sync("adminKPI/addNewTeam"), //array
    kpiHeading: sync("adminKPI/kpiHeading"), //v-model
    kpiDescription: sync("adminKPI/kpiDescription"), //v-model
    eraHeading: sync("adminKPI/eraHeading"), //v-model
    eraDescription: sync("adminKPI/eraDescription"), //v-model
    searchField: sync("adminKPI/searchField"), //v-model
    getAllMember: sync("allMember/allMember"),
    getCurrentUser: sync("profile/user") // fetch current user data
  },
  mounted() {},
  data() {
    return {
      showKpiform: -1,
      showEraform: -1,
      alertIndex: -1,
      active: false,
      uuid: uuid.v1(),
      v1: this.$uuid.v1(),
      v4: this.$uuid.v4()
    };
  },
  methods: {
    getAllMembers() {
      this.getAllMembers_();
    },
    getAllMembers_: call("allMember/getAllMember"),
    getProfile: call("profile/getProfile"),
    api_AddKpi: call("adminKPI/addKpi"),
    api_delKpi: call("adminKPI/delKpi"),
    api_updateKpi: call("adminKPI/updateKpi"),
    api_deleteKpi: call("adminKPI/deleteKpi"),
    api_updateSorting: call("adminKPI/updateKpiEra"),
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
      }
    },
    closeAlert() {
      this.alertIndex = -1;
    },
    get_profile: function() {
      this.getProfile();
    },
    addKpi: function(index, team_) {
      // update API needs to be called everyTime
      let team = {
        addKpi: true,
        _id: team_._id,
        kpi_name: team_.kpi_name,
        kpi_json: [
          {
            title: this.kpiHeading,
            desc: this.kpiDescription,
            ID: this.uuid
          }
        ]
      };
      this.api_updateKpi({
        data: team
      });
      (this.kpiHeading = ""), (this.kpiDescription = "");
    },
    editKPI: function(index, val) {
      val.edit = true;
    },
    updateKpi: function(index, kpiera, team, indexOfMainArray) {
      if (!kpiera.desc || !kpiera.title) {
        this.alertIndex = indexOfMainArray;
      } else {
        team.kpi_json[index].edit = false;
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
        this.api_updateKpi({
          data: somevar,
          indexOfMainArray: indexOfMainArray
        });
        this.closeAlert();
      }
    },
    editERA: function(index, val) {
      val.era_json[index].edit = true;
    },
    updateEra(index, team, mainIndex, kpiera) {
      if (!kpiera.desc || !kpiera.title) {
        this.alertIndex = mainIndex;
      } else {
        team["addEra"] = true;
        this.api_updateKpi({
          data: team
        });
        team.era_json[index].edit = false;
        this.closeAlert();
      }
    },
    editKpiDesc: function(index, indexkpi, val) {
      this.addNewTeam[this.$props.array_.length - 1 - index].kpiList[
        indexkpi
      ].desc = val;
    },
    deleteKpi: function(kpiIndex, mainIndex, KPIorERA) {
      this.api_delKpi({
        index: kpiIndex,
        mainIndex: mainIndex,
        KPIorERA: KPIorERA
      });
    },
    addEra: function(index, team_) {
      let eraData = {
        addEra: true,
        _id: team_._id,
        kpi_name: team_.kpi_name,
        era_json: [
          {
            title: this.eraHeading,
            desc: this.eraDescription,
            ID: this.uuid
          }
        ]
      };
      this.api_updateKpi({
        data: eraData
      });
      (this.eraHeading = ""), (this.eraDescription = "");
    },
    deleteEra: function(eraIndex, mainIndex, KPIorERA) {
      this.api_delKpi({
        index: eraIndex,
        mainIndex: mainIndex,
        KPIorERA: KPIorERA
      });
    },
    deleteFullKpi(team) {
      this.api_deleteKpi(team._id);
    },
    addNewKPI(index, team) {
      team.kpi_json[0].addKpi = false;
      this.showKpiform = index;
    },
    addNewERA(index, team) {
      team.era_json[0].addEra = false;
      this.showEraform = index;
    },
    // soritng KPI/ ERA
    sort(arr, kpiera, index, pos, team) {
      arr.splice(index, 1);
      if (pos === "UP") {
        arr.splice(index - 1, 0, kpiera);
      } else {
        arr.splice(index + 1, 0, kpiera);
      }
      let sortedData = {};
      sortedData._id = team._id;
      sortedData.kpi_json = team.kpi_json;
      sortedData.era_json = team.era_json;
      sortedData.kpi_name = team.kpi_name;
      this.api_updateSorting(sortedData);
    }
  },
  created() {
    this.getAllMembers();
  }
};
</script>

<style src="./AddKpiEra.scss" lang="scss" />
