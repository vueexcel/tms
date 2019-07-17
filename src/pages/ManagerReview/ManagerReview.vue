<template>
  <div>
    <h1 class="page-title">View Manager's Review</h1>
    <Alert360 />
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
        class="timeline"
        v-for="( report, index ) in reviewedReport.slice().reverse()"
        :key="index"
      >
        <li :class="{onLeft : (index%2 == 0)}">
          <time class="eventTime" datetime="2014-05-19 03:04">
            <span class="date">{{ report.created_at | day }}</span>
            <span class="time">{{ report.created_at | time }}</span>
          </time>
          <span class="eventIcon" :class="index/2 === 0 ? 'eventIconSuccess' : 'eventIconPrimary'">
            <i
              class="glyphicon"
              :class="index/2 === 0 ? 'glyphicon-comments' : 'glyphicon-duplicate'"
            />
          </span>
          <section class="event">
            <span class="thumb-sm avatar pull-left mr-sm">
              <img
                class="rounded-circle"
                :src="report.profileImage ? report.profileImage : image"
                alt="..."
              />
            </span>
            <h4 class="eventHeading">
              <a href="#">{{report.username}}</a>
            </h4>
            <p class="fs-sm text-muted">{{ report.created_at | moment }}</p>
            <div v-if="report.k_highlight && !report.k_highlight.length">
              <p class="fs-mini white-space-pre">
                <strong>KPI?/KRA :</strong>
                &nbsp;{{ report.k_highlight.kra ? report.k_highlight.kra : report.k_highlight.KpiEra }}
              </p>
              <p class="fs-mini white-space-pre hightlight">
                <strong>Highlight :</strong>
                &nbsp;{{ report.k_highlight.kpi ? report.k_highlight.kpi : report.k_highlight.description}}
              </p>
            </div>
            <div v-if="report.k_highlight && report.k_highlight.length">
              <div v-for="reportKPI in report.k_highlight" :key="reportKPI._id">
                <p class="fs-mini white-space-pre">
                  <strong>KPI?/KRA :</strong>
                  &nbsp;{{ reportKPI.KpiEra }}
                </p>
                <p class="fs-mini white-space-pre hightlight">
                  <strong>Highlight :</strong>
                  &nbsp;{{ reportKPI.description}}
                </p>
              </div>
            </div>
            <p class="fs-mini text-custom white-space-pre">
              <strong>Extra Work/Feedback/Issues :</strong>
              &nbsp;{{ report.extra }}
            </p>
            <p class="reportStar">
              <Stars
                :displayStar="5"
                :ratedStar="Number(report.difficulty)"
                :starSize="'17px'"
                :disableStar="false"
              />
            </p>
            <footer>
              <a href class="text-muted">Manager's Review</a>
              <ul class="postComments">
                <li v-for="(managerReview, reviewIndex) in report.review" :key="reviewIndex">
                  <span class="thumb-xs avatar pull-left mr-sm">
                    <img
                      class="rounded-circle"
                      :src="managerReview.manager_id.profileImage 
                    ? managerReview.manager_id.profileImage : 
                    image"
                      alt="..."
                    />
                  </span>
                  <div class="commentBody">
                    <h6 class="author fs-sm fw-semi-bold">
                      {{managerReview.manager_id.username}}
                      <small>{{managerReview.created_at | time}}</small>
                    </h6>
                    <p class="manager_comment">
                      <span v-if="managerReview.comment">{{managerReview.comment}}</span>
                      <span v-else>No comment from your Manager</span>
                    </p>
                    <div class="starClass">
                      Difficulty :
                      <Stars
                        :displayStar="10"
                        :ratedStar="Number(managerReview.difficulty)"
                        :starSize="'10px'"
                        :disableStar="false"
                      />
                    </div>
                    <div class="starClass">
                      Overall Rating :
                      <Stars
                        :displayStar="10"
                        :ratedStar="Number(managerReview.rating)"
                        :starSize="'10px'"
                        :disableStar="false"
                      />
                    </div>
                  </div>
                </li>
                 <div v-if="report.skip_reason && report.skip_reason.length">
                <li v-for="(reason, index) in report.skip_reason" :key="index" class="mb-3">
                  <div class="comment-body bg-warning px-2 py-1">
                    <p class="mb-0">
                      <span class="ml-5 font-weight-bold">Skipped :</span>
                      {{ reason }}
                    </p>
                  </div>
                </li>
              </div>
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
import Alert360 from "@/components/Alert360/alert360";
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
    Stars,
    Alert360
  },
  methods: {
    getManagersReview_: call("weeklyReportReview/getManagersReview"),
    async callApi() {
      this.loading = true;
      let response = await this.getManagersReview_();
      if (response.length && typeof response !== "string") {
        this.reviewedReport = response;
      } else {
        if (typeof response === "string") {
          this.error = true;
          this.errorMessage = response;
        } else {
          this.error = true;
          this.errorMessage =
            "None of your manager has been reviewed your report ! ";
        }
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

<style src="./MangerReview.scss" lang="scss" scoped />
