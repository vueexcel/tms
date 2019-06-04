<template>
  <div>
    <h1 class="page-title">Monthly Report</h1>
    <i v-if="loading" class="fas fa-circle-notch text-success fa-spin float-right mr-5 mt-3 size"></i>
    <b-container class="shadow bg-white no-gutters p-4 mh-500" fluid>
      <b-row>
        <b-col xs="12" class="pt-4">
          <div>
            <div v-if="false">
              <b-alert class="alert-transparent alert-danger" show>
                <span>No report found</span>
              </b-alert>
            </div>
            <form
              class="form-horizontal"
              @submit.prevent="submit"
              v-if="Object.keys(user).length && !loading"
            >
              <fieldset v-if="!userKpi.length">
                <h3>KPI</h3>
                <hr>
                <div class="form-group row" v-for="(kpi, index) in user.kpi.kpi_json" :key="index">
                  <label class="col-md-6 control-label text-md-left" v-if="kpi.title">
                    <span class="fw-bold">{{ kpi.title }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
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
                *if no data found KPI
              ------------------->
              <fieldset v-if="userKpi.length">
                <h3>KPI</h3>
                <hr>
                <div class="form-group row" v-for="(kpi, index) in userKpi" :key="index">
                  <label class="col-md-6 control-label text-md-left">
                    <span class="fw-bold">{{ Object.keys(kpi)[0] }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
                  <div class="col-md-6">
                    <h4 class="white-space">{{ Object.values(kpi)[0] }}</h4>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if no data found ends KPI
              ------------------->
              <fieldset v-if="!userEra.length">
                <h3>ERA</h3>
                <hr>
                <div class="form-group row" v-for="(era, index) in user.kpi.era_json" :key="index">
                  <label class="col-md-6 control-label text-md-left" v-if="era.title">
                    <span class="fw-bold">{{ era.title }}</span>
                    <br>
                    <span>{{ era.desc }}</span>
                  </label>
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
              <!----------------- 
                *if no data found ERA
              ------------------->
              <fieldset v-if="userEra.length">
                <h3>ERA</h3>
                <hr>
                <div class="form-group row" v-for="(kpi, index) in userEra" :key="index">
                  <label class="col-md-6 control-label text-md-left">
                    <span class="fw-bold">{{ Object.keys(kpi)[0] }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
                  <div class="col-md-6">
                    <h4 class="white-space">{{ Object.values(kpi)[0] }}</h4>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if no data found ends ERA
              ------------------->
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button v-if="!userEra.length" type="submit" class="btn btn-success">Submit</button>
                  </div>
                  <div class="col-md-4 col-12">
                    <button
                      v-if="userEra.length && !reportStatus.length"
                      @click="deleteMonthlyReport()"
                      type="button"
                      class="btn btn-danger"
                    >Delete</button>
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
      setPayload: {},
      userKpi: [],
      userEra: [],
      loading: true,
      usersMonthlyReport: "",
      reportStatus: []
    };
  },
  computed: {
    user: get("profile/user")
  },
  mounted() {
    this.getReport();
    // this.reportReviewStatus();
  },
  methods: {
    api_postReview: call("monthlyReport/postReview"),
    api_getReview: call("monthlyReport/getReview"),
    api_deleteReport: call("monthlyReport/deleteReport"),
    async submit() {
      this.loading = true;
      let obj = {
        kpi: this.KpiDescription,
        era: this.EraDescription
      };
      let resKpi = await this.prepareKpiEra("kpi");
      let resEra = await this.prepareKpiEra("era");
      if (resKpi && resEra) {
        this.api_postReview(this.setPayload)
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
      this.loading = true;
      this.api_getReview()
        .then(res => {
          if (res.data.length) {
            this.usersMonthlyReport = res.data;
            this.reportReviewStatus(); //set review status
            this.user.kpi.kpi_json.forEach(element => {
              if (element.title !== "" && element.desc !== "") {
                this.userKpi.push({
                  [element.title]: res.data[0].report[element.title],
                  desc: element.desc
                });
              }
            });
            this.user.kpi.era_json.forEach(element => {
              if (element.title !== "" && element.desc !== "") {
                this.userEra.push({
                  [element.title]: res.data[0].report[element.title],
                  desc: element.desc
                });
              }
            });
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    prepareKpiEra(key) {
      if (key === "kpi") {
        this.user.kpi.kpi_json.forEach((element, i) => {
          if (element.title !== "") {
            let title = element.title;
            this.setPayload[`${element.title}`] = this.KpiDescription[i];
          }
        });
      } else if (key === "era") {
        this.user.kpi.era_json.forEach((element, i) => {
          if (element.title !== "") {
            let title = element.title;
            this.setPayload[`${element.title}`] = this.EraDescription[i];
          }
        });
      }
      return true;
    },
    deleteMonthlyReport() {
      this.loading = true;
      const reportID = this.usersMonthlyReport[0]._id;
      this.api_deleteReport(reportID)
        .then(res => {
          if (res.status === 200) {
            this.userKpi = [];
            this.userEra = [];
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    reportReviewStatus() {
      if (this.usersMonthlyReport.length) {
        let result = this.usersMonthlyReport[0].is_reviewed.filter(
          element => element.reviewed === true
        );
        this.reportStatus = result;
      }
    }
  }
};
</script>

<style>
.size {
  font-size: 25px;
}
.mh-500 {
  min-height: 500px;
}
.white-space {
  white-space: pre-line;
}
</style>
