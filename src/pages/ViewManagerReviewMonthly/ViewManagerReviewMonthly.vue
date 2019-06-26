<template>
  <div>
    <h1 class="page-title">View Manager's Review Monthly</h1>
    <div v-if="error">
      <b-alert class="alert-transparent alert-danger" show>
        <span>{{errorMessage}}</span>
      </b-alert>
    </div>
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <div>Loading...</div>
    </div>
    <div v-if="reviewedReport">
      <ul
        v-for="( report, index ) in reviewedReport.slice().reverse()"
        :key="index"
        class="timeline"
      >
        <li :class="{onLeft : (index%2 == 0)}">
          <time class="eventTime" datetime="2014-05-19 03:04">
            <span class="date">{{ report.created_at | day }}</span>
            <span class="time">{{ report.created_at | time }}</span>
          </time>
          <span class="eventIcon" :class="index%2 === 0 ? 'eventIconSuccess' : 'eventIconPrimary'">
            <i
              :class="index%2 === 0 ? 'glyphicon-comments' : 'glyphicon-duplicate'"
              class="glyphicon"
            />
          </span>
          <section class="event">
            <span class="thumb-sm avatar pull-left mr-sm">
              <img
                class="rounded-circle"
                :src="report.user.profileImage ? report.user.profileImage : image"
                alt="..."
              >
            </span>
            <h4 class="eventHeading">
              <a class="text-primary">{{report.user.username}}</a>
            </h4>
            <p class="fs-sm text-muted">{{ report.created_at | moment }}</p>

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
            </div>
            <footer>
              <h3 v-if="!report.review" class="text-danger">No review from manager yet!</h3>
              <ul v-else class="postComments">
                <a class="fw-bold text-monospace pl-3">Manager's Review</a>
                <li v-for="(managerReview, reviewIndex) in report.review" :key="reviewIndex">
                  <span class="thumb-xs avatar pull-left mr-sm">
                    <img
                      class="rounded-circle"
                      :src="managerReview.manager_id.profileImage 
                    ? managerReview.manager_id.profileImage : 
                  image"
                      alt="..."
                    >
                  </span>
                  <div class="commentBody">
                    <h6 class="author fs-sm fw-semi-bold">
                      {{managerReview.manager_id.username}}
                      <small>{{managerReview.created_at | time}}</small>
                    </h6>
                    <div class="manager_comment">
                      <div v-if="managerReview.comment">
                        <div>
                          <strong>KPI :</strong>
                          <hr>
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
                          <hr>
                          <div
                            class="fs-mini white-space-pre mb-4"
                            v-for="(kpiera, managerindexera) in managerReview.comment.era"
                            :key="managerindexera + managerReview.comment.kpi.length"
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
              </ul>
            </footer>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { get, call, sync } from "vuex-pathify";
import moment from "moment";
import image from "./person-dummy.jpg";
import Stars from "@/components/Star/Star.vue";

export default {
  data() {
    return {
      loading: false,
      reviewedReport: [],
      error: false,
      errorMessage: "",
      starSize: "15px",
      image: image
    };
  },
  mounted() {
    this.callApi();
  },
  components: {
    Stars
  },
  methods: {
    api_getViewMonthlyManagerReview: call(
      "monthlyReport/getViewMonthlyManagerReview"
    ),
    async callApi() {
      this.loading = true;
      let response = await this.api_getViewMonthlyManagerReview();
      if (response.status === 200) {
        this.reviewedReport = response.data;
      } else {
        console.log(response.status);
        
        this.error = true;
        this.errorMessage =
          "None of your manager has reviewed your report yet! ";
      }
      this.loading = false;
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM DD YYYY [at] hh:mm a");
    },
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

<style src="./ViewMangerReviewMonthly.scss" lang="scss" scoped />
