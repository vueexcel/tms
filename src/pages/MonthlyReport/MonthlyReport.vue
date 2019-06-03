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
            <form class="form-horizontal" v-if="user">
              <fieldset>
                <!-- add button here -->
                <h3>KPI</h3>
                <hr>
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
                    ></b-form-textarea>
                  </div>
                </div>
              </fieldset>
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
                    ></b-form-textarea>
                  </div>
                </div>
                <hr>
              </fieldset>
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button type="button" class="btn btn-success" @click="submit">Submit</button>
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
      newArray: {}
    };
  },
  computed: {
    user: get("profile/user")
  },
  methods: {
    api_postReview: call("monthlyReport/postReview"),
    async submit() {
      let obj = {
        kpi: this.KpiDescription,
        era: this.EraDescription
      };
      let response = await this.callFunction("kpi");
      let response2 = await this.callFunction("kra");
      if (response && response2) {
        this.api_postReview(this.newArray);
      }
      this.KpiDescription = [];
      this.EraDescription = [];
    },
    callFunction(key) {
      if (key === "kpi") {
        this.user.kpi.kpi_json.forEach((element, i) => {
          if (element.title !== "") {
            let title = element.title;
            this.newArray[`${element.title}`] = this.KpiDescription[i];
          }
        });
      } else if (key === "kra") {
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
