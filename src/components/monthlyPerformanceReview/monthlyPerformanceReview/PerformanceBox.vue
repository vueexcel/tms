<template>
  <div>
    <b-row class="shadow">
      <!-- user/ employee data ( LEFT BOX ) -->
      <b-col xs="12" sm="6" class="bg-warning rounded-left">
        <!-- <UserMonthlyReport :user="data_[activeId]" :variant="'text-warning'"/> -->
        <UserMonthlyReport :variant="'text-info'"/>
      </b-col>
      <!-- user/ employee data ( LEFT BOX ) ends-->
      <!--#### RIGHT SIDE FORM ####-->
      <b-col xs="12" sm="6" class="rounded-right mb-3">
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
          <!-- <div class="mb-3 mt-3">
          <h6 class="rating-header mb-2">Overall Rating</h6>
          <div class="border-top"></div>
          <div class="mt-2 font-weight">Based on Monthly Review</div>
        </div>
        <starRating :displayStar="5" :ratedStar="ratedStar" @starRatingSelected="submitStarRate"/>
        <div sm="6">
          <h6 class="text-inverse">Comments</h6>
          </div>-->
          <b-form @submit.prevent="submit">
            {{ reviews }}
            <div v-if="managerComment">
              <div>
                <h3>KPI</h3>
                <hr>
                <div v-for="(kpi, index) in managerComment.comment.kpi" :key="index">
                  <p class="m-0" v-if="kpi.comment">
                    <span class="text-secondary fw-bold">{{ kpi.title }}</span>
                    <starRating :starSize="'20px'" :displayStar="10" :ratedStar="kpi.rating"/>
                  </p>
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
                <hr>
                <div v-for="(era, index) in managerComment.comment.era" :key="index+1">
                  <p class="m-0" v-if="era.comment">
                    <span class="text-secondary fw-bold">{{ era.title }}</span>
                    <starRating :starSize="'20px'" :displayStar="10" :ratedStar="era.rating"/>
                  </p>
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
            <div v-if="!managerComment">
              <h3>KPI</h3>
              <hr>
              <div
                class="pb-4"
                v-for="( kpireport, indexkpi ) in activeEmployeReport.report.kpi"
                :key="indexkpi"
              >
                {{ kpireport.title }}
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
              <hr>
              <div
                class="pb-4"
                v-for="( erareport, indexera ) in activeEmployeReport.report.era"
                :key="indexera+activeEmployeReport.report.kpi.length"
              >
                <div v-if="erareport.comment">
                  {{ erareport.title }}
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
              v-if="!managerComment"
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
    }
  },
  data() {
    return {
      textkpi: [],
      textera: [],
      ratedStarKpi: [],
      ratedStarEra: [],
      managerComment: "",
      loading: false,
      alertMessage: "",
      alertMessageShow: false
    };
  },
  components: {
    starRating: starRating,
    // ExtraWorkFeedback: ExtraWorkFeedback,
    UserMonthlyReport: UserMonthlyReport
  },
  computed: {
    activeEmployeReport: sync("monthlyReportReview/activeEmployeReport"),
    user: get("profile/user"),
    reviews() {
      if (this.activeEmployeReport.review) {
        this.activeEmployeReport.review.filter(ele => {
          if (ele.manager_id.username === this.user.username) {
            this.managerComment = ele;
          }
        });
      }
    }
  },
  methods: {
    api_postReview: call("monthlyReportReview/postMonthlyReview"),
    api_deleteMonthlyReport: call("monthlyReportReview/deleteMonthlyReview"),
    api_getReports: call("monthlyReportReview/getUsersMonthlyReports"),
    async submit() {
      let kpiArray = [];
      let eraArray = [];
      let comment = {};
      // console.log(this.textkpi, this.textera, this.activeEmployeReport._id);
      this.activeEmployeReport.report.kpi.forEach((element, i) => {
        kpiArray.push({
          title: element.title,
          desc: element.desc,
          id: element.id,
          comment: this.textkpi[i],
          rating: this.ratedStarKpi[i] || 0
        });
      });
      this.activeEmployeReport.report.era.forEach((element, i) => {
        eraArray.push({
          title: element.title,
          desc: element.desc,
          id: element.id,
          comment: this.textera[i],
          rating: this.ratedStarEra[i] || 0
        });
      });
      comment = { kpi: kpiArray, era: eraArray };

      let kpiresponse = kpiArray.filter(element => {
        if (element.comment && element.rating) {
          return element;
        }
      });
      let eraresponse = eraArray.filter(ele => {
        if (ele.comment && ele.rating) {
          return ele;
        }
      });
      if (kpiresponse.length || eraresponse.length) {
        this.loading = true;
        this.api_postReview({
          id: this.activeEmployeReport._id,
          comment: comment
        })
          .then(res => {
            // this.text = [];
            this.textkpi = [];
            this.textera = [];
            this.api_getReports();
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
        // this.ratedStar = 1;
        this.ratedStarKpi = [];
        this.ratedStarEra = [];
      } else {
        alert(
          "Your need to comment on atleast one KPI/ERA & select respective stars as well"
        );
      }
    },
    submitStarRate(value, i) {
      // this.ratedStar = value;
      this.$set(this.ratedStarKpi, i, value);
    },
    submitStarRateera(value, i) {
      // this.ratedStar = value;
      this.$set(this.ratedStarEra, i, value);
    },

    delReport() {
      // this.loading = true;
      this.alertMessage = "";
      this.alertMessageShow = false;
      this.api_deleteMonthlyReport({ id: this.activeEmployeReport._id })
        .then(res => {
          this.managerComment = "";
          this.api_getReports();
          // this.loading = false;
        })
        .catch(err => {
          // console.log(err.response.data.msg);
          this.alertMessageShow = true;
          this.alertMessage = err.response.data.msg;
          // this.loading = false;
        });
    }
  }
};
</script>

<style src="./../monthlyPerformanceReview.scss" lang="scss">
</style>
