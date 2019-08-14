<template>
  <div>
    <Alert360 />
    <b-row>
      <b-col lg="8" xs="12">
        <div>
          <Widget class="mb-0">
            <div class="h-100">
              <div class="float-left pr-3">
                <img
                  :src="user.profile && user.profile.profileImage ? user.profile.profileImage : image"
                  class="rounded-circle"
                  width="75"
                  height="75"
                  alt="..."
                />
              </div>

              <div class="pt-2" v-if="user.profile">
                <span class="fs-larger text-capitalize">
                  <span class="fw-semi-bold">{{user.profile.name}}</span>
                </span>
                <p class="fw-small">{{user.profile.jobtitle}}</p>
              </div>
            </div>
            <!--==================================================================== 
                    * Dashbard blocks 
            *=======================================================================-->
            <div class="w-auto pl-5 ml-5">
              <!-- blocks -->
              <span class="mr-4 fw-semi-bold">Reviewers</span>
              <br />
              <!-- 1st block -->
              <span v-for="(manager,index) in sortedArray" :key="index">
                <div
                  class="rounded w-auto p-1 h-auto mr-1 mt-2"
                  v-bind:class="{success : manager.weight <= 3 ,primary:  manager.weight > 3 && manager.weight <= 6, warning:  manager.weight > 6 && manager.weight <= 10}"
                >
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      :src="manager.profileImage ? manager.profileImage : image"
                      width="35"
                      height="35"
                      alt="..."
                    />
                  </span>
                  <div class="float-left text-white text-left pl-2 pr-1">
                    <span class="fw-bold fs-large">{{manager.username }}</span>
                    <br />
                    <span class="fs-sm">{{manager.job_title}}</span>
                  </div>
                </div>
              </span>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col class="p-0 ml-3">
        <div class="h-auto pb-3" lg="4" xs="12">
          <h2 class="mb-3">
            Overall
            <span class="fw-semi-bold">Score</span>
          </h2>
          <!-- first bar -->
          <div v-if="user.profile && user.profile.Checkin_rating">
            <h6 class="text-dark fs-larger">
              Check-ins Score
              <i
                v-b-popover.hover="`You are expected to do daily checkin's for your work. If you miss a checkin your checkin score will reduce. This score is mainly a percentage of total checkins vs total working days`"
                class="fas fa-question-circle fs-sm text-danger"
              ></i>
              <span class="float-right">{{checkin_rating}}%</span>
            </h6>
            <span class="text-secondary fs-sm">Daily stand-up report submitted</span>
            <b-progress
              class="w-75"
              style="height: 5px"
              variant="primary"
              :value="user.profile.Checkin_rating ? user.profile.Checkin_rating : 0"
              :max="100"
            />
          </div>
          <!-- second bar -->
          <div>
            <div v-if="user.profile && user.profile.Overall_rating">
              <h6 class="text-dark fs-larger">
                Overall Review
                <i
                  v-b-popover.hover="`This is the weighted reviewed given by your seniors. This is score is most important and reflects your performance.`"
                  class="fas fa-question-circle fs-sm text-danger"
                ></i>
                <span class="float-right">{{Number(Overall_rating).toFixed(2)}} / 10</span>
              </h6>
              <span class="text-secondary fs-sm">Overall performance review</span>
              <b-progress
                class="w-75"
                style="height: 5px"
                variant="success"
                :value="user.profile.Overall_rating * 10"
                :max="100"
              />
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="6">
        <h2 class="mt-2">Monthly Reviews as per Kpi/Era</h2>
        <div class="mt-3">
          <h6 class="font-weight-bold">Key Performance Area</h6>
          <div v-if="user.profile && user.profile.kpi && newArray && newArray.length">
            <section>
              <div v-for="(kpiera,index) in newArray" :key="index" class="areaBorder mb-2">
                <div class="d-flex">
                  <div
                    class="mb-0 bg-white pl-3 pt-1 w-100"
                    v-if="kpiera.title !== '' && kpiera.desc !== ''"
                    v-b-toggle="'manager' + kpiera.ID"
                  >
                    <p class="text-primary capitalize mb-0">
                      <span class="cursor_pointer">{{kpiera.title}}</span>
                    </p>
                    <div>{{kpiera.desc}}</div>
                  </div>
                  <RadialProgressBar
                    v-if="kpiera.rating"
                    class="pull-right"
                    :diameter="30"
                    :completed-steps="kpiera.rating"
                    :total-steps="total"
                    :strokeWidth="3"
                  >
                    <p></p>
                    <p class="fs-mini">{{ kpiera.rating.toFixed(1) }}</p>
                  </RadialProgressBar>
                </div>
                <b-collapse :id="'manager' + kpiera.ID">
                  <div class="mx-1 line">
                    <div
                      v-for="(monthlyReport,index) in user.monthly"
                      :key="index"
                      class="px-3 background_color text-secondary mt-2 description"
                    >
                      <h6 class="font-weight-bold py-2">
                        <u>{{monthlyReport.month}}</u>
                      </h6>
                      <div v-if="monthlyReport.review" class="text-secondary">
                        <b-row v-for="(reportReview,index) in monthlyReport.review" :key="index">
                          <b-col cols="4" class="p-0">
                            <div class="h-100 ml-3 d-flex">
                              <div class="float-left pt-2">
                                <img
                                  :src="reportReview.manager_id.profileImage ? reportReview.manager_id.profileImage : image"
                                  class="rounded-circle"
                                  width="25"
                                  height="25"
                                  alt="..."
                                />
                              </div>
                              <div class="ml-2">
                                <span class="fs-larger text-capitalize">
                                  <span class="fw-semi-bold">{{reportReview.manager_id.name}}</span>
                                  <p class="fw-small">{{reportReview.manager_id.jobtitle}}</p>
                                </span>
                              </div>
                            </div>
                          </b-col>
                          <b-col>
                            <div v-for="(era,index) in reportReview.comment.kpi" :key="index">
                              <div v-if="kpiera.ID === era.id" class="font-weight-bold">
                                <em>{{era.comment}}</em>
                                <Stars
                                  :displayStar="10"
                                  :ratedStar="Number(era.rating)"
                                  :starSize="'20px'"
                                  :disableStar="false"
                                />
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                      <div v-else>
                        <span class="text-danger font-weight-bold">No reviews</span>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </section>
          </div>
          <h6 class="font-weight-bold">Extra Resource Area</h6>
          <div v-if="user.profile && user.profile.kpi && eraArray">
            <section>
              <div v-for="(kpiera,index) in eraArray" :key="index" class="areaBorder mb-2">
                <div class="d-flex">
                  <div
                    class="mb-0 bg-white pl-3 pt-1 pr-4 w-100"
                    v-if="kpiera.title !== '' && kpiera.desc !== ''"
                    v-b-toggle="'manager' + kpiera.ID"
                  >
                    <p class="text-primary capitalize mb-0">
                      <span class="cursor_pointer">{{kpiera.title}}</span>
                    </p>
                    <div>{{kpiera.desc}}</div>
                  </div>
                  <RadialProgressBar
                    v-if="kpiera.rating"
                    class="pull-right"
                    :diameter="30"
                    :completed-steps="kpiera.rating"
                    :total-steps="total"
                    :strokeWidth="3"
                  >
                    <p></p>
                    <p class="fs-mini">{{ kpiera.rating.toFixed(1) }}</p>
                  </RadialProgressBar>
                </div>

                <b-collapse :id="'manager' + kpiera.ID">
                  <div class="mx-1 line">
                    <div
                      v-for="(monthlyReport,index) in user.monthly"
                      :key="index"
                      class="px-3 background_color text-secondary mt-2 description"
                    >
                      <h6 class="font-weight-bold py-2">
                        <u>{{monthlyReport.month}}</u>
                      </h6>
                      <div v-if="monthlyReport.review" class>
                        <b-row v-for="(reportReview,index) in monthlyReport.review" :key="index">
                          <b-col cols="4" class="p-0">
                            <div class="h-100 ml-3 d-flex">
                              <div class="float-left pt-2">
                                <img
                                  :src="reportReview.manager_id.profileImage ? reportReview.manager_id.profileImage : image"
                                  class="rounded-circle"
                                  width="25"
                                  height="25"
                                  alt="..."
                                />
                              </div>
                              <div class>
                                <span class="fs-larger text-capitalize">
                                  <span class="fw-semi-bold">{{reportReview.manager_id.name}}</span>
                                  <p class="fw-small">{{reportReview.manager_id.jobtitle}}</p>
                                </span>
                              </div>
                            </div>
                          </b-col>
                          <b-col>
                            <div v-for="(era,index) in reportReview.comment.era" :key="index">
                              <div v-if="kpiera.ID === era.id" class="font-weight-bold">
                                <em>{{era.comment}}</em>
                                <Stars
                                  :displayStar="10"
                                  :ratedStar="Number(era.rating)"
                                  :starSize="'20px'"
                                  :disableStar="false"
                                />
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                      <div v-else>
                        <span class="text-danger font-weight-bold">No reviews</span>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </section>
          </div>
        </div>
      </b-col>
      <b-col xs="12" lg="6">
        <b-row>
          <b-col cols="9" class="px-0 pl-3">
            <h2 class="mt-2">Weekly Report Review</h2>
          </b-col>
          <b-col cols="3" class="px-0">
            <b-form-select v-model="selectedWeeklyDate" class="mb-3">
              <option
                :value="weekDate"
                v-for="(weekDate,index) in WeeklyDateArray"
                :key="index"
              >{{weekDate.text}}</option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="p-0 pl-3" v-if="user.weekly && user.weekly.length">
          <div v-for="(weeklyReport,index) in weeklyReportArray" :key="index" class="background_color my-2 p-3 w-100">
            <h6 class="font-weight-bold float-right">{{weeklyReport.created_at | date}}</h6>
              <p class="font-weight-bold my-1">Extra work/ Feedback/ Issues</p>
              <div class="mb-3">{{weeklyReport.extra}}</div>
              <p class="font-weight-bold my-1">Highlight</p>
              <div v-for="(highlight,index) in weeklyReport.k_highlight" :key="index">
                <div>
                  <u>Kpi/Era :</u>
                  <span>{{highlight.KpiEra}}</span>
                </div>
                <div>
                  <u>Description :</u>
                  <span class="ml-2">{{highlight.description}}</span>
                </div>
              </div>
              <p class="font-weight-bold my-1">Project Difficulty Level</p>
              <Stars
                :displayStar="5"
                :ratedStar="Number(weeklyReport.difficulty)"
                :starSize="'20px'"
                :disableStar="false"
              />
              <div v-if="weeklyReport.review" class="bg-light text-danger mb-3 mr-3 pb-2">
                <div v-for="(comment,index) in weeklyReport.review" :key="index">
                  <b-row>
                    <b-col cols="4">
                      <div class="h-100 ml-3 d-flex">
                        <div class="float-left pt-2">
                          <img
                            :src="comment.manager_id.profileImage ? comment.manager_id.profileImage : image"
                            class="rounded-circle"
                            width="25"
                            height="25"
                            alt="..."
                          />
                        </div>
                        <div class="ml-1">
                          <span class="fs-larger text-capitalize">
                            <span class="fw-semi-bold">{{comment.manager_id.name}}</span>
                            <p class="fw-small">{{comment.manager_id.jobtitle}}</p>
                            <p class="fw-small">{{comment.manager_id.team}}</p>
                          </span>
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="8">
                      <p>
                        <strong class="pr-2">Comment :</strong>
                        <span>{{comment.comment}}</span>
                      </p>
                      <p class="d-flex">
                        <Strong class="pt-2 mt-1 pr-2">Rating :</Strong>
                        <span>
                          <Stars
                            :displayStar="10"
                            :ratedStar="Number(comment.rating)"
                            :starSize="'20px'"
                            :disableStar="false"
                          />
                        </span>
                      </p>
                    </b-col>
                  </b-row>
                </div>
                <div v-if="weeklyReport.skip_reason && weeklyReport.skip_reason.length">
                  <div v-for="(skipReason,index) in weeklyReport.skip_reason" :key="index">
                    <div
                      class="bg-warning text-center text-secondary font-weight-bold m-1"
                    >{{skipReason}}</div>
                  </div>
                </div>
              </div>
          </div>
        </b-row>
        <b-row v-else>No Reports</b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import AreaComponent from "@/components/Area/Area";
import dummyimage from "@/components/Group/person-dummy.jpg";
import { get, call, sync } from "vuex-pathify";
import RadialProgressBar from "vue-radial-progress";
import moment, { months } from "moment";
import Stars from "@/components/Star/Star.vue";
import Alert360 from "@/components/Alert360/alert360";

export default {
  data() {
    return {
      user: {},
      image: dummyimage,
      total: 10,
      Overall_rating: "0",
      checkin_rating: "0",
      selectedWeeklyDate: null
    };
  },
  components: {
    Widget,
    RadialProgressBar,
    AreaComponent,
    Alert360,
    Stars
  },
  async mounted() {
    if (this.$route.params && Object.keys(this.$route.params).length) {
      this.fetchData();
    } else {
      await this.get_profile();
      await this.get_activity();
      this.user = this.userProfile;
      this.selectedWeeklyDate = {
        text: this.$moment(new Date(this.user.weekly[0].created_at)).format(
          "MMMM"
        ),
        value: this.$moment(new Date(this.user.weekly[0].created_at)).format(
          "MMMM"
        )
      };
    }
  },
  computed: {
    userToCheckByAdmin_: sync("allMember/userToCheckByAdmin"),
    sortedArray() {
      if (this.user.profile) {
        this.checkin_rating = this.user.profile.Checkin_rating
          ? Math.round(this.user.profile.Checkin_rating)
          : 0;
        this.Overall_rating = this.user.profile.Overall_rating
          ? this.user.profile.Overall_rating
          : 0;
        let managers = this.user.profile.managers;
        if (managers) {
          function compare(a, b) {
            if (a.weight && b.weight) {
              if (a.weight > b.weight) return -1;
              if (a.weight < b.weight) return 1;
              return 0;
            }
          }
          managers = managers.sort(compare);
          return managers;
        }
      }
    },
    newArray() {
      let newArray = [];
      if (this.user.profile) {
        this.user.profile.kpi.kpi_json.forEach(element => {
          if (
            this.user &&
            this.user.profile.Monthly_rating &&
            Object.keys(this.user.profile.Monthly_rating).length
          ) {
            Object.keys(this.user.profile.Monthly_rating).forEach(ele => {
              if (element.ID === ele) {
                newArray.push({
                  ID: element.ID,
                  desc: element.desc,
                  edit: element.edit,
                  title: element.title,
                  rating: this.user.profile.Monthly_rating[ele]
                });
              }
            });
          } else {
            newArray.push({
              ID: element.ID,
              desc: element.desc,
              edit: element.edit,
              title: element.title,
              rating: 0
            });
          }
        });
        return newArray;
      }
    },
    eraArray() {
      let newArray = [];
      if (this.user.profile) {
        this.user.profile.kpi.era_json.forEach(era => {
          if (
            this.user &&
            this.user.profile.Monthly_rating &&
            Object.keys(this.user.profile.Monthly_rating).length
          ) {
            Object.keys(this.user.profile.Monthly_rating).forEach(ele => {
              if (era.ID === ele) {
                newArray.push({
                  ID: era.ID,
                  desc: era.desc,
                  edit: era.edit,
                  title: era.title,
                  rating: this.user.profile.Monthly_rating[ele]
                });
              }
            });
          } else {
            newArray.push({
              ID: era.ID,
              desc: era.desc,
              edit: era.edit,
              title: era.title,
              rating: 0
            });
          }
        });
        return newArray;
      }
    },
    WeeklyDateArray() {
      let dateArray = [];
      if (this.user && this.user.weekly) {
        this.user.weekly.forEach((weekReport, index) => {
          if (!dateArray.length) {
            dateArray.push({
              text: this.$moment(weekReport.created_at).format("MMMM"),
              value: this.$moment(weekReport.created_at).format("MMMM")
            });
          } else {
            let found = this.search(
              dateArray,
              this.$moment(weekReport.created_at).format("MMMM")
            );
            if (found === false) {
              dateArray.push({
                text: this.$moment(weekReport.created_at).format("MMMM"),
                value: this.$moment(weekReport.created_at).format("MMMM")
              });
            }
          }
        });
      }
      return dateArray;
    },
    weeklyReportArray() {
      let weekReport = [];
      if (this.user && this.user.weekly.length) {
        this.user.weekly.forEach(week => {
          if (
            this.selectedWeeklyDate.value ===
            this.$moment(week.created_at).format("MMMM")
          ) {
            weekReport.push(week);
          }
        });
      }
      return weekReport;
    }
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getActivity: call("profile/getActivity"),
    get_profile: function() {
      this.getProfile();
    },
    get_activity: function() {
      this.getActivity();
    },
    fetchData() {
      this.user = this.userToCheckByAdmin_;
      this.selectedWeeklyDate = {
        text: this.$moment(new Date(this.user.weekly[0].created_at)).format(
          "MMMM"
        ),
        value: this.$moment(new Date(this.user.weekly[0].created_at)).format(
          "MMMM"
        )
      };
    },
    search(dateArray, month) {
      for (let i = 0; i < dateArray.length; i++) {
        if (dateArray[i].value === month) {
          return true;
        }
      }
      return false;
    }
  },
  filters: {
    time: function(time) {
      return moment(time).format("hh:mm a");
    },
    day: function(day) {
      return moment(day).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "MMMM DD,YYYY",
        sameElse: "MMMM DD,YYYY"
      });
    },
    date(date){
      return moment(date).format('DD-MMMM-YYYY')
    }
  }
};
</script>

<style src="./overallReview.scss" lang="scss" scoped />
