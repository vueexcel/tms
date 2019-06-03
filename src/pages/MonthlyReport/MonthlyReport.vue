<template>
  <div>
    <h1 class="page-title">Monthly Report</h1>
    <b-container class="shadow bg-white no-gutters p-4" fluid>
      <b-row>
        <b-col xs="12" class="pt-4">
          <div>
            <div v-if="false">
              <b-alert class="alert-transparent alert-danger" show>
                <span>No report found</span>
              </b-alert>
            </div>
            <form class="form-horizontal" @submit.prevent="submit" v-if="user">
              <fieldset v-if="!kpiArray.length">
                <!-- add button here -->
                <h3>KPI</h3>
                <hr>
                {{ EraArray }}
                <hr>
                {{ kpiArray }}
                <div class="form-group row" v-for="(kpi, index) in user.kpi.kpi_json" :key="index">
                  <label class="col-md-6 control-label text-md-left" v-if="kpi.title">
                    <span class="fw-bold">{{ kpi.title }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
                  <!-- <span>{{ kpi.desc }}</span> -->
                  <div class="col-md-6">
                    <b-form-textarea
                      v-if="kpi.title"
                      id="textarea1"
                      placeholder="Description.."
                      :ref="kpi.title"
                      v-model="KpiDescription[index]"
                      :rows="3"
                      :max-rows="6"
                      required
                    ></b-form-textarea>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if no data found 
              ------------------->
              <fieldset v-if="kpiArray.length">
                <!-- add button here -->
                <h3>KPI</h3>
                <hr>
                <!-- {{ EraArray }}
                <hr>
                {{ kpiArray }}-->
                <div class="form-group row" v-for="(kpi, index) in kpiArray" :key="index">
                  <label class="col-md-6 control-label text-md-left">
                    <span class="fw-bold">{{ kpi.title }}</span>
                    <br>
                    <!-- <span>{{ kpi.desc }}</span> -->
                  </label>
                  <!-- <span>{{ kpi.desc }}</span> -->
                  <div class="col-md-6">
                    <h4>{{ kpi.value }}</h4>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if no data found ends
              ------------------->
              <fieldset>
                <!-- add button here -->
                <h3>ERA</h3>
                <hr>
                <div class="form-group row" v-for="(era, index) in user.kpi.era_json" :key="index">
                  <label class="col-md-6 control-label text-md-left" v-if="era.title">
                    <span class="fw-bold">{{ era.title }}</span>
                    <br>
                    <span>{{ era.desc }}</span>
                  </label>
                  <!-- <span>{{ era.desc }}</span> -->
                  <div class="col-md-6">
                    <b-form-textarea
                      v-if="era.title"
                      id="textarea1"
                      placeholder="Description.."
                      :ref="era.title"
                      :rows="3"
                      v-model="EraDescription[index]"
                      :max-rows="6"
                      required
                    ></b-form-textarea>
                  </div>
                </div>
                <hr>
              </fieldset>
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button type="submit" class="btn btn-success">Submit</button>
                  </div>
                  <div class="col-md-4 col-12" v-if="false">
                    <button type="button" class="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { get, call } from "vuex-pathify";
import Vue from "vue";
export default {
  name: "monthlyReport",
  data() {
    return {
      KpiDescription: [],
      EraDescription: [],
      newArray: {},
      userKpi: {},
      userEra: {},
      EraArray: [],
      kpiArray: []
    };
  },
  computed: {
    user: get("profile/user")
  },
  mounted() {
    this.getReport();
  },
  methods: {
    api_postReview: call("monthlyReport/postReview"),
    api_getReview: call("monthlyReport/getReview"),
    async submit() {
      let obj = {
        kpi: this.KpiDescription,
        era: this.EraDescription
      };
      let response = await this.callFunction("kpi");
      let response2 = await this.callFunction("era");
      if (response && response2) {
        // this.api_postReview(JSON.stringify(this.newArray));
        this.api_postReview(this.newArray)
          .then(res => {
            this.getReport();
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.KpiDescription = [];
      this.EraDescription = [];
    },
    getReport() {
      this.api_getReview()
        .then(res => {
          // console.log(res.data[0].report);
          this.user.kpi.kpi_json.forEach(element => {
            if (element.title !== "") {
              this.userKpi[element.title] = res.data[0].report[element.title];
              this.userKpi[desc] = element.desc;
              this.$forceUpdate();
            }
          });
          this.user.kpi.era_json.forEach(element => {
            if (element.title !== "") {
              this.userEra[element.title] = res.data[0].report[element.title];
              this.userEra[desc] = element.desc;
              this.$forceUpdate();
            }
          });
          for (var key in this.userKpi) {
            this.kpiArray.push({
              title: key,
              value: this.userKpi[key]
            });
          }
          for (var key in this.userEra) {
            this.EraArray.push({
              title: key,
              value: this.userEra[key]
            });
          }
          console.log(this.EraArray, this.kpiArray);
        })
        .catch(err => {
          console.log(err);
        });
    },
    callFunction(key) {
      if (key === "kpi") {
        this.user.kpi.kpi_json.forEach((element, i) => {
          if (element.title !== "") {
            let title = element.title;
            this.newArray[`${element.title}`] = this.KpiDescription[i];
          }
        });
      } else if (key === "era") {
        this.user.kpi.era_json.forEach((element, i) => {
          if (element.title !== "") {
            let title = element.title;
            this.newArray[`${element.title}`] = this.EraDescription[i];
          }
        });
      }
      return true;
    }
  }
};
</script>

<style>
</style>
