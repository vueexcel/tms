<template>
  <div>
    <h1 class="page-title">WeeklyCheckin</h1>
    <Alert360 />
    <b-container class="bg-white no-gutters p-4" fluid>
      <div v-if="error">
        <b-alert
          :show="error"
          dismissible
          @dismissed="error = false"
          class="alert-danger text-center alert-transparent mt-3"
        >{{errorMessage}}</b-alert>
      </div>
      <b-row>
        <b-col xs="12" class="pt-4">
          <!-- <div class="m-auto" v-if="error">
            <b-alert
              :show="error"
              dismissible
              variant="danger"
              class="alert-transparent mt-3 text-center"
            >{{errorMessage}}</b-alert>
          </div>-->
          <div>
            <div v-if="!report.length">
              <b-alert class="alert-transparent alert-danger" show>
                <span>No checkin's found from previous week to submit weekly report</span>
              </b-alert>
            </div>
            <form class="form-horizontal" v-if="report.length">
              <div
                v-if="deleteReport === false && !loading"
                class="form-group row flex-row-reverse"
              >
                <router-link
                  class="btn btn-outline-secondary mr-3"
                  to="/app/automateWeekly"
                >Lazy submit</router-link>
              </div>
              <fieldset>
                <div class="form-group row">
                  <label
                    for="normal-field"
                    class="col-md-4 form-control-label text-md-left"
                  >Submit work done/ highlights of the work done in week</label>
                  <div class="col-md-8" v-if="!highlightList.length">
                    <b-form-select v-model="selected" v-if="user.kpi" class="mb-3">
                      <option :value="''">Please select an option</option>
                      <option
                        v-for="(kpi,index) in kpieraarray"
                        :key="index"
                        :value="kpi.title"
                      >{{ kpi.title }}</option>
                    </b-form-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="hint-field" class="col-md-4 control-label text-md-left"></label>
                  <div class="col-md-8" v-if="!highlightList.length">
                    <b-form-textarea
                      id="textarea1"
                      v-model="kpiKraDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                    <br />
                    <div v-for="(kpikra,index) in kpikradescriotionlist" :key="index">
                      <span>
                        <div class="mt-2">
                          <span>
                            <strong>KpiEra :</strong>
                            &nbsp;{{kpikra.KpiEra}}
                          </span>
                          <div class="white-space-pre" v-if="kpikra.description">
                            <strong>Work Done/ Highlights :</strong>
                            &nbsp;{{kpikra.description}}
                          </div>
                        </div>
                        <i
                          class="fas fa-times-circle text-secondary cursor pull-right pt-1 pr-4"
                          @click="removeDescription(index)"
                        ></i>
                      </span>
                    </div>
                    <a class="btn btn-default btn-sm mt-2 pl-4 pr-4" @click="addDescription">
                      <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                      Add
                    </a>
                  </div>
                  <div v-if="highlightList.length">
                    <div v-for="(kpikra,index) in highlightList" :key="index">
                      <span>
                        <div class="mt-2">
                          <span>
                            <strong>KpiEra :</strong>
                            &nbsp;{{kpikra.KpiEra}}
                          </span>
                          <div class="white-space-pre" v-if="kpikra.description">
                            <strong>Work Done/ Highlights :</strong>
                            &nbsp;{{kpikra.description}}
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- add button here -->
                <div class="form-group row">
                  <label
                    class="col-md-4 control-label text-md-left"
                  >Any extra work/ feedback/issues which you want to bring to the notice of manager</label>
                  <div class="col-md-8" v-if="!submittedReport.length">
                    <b-form-textarea
                      id="textarea1"
                      v-model="extraWorkDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                  </div>
                  <div class="col-md-8 font-weight-bold">
                    <span v-if="submittedReport.length">{{submittedReport[0].extra}}</span>
                  </div>
                </div>
                <hr />
                <div class="form-group row">
                  <label
                    class="col-md-4 control-label text-md-left"
                  >Which daily check-in do you wish to highlight</label>
                  <div class="col-md-8">
                    <!-- ======= ACCORDION RIGHT =================-->
                    <b-card no-body class="border-0">
                      <b-tabs pills card vertical end class="border-0">
                        {{date}}
                        <b-tab
                          v-for="(reportdata,index) in report"
                          :key="index"
                          :title="reportdata.day"
                          class="border-0 white-space-pre pl-3 pr-3 pb-3 pt-0"
                          @click="pickDay(index,reportdata)"
                        >
                          <div v-html="reportdata.report" class="report-wysiwyg"></div>
                        </b-tab>
                      </b-tabs>
                    </b-card>

                    <!-- ======= ACCORDION RIGHT ENDS=================-->
                  </div>
                </div>
                <hr />
                <div class="form-group row">
                  <label class="col-md-4 control-label text-md-left" for="max-length">
                    Difficulty level of project
                    <br />(i.e., if project work did you did was difficult and
                    required more effort than usual)
                    <strong>(Optional)</strong>
                  </label>
                  <div v-if="!submittedReport.length">
                    <starRating
                      :displayStar="5"
                      :ratedStar="ratedStar"
                      @starRatingSelected="submitStarRate"
                    />
                  </div>
                  <div v-if="submittedReport.length">
                    <starRating
                      :displayStar="5"
                      :ratedStar="submittedReport[0].difficulty"
                      @starRatingSelected="submitStarRate"
                    />
                  </div>
                </div>
              </fieldset>
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <!-- <button
                      type="button"
                      class="btn btn-success"
                      v-if="deleteReport === false && !loading"
                      @click="submitWeeklyReview"
                    >Submit</button>
                    <button type="button" class="btn btn-success" v-if="loading">
                      <i class="fa fa-circle-o-notch fa-spin"></i>
                    </button> -->
                    <primary-button
                      v-if="deleteReport === false"
                      :type="'button'" 
                      :text="'Submit'"
                      :isLoading="loading"
                      :variant="'btn-success'"
                      @clickCall="submitWeeklyReview($event)"
                    ></primary-button>
                  </div>
                  <div class="col-md-4 col-12">
                    <!-- <button
                      type="button"
                      class="btn btn-danger"
                      :disabled="disableDelete"
                      v-if="deleteReport === true && !loading"
                      @click="deletereportFunct"
                    >Delete</button> -->
                    <primary-button
                      v-if="deleteReport === true && !loading"
                      :type="'button'" 
                      :text="'Delete'"
                      :isLoading="disableDelete"
                      :variant="'btn-danger'"
                      @clickCall="deletereportFunct($event)"
                      ></primary-button>
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
// import "imports-loader?jQuery=jquery,this=>window!flot";
// import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
import starRating from "@/components/Star/Star";
import Alert360 from "@/components/Alert360/alert360";
import primaryButton from '@/components/common/button.vue'
import { get, call } from "vuex-pathify";

export default {
  name: "WeeklyReview",
  components: {
    starRating,
    Alert360,
    primaryButton
  },
  data() {
    return {
      ratedStar: 0,
      selected: "",
      selectedDays: [],
      kpiKraDescription: "",
      extraWorkDescription: "",
      selectedDay: null,
      id: null,
      kpieraarray: [],
      kpikradescriotionlist: [],
      submittedReport: [],
      highlightList: [],
      deleteReport: false,
      disableDelete: false,
      error: false,
      loading: false,
      errorMessage: ""
    };
  },
  mounted() {
    this.get_report();
    this.getReviewedReport();
    this.clearform();
  },
  computed: {
    user: get("profile/user"),
    report: get("weeklyReview/report"),
    reviewedReport_: get("weeklyReview/reviewedReport"),
    date() {
      if (this.user.kpi && this.user.kpi.kpi_json) {
        // ES6 version use destructuring/ spread operator for adding arrays
        // eslint-disable-next-line
        if (this.user.kpi.era_json) {
          this.kpieraarray = [
            ...this.user.kpi.kpi_json.filter(element => {
              return element.title !== "";
            }),
            ...this.user.kpi.era_json.filter(element => {
              return element.title !== "";
            })
          ];
        } else {
          this.kpieraarray = [
            ...this.user.kpi.kpi_json.filter(element => {
              return element.title !== "";
            })
          ];
        }
      }
      Array.prototype.forEach.call(this.report, date => {
        var time = this.$moment(date.created_at)
          .tz("GMT")
          .local()
          .format("h:mm: A");
        if (time !== "Invalid date") {
          date["time"] = this.$moment(date.created_at).format("h:mm: A");
          date["day"] = this.$moment(date.created_at).format("dddd");
        }
      });
      return ''
    }
  },
  methods: {
    getReport: call("weeklyReview/getReport"),
    weeklyReview_: call("weeklyReview/weeklyReview"),
    getReports_: call("weeklyReview/getReports"),
    deleteWeeklyReport_: call("weeklyReview/deleteWeeklyReport"),
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    get_report: function() {
      this.getReport();
    },
    clearform() {
      this.ratedStar = 0;
      this.kpiKraDescription = "";
      this.extraWorkDescription = "";
      this.kpikradescriotionlist = [];
    },
    async submitWeeklyReview() {
      // this.loading = true;
      this.error = false;
      this.errorMessage = "";
      if (this.kpiKraDescription) {
        let data = {
          KpiEra: this.selected,
          description: this.kpiKraDescription
        };
        this.kpikradescriotionlist.push(data);
        this.kpiKraDescription = "";
      }
      if (!this.kpikradescriotionlist.length) {
        this.error = true;
        this.errorMessage = "Please submit work done.";
        this.scrollToTop();
      } else if (!this.id) {
        this.error = true;
        this.errorMessage =
          "Please select daily check-in which you wish to highlight";
        this.scrollToTop();
      } else {
        this.loading = true;
        let response = await this.weeklyReview_({
          k_highlight: this.kpikradescriotionlist,
          extra: this.extraWorkDescription,
          select_days: [this.id],
          difficulty: this.ratedStar
        });
        if (response === true) {
          this.highlightList = [];
          this.kpikradescriotionlist = [];
          this.kpiKraDescription = "";
          this.ratedStar = 0;
          this.extraWorkDescription = "";
          this.getReviewedReport();
        } else {
          this.error = true;
          this.errorMessage = response;
        }
        this.loading = false;
      }
    },
    submitStarRate(value) {
      this.ratedStar = value;
    },
    pickDay(index, reportdata) {
      this.selectedDay = reportdata.day;
      this.id = reportdata._id;
    },
    addDescription() {
      let obj = {
        KpiEra: this.selected,
        description: this.kpiKraDescription
      };
      var objectToremove = this.kpieraarray.find(
        o => o.title === this.selected
      );
      this.kpieraarray.splice(this.kpieraarray.indexOf(objectToremove), 1);
      this.kpikradescriotionlist.push(obj);
      this.kpiKraDescription = "";
      this.selected = "";
    },
    removeDescription(index) {
      for (var i = 0; i < this.kpikradescriotionlist.length; i++) {
        if (i === index) {
          this.kpieraarray.push({
            title: this.kpikradescriotionlist[i].KpiEra
          });
        }
      }
      this.kpikradescriotionlist.splice(index, 1);
    },
    async getReviewedReport() {
      let response = await this.getReports_();
      if (response.length && typeof response !== "string") {
        let disablebtn = response[0].is_reviewed.some(v => {
          return v.reviewed === true;
        });
        this.disableDelete = disablebtn;
        this.submittedReport = response;
        this.highlightList = this.submittedReport[0].k_highlight;
        this.deleteReport = true;
      } else {
        if (typeof response == "string") {
          this.error = true;
          this.errorMessage = response;
        }
      }
    },
    async deletereportFunct() {
      this.loading = true;
      let response = await this.deleteWeeklyReport_({
        _id: this.submittedReport[0]._id
      });
      if (response === true) {
        this.submittedReport = [];
        this.highlightList = [];
        this.deleteReport = false;
        this.id = null;
      } else {
        this.error = true;
        this.errorMessage = response;
      }
      this.loading = false;
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" scoped />
