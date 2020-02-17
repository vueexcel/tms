<template>
  <div>
    <b-row v-if="!team.era_json[0].addEra">
      <b-col>
        <div class="mb-0 p-0">
          <h5 class="pl-4 pt-3 fw-bold">
            ERA
            <span
              @click="showEraForm(index)"
              @dblclick="showEraForm(-1)"
              class="float-right mr-4 ml-1 circle bg-success cursor text-white fw-bold"
            >
              <i class="fas fa-plus fs-lg"></i>
            </span>
          </h5>
          <form v-show="index == showEraform " class="inline pl-4 pr-4 pt-2 pb-3" @submit.prevent>
            <b-form-input name="text" placeholder="ERA Heading" v-model="eraHeading"></b-form-input>
            <br />
            <b-form-textarea
              id="textarea1"
              v-model="eraDescription"
              placeholder="Description..."
              :rows="3"
              :max-rows="6"
            ></b-form-textarea>
            <a
              class="btn btn-default btn-sm mt-2 pl-4 pr-4"
              @click="addEra(index,team); showEraForm(-1); uuid = $uuid.v4()"
            >
              <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
              Add
            </a>
          </form>
        </div>
        <div>
          <!--=== --- ERA HEADING & DESCRIPTION ---=== -->
          <div class="mb-3" v-for="(kpiera, indexera) in team.era_json" :key="indexera">
            <hr class="ml-4 mr-4" v-if="kpiera.title !== '' && kpiera.desc !== ''" />
            <div class="container pl-4">
              <i
                v-show="kpiera.edit == false && kpiera.title !== '' && kpiera.desc !== ''"
                class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-3"
                @click="deleteEra(indexera,index,'era')"
              ></i>
              <span
                v-if="kpiera.edit == false && kpiera.title !== ''"
                class="text-primary fs-larger capitalize"
              >{{kpiera.title}}</span>
              <span v-if="kpiera.title">
                <i
                  v-if="kpiera.edit == false"
                  @click="editERA(indexera, team)"
                  class="fa fa-pencil ml-3 text-secondary cursor"
                  aria-hidden="true"
                ></i>
                <!-- sort btn up down ends -->
                <span
                  v-if="kpiera.title !== '' && kpiera.desc!== '' && kpiera.edit == false"
                  class="pull-right mr-3"
                >
                  <i
                    v-if="indexera !== 1"
                    class="glyphicon glyphicon-chevron-up cursor"
                    @click="sort( team.era_json, kpiera,indexera,'UP',team )"
                  ></i>
                  <i
                    v-if="team.era_json.length-1 !== indexera"
                    class="glyphicon glyphicon-chevron-down ml-2 cursor"
                    @click="sort( team.era_json, kpiera,indexera,'DOWN',team )"
                  ></i>
                </span>
                <!-- sort btn up down ends -->
              </span>
              <input
                v-show="kpiera.edit == true"
                v-on:keyup.enter="updateEra(indexera, team, index, kpiera)"
                v-model="kpiera.title"
                id="user-name"
                type="text"
                class="form-control"
              />
              <section class="bg-white">
                <div class="w-75" style="white-space: pre-line;">
                  <h4 class="text-primary"></h4>
                  <span v-show="kpiera.edit == false && kpiera.desc !== ''">{{kpiera.desc}}</span>
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
  </div>
</template>

<script>
import { call, sync } from "vuex-pathify";
export default {
  name: "AddEra",
  props: {
    team: { type: Object },
    index: { type: Number },
    showEraform: { type: Number }
  },
  computed: {
    addNewTeam: sync("adminKPI/addNewTeam"), //array
    eraHeading: sync("adminKPI/eraHeading"), //v-model
    eraDescription: sync("adminKPI/eraDescription") //v-model
  },
  methods: {
    api_delKpi: call("adminKPI/delKpi"),
    api_updateKpi: call("adminKPI/updateKpi"),
    api_updateSorting: call("adminKPI/updateKpiEra"),
    showEraForm(value) {
      this.$emit("setEraFormIndex", value);
    },
    closeAlert() {
      this.alertIndex = -1;
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
      this.eraHeading = "";
      this.eraDescription = "";
    },
    deleteEra: function(eraIndex, mainIndex, KPIorERA) {
      this.api_delKpi({
        index: eraIndex,
        mainIndex: mainIndex,
        KPIorERA: KPIorERA
      });
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
  }
};
</script>