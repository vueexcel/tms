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
          <div>
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
            <div>
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
        <div class="mt-3">
          <h3>Key Performance Area</h3>
          <div v-if="user.profile && user.profile.kpi && newArray && newArray.length">
            <section>
              <div v-for="(kpiera,index) in newArray" :key="index" class="areaBorder">
                <div class="d-flex">
                  <div
                    class="mb-0 bg-white pl-3 pt-1 w-100"
                    v-if="kpiera.title !== '' && kpiera.desc !== ''"
                    v-b-toggle="'manager' + kpiera.ID"
                  >
                    <p class="text-primary capitalize">
                      <span class="cursor_pointer">{{kpiera.title}}</span>
                    </p>
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
                  <div class="w-75 pl-5 line">
                    <div class="bg-secondary px-4 py-1 description">{{kpiera.desc}}</div>
                    <div
                      class="bg-secondary px-4 mt-2"
                      v-if="kpiera.managerReview && kpiera.managerReview.length"
                    >
                      <div class="bold text-white pt-2">Monthly Report Review</div>
                      <h6>Month - {{kpiera.managerReview[0].month.toUpperCase()}}</h6>
                      <div
                        v-for="review in kpiera.managerReview"
                        :key="review._id"
                      >{{review.comment}}</div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </section>
          </div>
          <h3>Extra Resource Area</h3>
          <div v-if="user.profile && user.profile.kpi && eraArray">
            <section>
              <div v-for="(kpiera,index) in eraArray" :key="index" class="areaBorder">
                <div class="d-flex">
                  <div
                    class="mb-0 bg-white pl-3 pt-1 pr-4 w-100"
                    v-if="kpiera.title !== '' && kpiera.desc !== ''"
                    v-b-toggle="'manager' + kpiera.ID"
                  >
                    <p class="text-primary capitalize">
                      <span class="cursor_pointer">{{kpiera.title}}</span>
                    </p>
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
                  <div class="w-75 pl-5 line">
                    <div class="bg-secondary px-4 py-1 description">{{kpiera.desc}}</div>
                    <!-- <div class="bg-secondary px-4 mt-2 " v-if="kpiera.managerReview && kpiera.managerReview.length">
                      <div class="bold text-white pt-2">Monthly Report Review</div>
                      <h6>Month - {{kpiera.managerReview[0].month.toUpperCase()}}</h6>
                      <div v-for="review in kpiera.managerReview" :key="review._id">
                        {{review.comment}}
                      </div>
                    </div>-->
                    <div
                      v-for="(manager,index) in user.profile.managers"
                      :key="index"
                      class="bg-secondary"
                    >
                      <b-row>
                        <b-col cols="4">
                         <div class="h-100">
              <div class="float-left pr-3">
                <img
                  :src="manager.profileImage ? manager.profileImage : image"
                  class="rounded-circle"
                  width="25"
                  height="25"
                  alt="..."
                />
              </div>

              <div class="pt-2">
                <span class="fs-larger text-capitalize">
                  <span class="fw-semi-bold">{{manager.username}}</span>
                </span>
                <p class="fw-small">{{manager.job_title}}</p>
              </div>
            </div>
                        </b-col>
                        <b-col>123</b-col>
                      </b-row>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </section>
          </div>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>
          <!-- <h1 class="page-title">View Manager's Review Monthly</h1>
          <div v-if="monthlyReport && monthlyReport.length">
            <ul
              v-for="( report, index ) in monthlyReport.slice().reverse()"
              :key="index"
              class="timeline"
            >
              <li :class="{onLeft : (index%2 == 0)}">
                <time class="eventTime" datetime="2014-05-19 03:04">
                  <span class="date">{{ report.created_at | day }}</span>
                  <span class="time">{{ report.created_at | time }}</span>
          </time>-->
          <!-- <section class="event">
            <div v-if="Object.keys(report.report).length">
              <strong>KPI :</strong>
              <hr>
              <div
                class="fs-mini white-space-pre"
                v-for="(kpiera, indexkpi) in report.report.kpi"
                :key="indexkpi"
              >
                <h4 class="text-primary">{{ kpiera.title }}</h4>
                <h5>{{ kpiera.desc }}</h5>
                <h6 class="text-monospace">Comment:</h6>
                <div class="dialogbox">
                  <div class="body">
                    <span class="tip tip-up"></span>
                    <div class="message">
                      <span>{{ kpiera.comment }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <strong>ERA :</strong>
              <hr>
              <div
                class="fs-mini white-space-pre"
                v-for="(kpiera, indexera) in report.report.era"
                :key="indexera + report.report.kpi.length"
              >
                <h4 class="text-primary">{{ kpiera.title }}</h4>
                <h5>{{ kpiera.desc }}</h5>
                <h6 v-if="kpiera.comment" class="text-monospace">Comment:</h6>
                <div v-if="kpiera.comment" class="dialogbox">
                  <div class="body">
                    <span class="tip tip-up"></span>
                    <div class="message">
                      <span>{{ kpiera.comment }}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>-->
          <!-- <footer> -->
          <!-- <h3 v-if="!report.review" class="text-danger">No review from manager yet!</h3>
                <ul v-else class="postComments">
                  <a class="fw-bold text-monospace pl-3">Manager's Review</a>
                  <li v-for="(managerReview, reviewIndex) in report.is_reviewed" :key="reviewIndex">
                    {{managerReview.profileImage}}
                    <span class="thumb-xs avatar pull-left mr-sm">
                      <img
                        class="rounded-circle"
                        :src="managerReview.profileImage 
                    ? managerReview.profileImage : 
                  image"
                        alt="..."
                      />
                    </span>
                    <div class="commentBody">
                      <h6 class="author fs-sm fw-semi-bold">
          {{report.is_reviewed.username}}-->
          <!-- <small>{{report.re | time}}</small> -->
          <!-- </h6>
                      <div class="manager_comment">
                        <div v-if="managerReview.comment">
                          <div>
                            <strong>KPI :</strong>
                            <hr />
                            <div
                              class="fs-mini white-space-pre mb-4"
                              v-for="(kpiera, managerindexkpi) in managerReview.comment.kpi"
                              :key="managerindexkpi"
                            >
                              <h4 class="text-primary">{{ kpiera.title }}</h4>
                              <h5>{{ kpiera.desc }}</h5>
                              <h6 class="text-monospace">Comment:</h6>
                              <div class="dialogbox">
                                <div class="body">
                                  <span class="tip tip-up"></span>
                                  <div class="message">
                                    <span>{{ kpiera.comment }}</span>
                                  </div>
                                </div>
                              </div>
                              <h6 v-if="kpiera.rating" class="text-monospace">Rating:</h6>
                              <Stars
                                :displayStar="10"
                                :ratedStar="Number(kpiera.rating)"
                                :starSize="'20px'"
                                :disableStar="false"
                              />
                            </div>
                            <strong>ERA :</strong>
                            <hr />
                            <div
                              class="fs-mini white-space-pre mb-4"
                              v-for="(kpiera, managerindexera) in managerReview.comment.era"
                              :key="managerindexera + kpiera.id"
                            >
                              <h4 class="text-primary">{{ kpiera.title }}</h4>
                              <h5>{{ kpiera.desc }}</h5>
                              <h6 v-if="kpiera.comment" class="text-monospace">Comment:</h6>
                              <div v-if="kpiera.comment" class="dialogbox">
                                <div class="body">
                                  <span class="tip tip-up"></span>
                                  <div class="message">
                                    <span>{{ kpiera.comment }}</span>
                                  </div>
                                </div>
                              </div>
                              <h6 v-if="kpiera.rating" class="text-monospace">Rating:</h6>
                              <Stars
                                :displayStar="10"
                                :ratedStar="Number(kpiera.rating)"
                                :starSize="'20px'"
                                :disableStar="false"
                              />
                            </div>
                          </div>
                        </div>
                        <span v-else>No comment from your Manager</span>
                      </div>
                    </div>
                  </li>
          </ul>-->
          <!-- </footer> -->
          <!-- </section> -->
          <!-- </li>
            </ul>
          </div>-->
        </div>
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
      checkin_rating: "0"
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
        if (this.user.monthly.length) {
          for (var i = 0; i < newArray.length; i++) {
            newArray[i]["managerReview"] = [];
            this.user.monthly.forEach(monthReport => {
              if (monthReport.review) {
                monthReport.review.forEach(review => {
                  review.comment.kpi.find(kpi => {
                    if (
                      newArray[i].title.toLowerCase() ===
                      kpi.title.toLowerCase()
                    ) {
                      kpi["month"] = monthReport.month;
                      newArray[i].managerReview.push(kpi);
                    }
                  });
                });
              }
            });
          }
        }

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
        if (this.user.monthly.length) {
          for (var i = 0; i < newArray.length; i++) {
            newArray[i]["managerReview"] = [];
            this.user.monthly.forEach(monthReport => {
              if (monthReport.review) {
                monthReport.review.forEach(review => {
                  review.comment.era.find(era => {
                    if (
                      newArray[i].title.toLowerCase() ===
                      era.title.toLowerCase()
                    ) {
                      era["month"] = monthReport.month;
                      newArray[i].managerReview.push(era);
                    }
                  });
                });
              }
            });
          }
        }
        return newArray;
      }
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
    }
  }
};
</script>

<style src="./overallReview.scss" lang="scss" scoped />
