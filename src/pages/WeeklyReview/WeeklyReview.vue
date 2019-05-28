<template>
  <div>
    <h1 class="page-title">WeeklyCheckin</h1>
    <b-container class="bg-white no-gutters p-4" fluid>
      <b-row>
        <b-col xs="12" class="pt-4">
          <div>
            <div v-if="!report.length">
              <b-alert class="alert-transparent alert-danger" show>
                <span>No checkin's found from previous week to submit weekly report</span>
              </b-alert>
            </div>
            <form class="form-horizontal" v-if="report.length">
              <fieldset>
                <div class="form-group row">
                  <label
                    for="normal-field"
                    class="col-md-4 form-control-label text-md-left"
                  >Submit work done/ highlights of the work done in week</label>
                  <div class="col-md-8">
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
                  <label for="hint-field" class="col-md-4 control-label text-md-left">
                    <!-- Label hint
                    <span class="help-block">Some help text</span>-->
                  </label>
                  <div class="col-md-8">
                    <b-form-textarea
                      id="textarea1"
                      v-model="kpiKraDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                    <br>
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
                </div>
                <!-- add button here -->
                <div class="form-group row">
                  <label
                    class="col-md-4 control-label text-md-left"
                  >Any extra work/ feedback/issues which you want to bring to the notice of manager</label>
                  <div class="col-md-8">
                    <b-form-textarea
                      id="textarea1"
                      v-model="extraWorkDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                  </div>
                </div>
                <hr>
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
                          class="border-0"
                          @click="pickDay(index,reportdata)"
                        >
                          <b-card-text>{{reportdata.report}}</b-card-text>
                        </b-tab>
                      </b-tabs>
                    </b-card>

                    <!-- ======= ACCORDION RIGHT ENDS=================-->
                  </div>
                </div>
                <hr>
                <div class="form-group row">
                  <label class="col-md-4 control-label text-md-left" for="max-length">
                    Difficulty level of project
                    <br>(i.e., if project work did you did was difficult and
                    required more effort than usual)
                  </label>
                  <starRating
                    :displayStar="5"
                    :ratedStar="ratedStar"
                    @starRatingSelected="submitStarRate"
                  />
                </div>
              </fieldset>
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button
                      type="button"
                      class="btn btn-success"
                      v-if="deleteReport === false"
                      @click="submitWeeklyReview"
                    >Submit</button>
                  </div>
                  <div class="col-md-4 col-12">
                    <button
                      type="button"
                      class="btn btn-danger"
                      v-if="deleteReport === true"
                      @click="deletereportFunct"
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
// import $ from 'jquery';
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import starRating from "@/components/Star/Star";
import Widget from "@/components/Widget/Widget";
import { get, call } from "vuex-pathify";

export default {
  name: "WeeklyReview",
  components: {
    Widget,
    starRating
  },
  data() {
    return {
      ratedStar: 1,
      selected: "",
      selectedDays: [],
      kpiKraDescription: "",
      extraWorkDescription: "",
      selectedDay: null,
      id: null,
      kpieraarray: [],
      kpikradescriotionlist: []
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
      if (this.user.kpi) {
        // ES6 version use destructuring/ spread operator for adding arrays
        this.kpieraarray = [
          ...this.user.kpi.kpi_json.filter(element => {
            return element.title !== "";
          }),
          ...this.user.kpi.era_json.filter(element => {
            return element.title !== "";
          })
        ];
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
    },
    deleteReport() {
      let count = 0;
      let obj = {}
      if (this.reviewedReport_.length) {
        if (this.reviewedReport_[0].is_reviewed.length) {
          this.reviewedReport_[0].is_reviewed.map(manager => {
            if (manager.reviewed) {
              count++;
            }
          });
          if (count === this.reviewedReport_[0].is_reviewed.length) {
            this.kpiKraDescription = this.reviewedReport_[0].k_highlight.kpi;
            this.ratedStar = this.reviewedReport_[0].difficulty;
            this.extraWorkDescription = this.reviewedReport_[0].extra;
            this.selected = this.reviewedReport_[0].k_highlight.kra;
            return true;
          }
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    getReport: call("weeklyReview/getReport"),
    weeklyReview_: call("weeklyReview/weeklyReview"),
    getReviewedReports_: call("weeklyReview/getReviewedReports"),
    deleteWeeklyReport_: call("weeklyReview/deleteWeeklyReport"),
    get_report: function() {
      this.getReport();
    },
    clearform() {
      this.ratedStar = 1;
      this.kpiKraDescription = "";
      this.extraWorkDescription = "";
      this.kpikradescriotionlist = [];
    },
    submitWeeklyReview: function() {
      if(this.kpiKraDescription){
        let data = {
          kra: this.selected,
          kpi: this.kpiKraDescription
        }
        this.kpikradescriotionlist.push(data)
      }
      // alert('==========================')
      this.weeklyReview_({
        k_highlight:this.kpikradescriotionlist,
        extra: this.extraWorkDescription,
        select_days: [this.id],
        difficulty: this.ratedStar
      });
      this.extraWorkDescription = "";
      this.ratedStar = 1;
      this.selected = "";
      this.kpiKraDescription = "";
      this.kpikradescriotionlist = []
      this.selectedDays = [];
      this.deleteReport = true
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
      this.kpikradescriotionlist.push(obj);
      this.kpiKraDescription = "";
      this.selected = "";
    },
    removeDescription(index) {
      this.kpikradescriotionlist.splice(index, 1);
    },
    getReviewedReport() {
      this.getReviewedReports_();
    },
    deletereportFunct() {
      let response = this.deleteWeeklyReport_({
        _id: this.reviewedReport_[0]._id
      });
      if (response) {
        this.kpiKraDescription = "";
        this.ratedStar = 1;
        this.extraWorkDescription = "";
        this.kpikradescriotionlist = []
        this.deleteReport = false;
      }
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" scoped />
