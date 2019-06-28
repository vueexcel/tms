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
              v-if="!loading && Object.keys(user).length"
              @submit.prevent="submit"
            >
              <fieldset v-if="!usersMonthlyReport">
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
                    <p v-if="kpi.title" class="text-muted fw-bold text-danger">*required</p>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if report data found KPI
              ------------------->
              <fieldset v-if="usersMonthlyReport">
                <h3>KPI</h3>
                <hr>
                <div
                  class="form-group row"
                  v-for="(kpi, index) in usersMonthlyReport.kpi"
                  :key="index"
                >
                  <label class="col-md-6 control-label text-md-left">
                    <span class="fw-bold">{{ kpi.title }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
                  <div class="col-md-6">
                    <h4 class="white-space">{{ kpi.comment }}</h4>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if report data found ends KPI
              ------------------->
              <fieldset v-if="!usersMonthlyReport">
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
                    ></b-form-textarea>
                    <p v-if="era.title" class="text-muted fw-bold text-success">*optional</p>
                  </div>
                </div>
                <hr>
              </fieldset>
              <!----------------- 
                *if report data found ERA
              ------------------->
              <fieldset v-if="usersMonthlyReport">
                <h3>ERA</h3>
                <hr>
                <div
                  class="form-group row"
                  v-for="(kpi, index) in usersMonthlyReport.era"
                  :key="index"
                >
                  <label class="col-md-6 control-label text-md-left">
                    <span class="fw-bold">{{ kpi.title }}</span>
                    <br>
                    <span>{{ kpi.desc }}</span>
                  </label>
                  <div class="col-md-6">
                    <h4 class="white-space">{{ kpi.comment | nocomment }}</h4>
                  </div>
                </div>
              </fieldset>
              <!----------------- 
                *if report data found ends ERA
              ------------------->
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button
                      v-if="!usersMonthlyReport.kpi"
                      type="submit"
                      class="btn btn-success"
                    >Submit</button>
                  </div>
                  <div class="col-md-4 col-12">
                    <button
                      v-if="usersMonthlyReport.kpi && !reportStatus.length"
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
    <!-- :show="isNotificationOpen" -->
    <b-alert
      v-if="isNotificationOpen"
      v-model="openalertAfter"
      variant="danger text-center"
      :class="{ alertTransform: true, alertAfter: alertAfter }"
      dismissible
    >
      <!-- Your date of joining is 26 you can submit your monthly report after
      <span
        class="fw-semi-bold"
      >19th</span>
      of this month-->
      {{ alertMsg }}
    </b-alert>
  </div>
</template>

<script>
import { get, call } from "vuex-pathify";
import moment from "moment-timezone";
import Vue from "vue";
export default {
  name: "monthlyReport",
  data() {
    return {
      todaysDate: moment().format("D"),
      KpiDescription: [],
      EraDescription: [],
      setPayload: {}, //mainPayload
      setPayloadKPI: [], //KPI array
      setPayloadERA: [], //ERA array
      loading: true,
      usersMonthlyReport: "",
      reportStatus: [],
      allUserData: "",
      isNotificationOpen: true,
      alertAfter: false,
      alertMsg: "",
      openalertAfter: false
    };
  },
  computed: {
    user: get("profile/user"),
    checkDoj() {
      if (moment(this.user.dateofjoining).format("D") > 7) {
        return moment(this.user.dateofjoining).format("D") - 7;
      } else {
        return moment(this.user.dateofjoining).format("D");
      }
      // return this.$moment(val).format("D");
    }
  },
  mounted() {
    this.getReport();
  },
  methods: {
    api_postReview: call("monthlyReport/postReview"),
    api_getReview: call("monthlyReport/getReview"),
    api_deleteReport: call("monthlyReport/deleteReport"),
    async submit() {
      // this.loading = true;
      this.alertAfter = false;
      this.openalertAfter = false;
      this.alertMsg = "";
      let obj = {
        kpi: this.KpiDescription,
        era: this.EraDescription
      };
      let resKpi = await this.prepareKpiEra("kpi");
      let resEra = await this.prepareKpiEra("era");
      this.setPayload["kpi"] = this.setPayloadKPI;
      this.setPayload["era"] = this.setPayloadERA;
      if (resKpi && resEra) {
        this.api_postReview(this.setPayload)
          .then(res => {
            this.getReport();
          })
          .catch(err => {
            this.alertMsg = err.response.data.msg;
            this.alertAfter = true;
            this.openalertAfter = true;
          });
      }
      this.KpiDescription = [];
      this.EraDescription = [];
      this.setPayloadKPI = [];
      this.setPayloadERA = [];
    },
    getReport() {
      this.loading = true;
      this.api_getReview()
        .then(res => {
          if (res.data.length) {
            this.allUserData = res.data[0];
            this.usersMonthlyReport = res.data[0].report;
            this.reportReviewStatus(); //set review status
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 401) {
            this.$router.push("/");
          }
          this.loading = false;
        });
    },
    prepareKpiEra(key) {
      if (key === "kpi") {
        this.user.kpi.kpi_json.forEach((element, i) => {
          if (element.title !== "" && element.desc !== "") {
            let title = element.title;
            this.setPayloadKPI.push({
              title: element.title,
              desc: element.desc,
              id: element.ID,
              comment: this.KpiDescription[i]
            });
          }
        });
      } else if (key === "era") {
        this.user.kpi.era_json.forEach((element, i) => {
          if (element.title !== "" && element.desc !== "") {
            let title = element.title;
            this.setPayloadERA.push({
              title: element.title,
              desc: element.desc,
              id: element.ID,
              comment: this.EraDescription[i]
            });
          }
        });
      }
      return true;
    },
    deleteMonthlyReport() {
      this.loading = true;
      const reportID = this.allUserData._id;
      this.api_deleteReport(reportID)
        .then(res => {
          if (res.status === 200) {
            this.usersMonthlyReport = "";
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    reportReviewStatus() {
      if (this.allUserData) {
        let result = this.allUserData.is_reviewed.filter(
          element => element.reviewed === true
        );
        this.reportStatus = result;
      }
    }
  },
  filters: {
    nocomment: function(value) {
      if (!value) return "null";
      return value;
    }
    // checkDoj(val) {
    //   if (moment(val).format("D") > 7) {
    //     return moment(val).format("D") - 7;
    //   } else {
    //     return moment(val).format("D");
    //   }
    //   // return this.$moment(val).format("D");
    // }
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
.alertTransform {
  transition: 0.6s;
  transition-timing-function: ease;
  transform: translateX(-130vw);
  padding-right: 1.25rem;
}

.alertAfter {
  transform: translateX(0);
}
</style>
