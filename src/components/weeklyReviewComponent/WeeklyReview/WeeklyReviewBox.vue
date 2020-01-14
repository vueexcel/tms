<template>
  <div class="pb-5">
    <div>
      <b-modal v-model="success" size="sm" centered :headerBgVariant="header">
        {{showSuccess}}
        <div slot="modal-footer" class="w-100">
          <b-button variant="white" size="sm" class="float-right" @click="closeInfoModal">Close</b-button>
        </div>
      </b-modal>
    </div>
    <div>
      <span v-if="!error">
        <!-- <div class="mb-xs row" v-if="true"> -->
        <div class="mb-xs row">
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
              <ExtraWorkFeedback :user="activeReport" :variant="'#9964e3 !important'" />
            </b-col>
            <b-col xs="12" sm="6" class="rounded-right mt-xs m-sm-0">
              <b-alert
                show
                class="Alert-class"
              >Info: Overall rating/ comments mandatory for managers based on weekly report</b-alert>
              <div class="mb-3">
                <b-row>
                  <b-col sm="12" md="4" lg="4">
                    <h6 class="rating-header mb-2"> Overall Rating </h6>
                  </b-col>
                  <b-col sm="12" md="8" lg="8">
                    <span v-if="userProfile.easyRating === true && activeReport.canReview === true" class="font-weight-bolder float-right">
                      <span class="text-warning mx-1">
                        Bad - 3
                      </span>
                      <span class="text-info mx-1">
                        Neutral - 6
                      </span>
                      <span class="text-success mx-1">
                        Good - 8
                      </span>
                      <span class="mx-1 pointer">
                        <b-link @click="showMoreRatingInEasyRating">More?</b-link>
                      </span>
                    </span>
                  </b-col>
                </b-row>
                <div class="border-top"></div>
                <div class="mt-2 font-weight">Based on Weekly Review </div>
              </div>
              <div v-if="activeReport.canReview === true">
                <div v-if="userProfile.easyRating === true">
                  <emoticonRating
                    :ratedStar="ratedStarWeekly"
                    :disableStar="activeReport.canReview === false ? true : false"
                    @starRatingSelected="submitStarRateWeekly">
                  </emoticonRating>
                </div>
                <div v-else>
                  <starRating
                    class="border-bottom"
                    :displayStar="10"
                    :ratedStar="ratedStarWeekly"
                    :starSize="starSize"
                    @starRatingSelected="submitStarRateWeekly"
                    :disableStar="activeReport.canReview === false ? true : false"
                  />
                </div>
              </div>
              <div v-else>
                <div v-if="reviewedComments.rating <= 8">
                  <emoticonRating
                    :ratedStar="reviewedComments.rating"
                    :disableStar="true"
                  >
                  </emoticonRating>
                </div>
                <div v-else>
                  <starRating
                    class="border-bottom"
                    :displayStar="10"
                    :ratedStar="reviewedComments.rating"
                    :starSize="starSize"
                    :disableStar="true"
                  />
                </div>
              </div>
              <!-- <div class="mt-2 font-weight">
                As a manager how do you rate the difficulty level of projects which employee has worked on in last week
                <strong>(Optional)</strong>
              </div>
              <starRating
                class="border-bottom"
                :displayStar="10"
                :ratedStar="activeReport.canReview === false ? reviewedComments.difficulty :ratedStarDifficulty"
                :starSize="starSize"
                @starRatingSelected="submitStarRateDifficulty"
                :disableStar="activeReport.canReview === false ? true : false"
              />-->
              <div sm="6" class="mt-2">
                <h6 class="text-inverse">Comments</h6>
              </div>
              <b-form>
                <div v-if="activeReport.canReview === true">
                  <b-form-textarea
                    :rows="3"
                    v-model="text"
                    id="default-textarea"
                    placeholder="Performance or general comments (if any)..."
                  />
                </div>
                <div
                  v-else
                  class="text-info font-weight-bold text-left comment_manager"
                >{{reviewedComments.comment}}</div>
                <span v-if="activeReport.canReview == true">
                  <b-button
                    :disabled="activeReport.canReview == false"
                    class="btn btn-default btn-lg mb-xs bg-primary text-white mt-4"
                    @click="submit"
                  >Submit</b-button>
                  <!-- v-if="userProfile.role === 'Admin'" -->
                  <b-button
                    :disabled="activeReport.canReview == false"
                    class="btn btn-default btn-lg mb-xs bg-info text-white mt-4 float-right"
                    @click="skipReport"
                  >Skip Report</b-button>
                </span>
                <!-- :disabled="activeReport.canReview == false" -->
                <span v-if="activeReport.weekly_cron === false">
                  <b-button
                    class="btn btn-default btn-lg mb-xs bg-warning text-dark mt-4 w-25"
                    @click="revoke(activeReport)"
                  >
                    <span v-if="!revokeLoader">Revoke</span>
                    <span v-if="revokeLoader">
                      <i class="fa fa-circle-o-notch fa-spin"></i>
                    </span>
                  </b-button>
                </span>
                <span v-if="activeReport.canReview == false" class="d-flex flex-row-reverse">
                  <!-- class="btn btn-default btn-lg mb-xs bg-primary text-white mt-4" -->
                  <b-button
                    variant="danger"
                    class="btn btn-lg width-100 mb-xs mr-xs mt-4 float-right"
                    :disabled="userProfile.role == 'admin'?true:false"
                    @click="deleteReport()"
                  >Delete</b-button>
                </span>
              </b-form>
              <div class v-if="errorMessageDel">
                <b-alert
                  show
                  dismissible
                  class="alert-transparent alert-danger mt-3"
                >{{errorMessageDel}}</b-alert>
              </div>
              <div class="mt-4 pt-lg" v-if="activeReport.note && activeReport.note.length">
                <h5>Your Notes :</h5>
                <div class="bg-warning shadow-lg p-3">
                  <div
                    v-for="(note,index) in activeReport.note"
                    :key="index"
                    class="font-weight-bold note"
                  >
                    <div class="d-flex">
                      <span>{{index + 1}}.</span>
                      <div class="ml-1 comment">{{note.comment}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </span>
      </span>
    </div>
    <!-- {{performanceData[0].weekly_cron}} -->
    <div v-if="error && !activeEmployee.length" class="row">
      <b-alert
        :show="error"
        dismissible
        class="alert-transparent alert-danger mt-5 w-100"
      >{{errorMessage}}</b-alert>
    </div>
    <b-modal :header-text-variant="'light'" v-model="skipModal" :header-bg-variant="'dark'">
      <template slot="modal-header">
        <h5>Reason for skip report review</h5>
        <i class="fa fa-times" aria-hidden="true" @click="closeSkipModal"></i>
      </template>

      <template slot="default">
        <b-container fluid>
          <b-form-group>
            <b-form-radio
              v-model="reasonSelected"
              name="some-radios"
              value="a"
            >Didn't work with employee in the week</b-form-radio>
            <b-form-radio v-model="reasonSelected" name="some-radios" value="b">I was on leave</b-form-radio>
            <b-form-radio
              v-model="reasonSelected"
              name="some-radios"
              value="d"
            >I am no longer associated in any project with this employee</b-form-radio>
            <b-form-radio v-model="reasonSelected" name="some-radios" value="c">Others</b-form-radio>
          </b-form-group>
        </b-container>
        <b-form-textarea
          v-if="reasonSelected === 'c'"
          id="textarea"
          v-model="reasonOther"
          placeholder="Enter Reason..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <div slot="modal-footer" class="w-100"></div>
      </template>

      <template slot="modal-footer">
        <b-button
          variant="primary"
          size="sm"
          v-if="!loadingSkip"
          class="float-right"
          @click="submitSkip"
        >Submit Reason</b-button>
        <b-button variant="primary" size="sm" v-if="loadingSkip" class="float-right">
          <span class="mr-2">Loading...</span>
          <i class="fas fa-circle-notch fa-spin"></i>
        </b-button>
      </template>
      <!-- -->
    </b-modal>

    <b-modal :header-text-variant="'light'" v-model="extraEasyRating" :header-bg-variant="'dark'">
      <template slot="modal-header">
        <h5>Want to rate more?</h5>
        <i class="fa fa-times" aria-hidden="true" @click="closeExtraRating"></i>
      </template>

      <template slot="default">
        <b-container fluid>
          <starRating 
            :variantWarning="true"
            :disableStar="false"
            class="border-bottom"
            :displayStar="10"
            :ratedStar="ratedStarWeekly"
            :starSize="'20px'"
            @starRatingSelected="submitStarRateWeekly"></starRating>
        </b-container>
        <b-form-textarea
          id="textarea"
          v-model="reasonForEasyRating"
          placeholder="Enter Reason..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </template>

      <template slot="modal-footer">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="submit"
        >Submit</b-button>
      </template>
      <!-- -->
    </b-modal>
    <Toasts :rtl="true" class="toast" :time-out="5000" :class="{toast_opacity : showTaost}"></Toasts>
  </div>
</template>

<script>
import starRating from "@/components/Star/Star";
import emoticonRating from "@/components/Star/emojiRating.vue"
import ExtraWorkFeedback from "./../../../components/ExtraWorkFeedback/ExtraWorkFeedback";
import { get, call, sync } from "vuex-pathify";

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
      showTaost: false,
      header: "success",
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ],
      reviewedComments: {},
      skipModal: false,
      reasonSelected: "",
      reasonOther: "",
      loadingSkip: false,

      extraEasyRating:false,
      reasonForEasyRating: ''
    };
  },
  components: {
    starRating,
    emoticonRating,
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
  mounted() {},
  computed: {
    userProfile: get("profile/user"),
    revokeLoader: sync("weeklyReportReview/revokeLoader"),
    errorMessageDel: get("weeklyReportReview/errorMessageDelete"),
    activeEmployee() {
      let reportArray = [];
      this.error = false;
      this.errorMessage = "";
      if (this.employee) {
        this.ratedStarDifficulty = 0;
        this.ratedStarWeekly = 0;
        this.text = "";
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
    api_revokeWeekly: call("weeklyReportReview/revokeWeekly"),
    skipReportReview_: call("weeklyReportReview/skipReportReview"),
    async submit() {
      if (this.ratedStarWeekly) {
        let data = {
          rating: this.ratedStarWeekly,
          comment: this.text ? this.text : this.reasonForEasyRating,
          id: this.activeReport._id
        };
        await this.setWeeklyReportReview(data).then(res => {
          if (res ===  true) {
            this.$emit("update-highlight", true);
            this.activeReport.canReview = false;
            this.reviewedComments = data;
            this.success = true;
            this.header = "success";
            this.showSuccess = "Your have reviewed successfully";
            this.ratedStarWeekly = 0;
            this.ratedStarDifficulty = 0;
            this.text = "";
            this.extraEasyRating = false
            this.reasonForEasyRating = ''
          } else {
            this.success = true;
            this.header = "danger";
            this.showSuccess = "Your review is not submitted. Please review again";
          }
          })
          .catch(err => {
            this.success = true;
            this.showSuccess = "Sorry there is some error";
            this.header = "danger";
          })
          // .then(res => {
          //   this.success = true;
          //   this.header = "success";
          //   this.showSuccess = "Your have reviewed successfully";
          //   this.ratedStarWeekly = 0;
          //   this.ratedStarDifficulty = 0;
          //   this.text = "";
          // })
          // .catch(err => {
          //   this.success = true;
          //   this.showSuccess = "Sorry there is some error";
          //   this.header = "danger";
          // });
      } else {
        this.success = true;
        this.showSuccess = "Rating Weekly can not be blank";
        this.header = "danger";
      }
    },
    skipReport() {
      this.skipModal = true;
    },
    closeSkipModal() {
      this.skipModal = false;
      this.reasonSelected = "";
      this.reasonOther = "";
    },
    async submitSkip() {
      this.loadingSkip = true;
      if (this.reasonSelected) {
        if (this.reasonSelected === "c" && this.reasonOther === "") {
          this.success = true;
          this.showSuccess = "Textarea can not be blank";
          this.header = "danger";
        } else {
          let payload = {
            selected: this.reasonSelected,
            reason: this.reasonOther,
            weeklyId: this.activeReport
          };
          let response = await this.skipReportReview_(payload);
          if (response === true) {
            this.success = true;
            this.showSuccess = "You have successfully skipped report";
            this.header = "success";
            this.$emit("skipReport", true);
          } else {
            this.success = true;
            this.showSuccess = response;
            this.header = "danger";
          }
          this.skipModal = false;
          this.reasonSelected = "";
          this.reasonOther = "";
          this.loadingSkip = false;
        }
      } else {
        this.success = true;
        this.showSuccess = "Please select reason";
        this.header = "danger";
      }
    },
    closeInfoModal() {
      this.loadingSkip = this.loadingSkip
        ? this.loadingSkip === false
        : this.loadingSkip;
      this.success = false;
    },
    async deleteReport() {
      this.$emit("deleteReview", this.activeReport);
    },
    async revoke(val) {
      this.$emit("revoke", val);
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
                  reportData["reportExist"] = true;
                  if (manager.reviewed) {
                    reportData["canReview"] = false;
                    this.reviewedComments = this.getManagerComment(reportData);
                  } else {
                    reportData["canReview"] = true;
                    this.reviewedComments = {};
                  }
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
              this.activeEmployee[0]["reportExist"] = true;
              if (manager.reviewed) {
                this.activeEmployee[0]["canReview"] = false;
                this.reviewedComments = this.getManagerComment(
                  this.activeEmployee[0]
                );
              } else {
                this.activeEmployee[0]["canReview"] = true;
                this.reviewedComments = {};
              }
            }
            this.activeReport = this.activeEmployee[0];
          });
        }
      }
    },
    getManagerComment(report) {
      let reportObj = {};
      if (report.review) {
        for (var i = 0; i < report.review.length; i++) {
          if (this.userProfile._id === report.review[i].manager_id) {
            reportObj = report.review[i];
          }
        }
      }
      return reportObj;
    },
    showMoreRatingInEasyRating () {
      this.extraEasyRating = true
    },
    closeExtraRating () {
      this.extraEasyRating = false
      this.ratedStarWeekly = 0
      this.reasonForEasyRating = ''
    }
  }
};
</script>

<style src="./../WeeklyReview.scss" lang="scss">
</style>
