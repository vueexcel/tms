<template>
  <div>
    <h1 class="page-title">View Junior's Weekly Report</h1>
    <div v-if="error">
      <b-alert class="alert-transparent alert-danger" show>
        <span>{{errorMessage}}</span>
      </b-alert>
    </div>
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <div>Loading...</div>
    </div>
    <ul class="timeline">
      <li
        v-for="( junior, index ) in juniorReport.slice().reverse()"
        :key="index"
        :class="{onLeft: (junior.reviewedByUser ? true : false) }"
      >
        <time class="eventTime" datetime="2014-05-19 03:04">
          <span class="date">{{ junior.created_at | day }}</span>
          <span class="time">{{ junior.created_at | time }}</span>
        </time>
        <span
          class="eventIcon"
          :class="junior.reviewedByUser ?  'eventIconPrimary' : 'eventIconSuccess'"
        >
          <i
            class="glyphicon"
            :class="junior.reviewedByUser  ?  'glyphicon-duplicate' : 'glyphicon-comments'"
          />
        </span>

        <section class="event">
          <span class="thumb-xs avatar pull-left mr-sm">
            <img
              class="rounded-circle"
              :src="junior.user.profileImage ? junior.user.profileImage: image"
              alt="..."
            >
          </span>
          <h5 class="eventHeading">
            <a class="text-primary">{{ junior.user.name }}</a>
          </h5>
          <p class="fs-sm text-muted">{{ junior.created_at | moment }}</p>
          <p v-if="junior.k_highlight.kra">
            <strong>For Kpi/Kra :</strong>
            &nbsp;{{junior.k_highlight.kra}}
          </p>
          <p class="fs-mini white-space-pre">
            <strong>Extra Work : &nbsp;</strong>
            {{ junior.extra }}
          </p>
          <p class="fs-mini text-custom white-space-pre">
            <strong>Highlight : &nbsp;</strong>
            {{ junior.k_highlight.kpi }}
          </p>
          <div class="starClass">
            <strong>Difficulty Level : &nbsp;</strong>
            <Stars
              :displayStar="5"
              :ratedStar="Number(junior.difficulty)"
              :starSize="'15px'"
              :disableStar="false"
            />
          </div>
          <footer class="eventFooter pt-0">
            <ul class="post-comments" v-if="junior.review.length">
              <li v-for="(comment, index) in junior.review" :key="index">
                <span class="thumb-xs avatar pull-left mr-sm">
                  <img class="rounded-circle" :src="image" alt="...">
                </span>
                <div class="comment-body">
                  <h6 class="author fs-sm fw-semi-bold">{{comment.manager_id.name}}</h6>
                  <p>{{ comment.comment }}</p>
                </div>
              </li>
            </ul>
            <div class="text-danger" v-else>No comments yet!</div>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import { get, call } from "vuex-pathify";
import image from "./../../assets/avatar.png";
import Stars from "@/components/Star/Star.vue";

export default {
  name: "Timeline",
  data() {
    return {
      image,
      juniorReport: [],
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  components: {
    Stars
  },
  computed: {
    user: get("profile/user")
  },
  created() {
    this.getJuniorWeekReport();
  },
  methods: {
    juniorWeeklyReport_api: call("weeklyReportReview/juniorWeeklyReport"),
    async getJuniorWeekReport() {
      this.loading = true;
      let response = await this.juniorWeeklyReport_api();
      if (response.length && typeof response !== "string") {
        this.isReviewed(response);
        this.juniorReport = response;
      } else {
        this.error = true;
        if (typeof response === "string") {
          this.errorMessage = response;
        } else {
          this.errorMessage = "No Weekly report from you juiniors";
        }
      }
      this.loading = false;
    },
    isReviewed(reportArray) {
      for (var i = 0; i < reportArray.length; i++) {
        if (reportArray[i].is_reviewed) {
          var found = reportArray[i].is_reviewed.find(manager => {
            if (manager._id === this.user._id) {
              reportArray[i]["reviewedByUser"] = manager.reviewed;
            }
          });
        }
      }
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

<style src="./../ViewCheckin/Timeline.scss" lang="scss" scoped />
