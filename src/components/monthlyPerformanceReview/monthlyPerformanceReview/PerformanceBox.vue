<template>
  <div>
    <b-row class="shadow">
      <!-- user/ employee data ( LEFT BOX ) -->
      <!-- <b-col xs="12" sm="6" class="bg-warning rounded-left">
        <UserMonthlyReport :user="data_[activeId]" :variant="'text-warning'"/>
        <UserMonthlyReport :variant="'text-info'"/>
      </b-col>-->
      <!-- user/ employee data ( LEFT BOX ) ends-->
      <!--#### RIGHT SIDE FORM ####-->
      <b-col xs="12" sm="12" class="rounded-right mb-3">
        <div class="text-center mt-5 pt-5" v-if="loading">
          <div>
            <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
          </div>Loading...
        </div>
        <div v-else>
          <b-alert
            show
            dismissible
            class="alert-class mt-3"
          >Info: Overall rating/ comments mandatory for managers based on monthly report</b-alert>

          <b-form @submit.prevent="submit">
            {{ reviews }} {{ report }}
            <div v-if="managerComment.review">
              <div>
                <h3>KPI</h3>
                <hr />
                <div v-for="(kpi, index) in managerComment.review.comment.kpi" :key="index">
                  <div class="m-0" v-if="kpi.comment">
                    <p class="text-secondary fw-bold">{{ kpi.title }}</p>
                    <p>{{ kpi.desc }}</p>
                    <p class="m-0 p-0 fw-bold text-monospace">Report:</p>
                    <span>{{ managerComment.kpi[index].comment }}</span>
                    <starRating :starSize="'20px'" :displayStar="10" :ratedStar="kpi.rating" />
                  </div>
                  <p v-if="kpi.comment">
                    <span class="text-info fw-bold">Your comment:</span>
                  </p>
                  <div class="dialogbox" v-if="kpi.comment">
                    <div class="body">
                      <span class="tip tip-up"></span>
                      <div class="message">
                        <span>{{ kpi.comment }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3>ERA</h3>
                <hr />
                <div v-for="(era, index) in managerComment.review.comment.era" :key="index">
                  <div class="m-0" v-if="era.comment">
                    <p class="text-secondary fw-bold">{{ era.title }}</p>
                    <p>{{ era.desc }}</p>
                    <p class="m-0 p-0 fw-bold text-monospace">Report:</p>
                    <span>{{ managerComment.era[index].comment }}</span>
                    <starRating :starSize="'20px'" :displayStar="10" :ratedStar="era.rating" />
                  </div>
                  <p v-if="era.comment">
                    <span class="text-info fw-bold">Your comment:</span>
                  </p>
                  <div class="dialogbox" v-if="era.comment">
                    <div class="body">
                      <span class="tip tip-up"></span>
                      <div class="message">
                        <span>{{ era.comment }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ###### KPI ERA form prior review ##### -->
            <div v-if="!managerComment.review">
              <h3>KPI</h3>
              <hr />
              <div
                class="pb-4"
                v-for="( kpireport, indexkpi ) in activeEmployeReport.report.kpi"
                :key="indexkpi"
              >
                <h5 class="text-primary fw-bold">{{ kpireport.title }}</h5>
                <h6 class="fs-semi-bold mb-3">{{ kpireport.desc }}</h6>
                <h6 class="text-monospace">Report:</h6>
                <div class="dialogbox">
                  <div class="body">
                    <span class="tip tip-up"></span>
                    <div class="message">
                      <span>{{ kpireport.comment }}</span>
                    </div>
                  </div>
                </div>
                <starRating
                  :displayStar="10"
                  :starSize="'20px'"
                  :ratedStar="ratedStarKpi[indexkpi]"
                  @starRatingSelected="submitStarRate($event, indexkpi)"
                />
                <b-form-textarea
                  :rows="3"
                  v-model="textkpi[indexkpi]"
                  placeholder="Performance or general comments (if any)..."
                />
              </div>
              <h3>ERA</h3>
              <hr />
              <div
                class="pb-4"
                v-for="( erareport, indexera ) in activeEmployeReport.report.era"
                :key="indexera+erareport.id"
              >
                <div>
                  <h5 class="text-primary fw-bold">{{ erareport.title }}</h5>
                  <h6 class="fs-semi-bold mb-3">{{ erareport.desc }}</h6>
                  <h6 class="text-monospace">Report:</h6>
                  <div class="dialogbox">
                    <div class="body">
                      <span class="tip tip-up"></span>
                      <div class="message">
                        <span>{{ erareport.comment ? erareport.comment : '-NA-' }}</span>
                      </div>
                    </div>
                  </div>
                  <starRating
                    :displayStar="10"
                    :starSize="'20px'"
                    :ratedStar="ratedStarEra[indexera]"
                    @starRatingSelected="submitStarRateera($event, indexera)"
                  />
                  <b-form-textarea
                    :rows="3"
                    v-model="textera[indexera]"
                    placeholder="Performance or general comments (if any)..."
                  />
                </div>
              </div>
            </div>
            <b-alert
              v-if="alertMessage"
              v-model="alertMessageShow"
              variant="danger"
              dismissible
            >{{alertMessage}}</b-alert>
            <b-button
              variant="primary"
              v-if="!managerComment.review"
              class="width-100 mb-xs mr-xs mt-4"
              type="submit"
            >Submit</b-button>
            <b-button
              variant="danger"
              v-else
              @click="delReport"
              class="width-100 mb-xs mr-xs mt-4"
              type="button"
            >Delete</b-button>
          </b-form>
        </div>
      </b-col>
      <!--#### RIGHT SIDE FORM ENDS ####-->
    </b-row>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
import UserMonthlyReport from "@/components/UserMonthlyReport/UserMonthlyReport";
import { sync, call, get } from "vuex-pathify";
export default {
  name: "PerformanceBox",
  props: {
    activeId: {
      type: Number,
      default: 0
    },
    employees: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      textkpi: [],
      textera: [],
      ratedStarKpi: [],
      ratedStarEra: [],
      managerComment: [],
      loading: false,
      alertMessage: "",
      alertMessageShow: false
    };
  },
  components: {
    starRating: starRating,
    UserMonthlyReport: UserMonthlyReport
  },
  computed: {
    activeEmployeReport: sync("monthlyReportReview/activeEmployeReport"),
    activeEmployee: sync("monthlyReportReview/activeEmployee"),
    user: get("profile/user"),
    reviews() {
      if (this.activeEmployeReport.review) {
        this.activeEmployeReport.review.filter(ele => {
          if (ele.manager_id.username === this.user.username) {
            this.managerComment.review = ele;
          }
        });
      }
    },
    report() {
      if (this.activeEmployeReport.report) {
        this.managerComment["kpi"] = this.activeEmployeReport.report.kpi;
        this.managerComment["era"] = this.activeEmployeReport.report.era;
      }
    }
  },
  methods: {
    api_postReview: call("monthlyReportReview/postMonthlyReview"),
    api_deleteMonthlyReport: call("monthlyReportReview/deleteMonthlyReview"),
    api_getReports: call("monthlyReportReview/getUsersMonthlyReports"),
    async submit() {
      this.alertMessage = "";
      this.alertMessageShow = false;
      let kpiArray = [];
      let eraArray = [];
      let comment = {};
      this.activeEmployeReport.report.kpi.forEach((element, i) => {
        if (this.textkpi[i] && this.ratedStarKpi[i]) {
          kpiArray.push({
            title: element.title,
            desc: element.desc,
            id: element.id,
            comment: this.textkpi[i],
            rating: this.ratedStarKpi[i] || 0
          });
        }
      });
      this.activeEmployeReport.report.era.forEach((element, i) => {
        if (this.textera[i] && this.ratedStarEra[i]) {
          eraArray.push({
            title: element.title,
            desc: element.desc,
            id: element.id,
            comment: this.textera[i],
            rating: this.ratedStarEra[i] || 0
          });
        }
      });
      if (
        kpiArray.length === this.activeEmployeReport.report.kpi.length &&
        this.activeEmployeReport.report.era.length === eraArray.length
      ) {
        comment = { kpi: kpiArray, era: eraArray };
        this.loading = true;
        let res = await this.api_postReview({
          id: this.activeEmployeReport._id,
          comment: comment
        });
        if (res.error === true) {
          this.alertMessage = res.res;
          this.alertMessageShow = true;
        } else {
          this.textkpi = [];
          this.textera = [];
          this.api_getReports();
        }
        this.loading = false;
        this.ratedStarKpi = [];
        this.ratedStarEra = [];
      } else {
        this.$emit("moveToBottom");
        this.alertMessage =
          "You need to comment on all ERA/KPI and select respective stars as well";
        this.alertMessageShow = true;
      }
    },
    submitStarRate(value, i) {
      this.$set(this.ratedStarKpi, i, value);
    },
    submitStarRateera(value, i) {
      this.$set(this.ratedStarEra, i, value);
    },

    delReport() {
      this.alertMessage = "";
      this.alertMessageShow = false;
      this.api_deleteMonthlyReport({ id: this.activeEmployeReport._id })
        .then(res => {
          for (var key in this.managerComment) {
            if (key === "review") {
              delete this.managerComment[key];
            }
          }
          this.api_getReports();
        })
        .catch(err => {
          this.alertMessageShow = true;
          this.alertMessage = err.response.data.msg;
        });
    }
  }
};
</script>

<style src="./../monthlyPerformanceReview.scss" lang="scss">
</style>
