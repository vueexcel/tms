<template>
  <div class="pb-5">
    <div>
      <b-modal v-model="success" size="sm" centered :headerBgVariant="header">
        {{showSuccess}}
        <div slot="modal-footer" class="w-100">
          <b-button variant="white" size="sm" class="float-right" @click="success=false">Close</b-button>
        </div>
      </b-modal>
    </div>
    <div>
      <span v-if="!error">
        <div class="mb-xs row" v-if="true">
          <b-dropdown variant="info" :text="selected" v-if="dateDropdown.length > 1">
            <b-dropdown-item @click="selectDate()">Select</b-dropdown-item>
            <div v-for="(date,index) in dateDropdown" :key="index">
              <b-dropdown-item @click="selectDate(date)">{{date}}</b-dropdown-item>
            </div>
          </b-dropdown>
        </div>
        <div v-if="!activeReport.reportExist" class="row">
          <b-alert
            show
            dismissible
            class="alert-transparent alert-danger mt-3 w-100"
          >Sorry Your Junior didn't send any Report on this date</b-alert>
        </div>
        <span v-else>
          <b-row class="pb-5">
            <b-col xs="12" sm="6" class="rounded-left first-box">
              <ExtraWorkFeedback :user="activeReport" :variant="'#9964e3 !important'"/>
            </b-col>
            <b-col xs="12" sm="6" class="rounded-right">
              <b-alert
                show
                class="Alert-class"
              >Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
              <div class="mb-3">
                <h6 class="rating-header mb-2">Overall Rating</h6>
                <div class="border-top"></div>
                <div class="mt-2 font-weight">Based on Weekly Review</div>
              </div>
              <starRating
                class="border-bottom"
                :displayStar="10"
                :ratedStar="ratedStarWeekly"
                :starSize="starSize"
                @starRatingSelected="submitStarRateWeekly"
                :disableStar="activeReport.canReview === false"
              />
              <div
                class="mt-2 font-weight"
              >As a manager how do you rate the difficulty level of projects which employee has worked on in last week</div>
              <starRating
                class="border-bottom"
                :displayStar="10"
                :ratedStar="ratedStarDifficulty"
                :starSize="starSize"
                @starRatingSelected="submitStarRateDifficulty"
                :disableStar="activeReport.canReview === false"
              />
              <div sm="6">
                <h6 class="text-inverse">Comments</h6>
              </div>
              <b-form>
                <b-form-textarea
                  :rows="3"
                  :disabled="activeReport.canReview == false"
                  v-model="text"
                  id="default-textarea"
                  placeholder="Performance or general comments (if any)..."
                />
                <span v-if="activeReport.canReview == true">
                  <b-button
                    :disabled="activeReport.canReview == false"
                    class="btn btn-default btn-lg mb-xs bg-primary text-white mt-4"
                    @click="submit"
                  >Submit</b-button>
                </span>
                <span v-if="activeReport.canReview == false">
                  <b-button
                    variant="danger"
                    class="btn-lg width-100 mb-xs mr-xs mt-4 float-right"
                    :disabled="userProfile.role == 'admin'?true:false"
                  >Delete</b-button>
                </span>
              </b-form>
            </b-col>
          </b-row>
        </span>
      </span>
    </div>
    <div v-if="error && !activeEmployee.length" class="row">
      <b-alert
        :show="error"
        dismissible
        class="alert-transparent alert-danger mt-5 w-100"
      >{{errorMessage}}</b-alert>
    </div>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
import { get, call } from "vuex-pathify";

export default {
  name: "PerformanceBox",
  data() {
    return {
      text: "",
      ratedStarWeekly: 0,
      ratedStarDifficulty: 0,
      starSize: "20px",
      id: null,
      error: false,
      errorMessage: "",
      selected: "Select Date",
      activeReport: {},
      loading: false,
      success: false,
      showSuccess: "",
      header: "success"
    };
  },
  components: {
    starRating,
    ExtraWorkFeedback
  },
  props: {
    employee: {
      type: Object,
      default: {}
    },
    performanceData: {
      type: Array,
      default: []
    }
  },
  mounted () {
    console.log(this.$props.performanceData);    
  },
  computed: {
    userProfile: get("profile/user"),
    activeEmployee() {
      let reportArray = [];
      this.error = false;
      this.errorMessage = "";
      if (this.employee) {
        reportArray = this.performanceData.filter(
          data => data.user === this.employee._id
        );
      }
      if (!reportArray.length) {
        this.error = true;
        this.errorMessage = "No Report Available";
      }
      return reportArray;
    },
    dateDropdown() {
      let dropdownArray = [];
      if (this.activeEmployee.length > 1) {
        this.activeEmployee.map(report => {
          dropdownArray.push(
            this.$moment(report.created_at).format("DD-MM-YYYY")
          );
        });
      } else {
        if (this.activeEmployee.length === 1) {
          dropdownArray.push(
            this.$moment(this.activeEmployee[0].created_at).format("DD-MM-YYYY")
          );
        }
      }
      this.selectDate(dropdownArray[0]);
      this.setActiveReport(dropdownArray[0]);
      return dropdownArray;
    }
  },
  methods: {
    setWeeklyReportReview: call("weeklyReportReview/setWeeklyReportReview"),
    async submit() {
      await this.setWeeklyReportReview({
        difficulty: this.ratedStarDifficulty,
        rating: this.ratedStarWeekly,
        comment: this.text,
        id: this.activeReport._id
      })
        .then(res => {
          this.success = true;
          this.header = "success";
          this.showSuccess = "Your have reviewed successfully";
          this.ratedStarWeekly = 1;
          this.ratedStarDifficulty = 1;
          this.text = "";
        })
        .catch(err => {
          this.success = true;
          this.showSuccess = "Sorry there is some error";
          this.header = "danger";
        });
    },
    submitStarRateWeekly(value) {
      this.ratedStarWeekly = value;
    },
    submitStarRateDifficulty(value) {
      this.ratedStarDifficulty = value;
    },
    selectDate(date) {
      if (date) {
        this.selected = date;
        this.setActiveReport(date);
      }
    },
    // SETTING ACTIVE REPORT TO SEND TO COMPONENT
    setActiveReport(reportDate) {
      this.activeReport = {};
      if (this.activeEmployee.length > 1) {
        this.activeEmployee.map(reportData => {
          if (
            reportDate ===
            this.$moment(reportData.created_at).format("DD-MM-YYYY")
          ) {
            if (reportData.is_reviewed.length) {
              reportData.is_reviewed.map(manager => {
                if (manager._id === this.userProfile._id) {
                  reportData["canReview"] =
                    manager.reviewed === true ? false : true;
                  reportData["reportExist"] = true;
                }
                this.activeReport = reportData;
              });
            }
          }
        });
      } else {
        if (
          this.activeEmployee[0] &&
          this.activeEmployee[0].is_reviewed.length
        ) {
          this.activeEmployee[0].is_reviewed.forEach(manager => {
            if (manager._id === this.userProfile._id) {
              this.activeEmployee[0]["canReview"] =
                manager.reviewed === true ? false : true;
              this.activeEmployee[0]["reportExist"] = true;
            }
            this.activeReport = this.activeEmployee[0];
          });
        }
      }
    }
  }
};
</script>

<style src="./../WeeklyReview.scss" lang="scss">
</style>
