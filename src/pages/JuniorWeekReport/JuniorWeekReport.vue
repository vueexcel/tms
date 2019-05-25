<template>
  <div>
    <h1 class="page-title">View Junior's Checkin</h1>
    <div v-if="!loading && !juniorReport.length">
      <b-alert class="alert-transparent alert-danger" show>
        <span>None of your Junior have created Weekly Report</span>
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
        :class="{onLeft: (index%2 == 0) }"
      >
        <time class="eventTime" datetime="2014-05-19 03:04">
          <span class="date">{{ junior.created_at | day }}</span>
          <span class="time">{{ junior.created_at | time }}</span>
        </time>
        <span
          class="eventIcon"
          :class="junior.highlight == '' ? 'eventIconSuccess' : 'eventIconPrimary'"
        >
          <i
            class="glyphicon"
            :class="junior.highlight == '' ? 'glyphicon-comments' : 'glyphicon-duplicate'"
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
          <p class="fs-mini white-space-pre">{{ junior.extra }}</p>
          <p class="fs-mini text-custom white-space-pre">{{ junior.k_highlight }}</p>
          <span>
              <Stars
                :displayStar="5"
                :ratedStar="Number(junior.difficulty)"
                :starSize="'10px'"
                :disableStar="false"
                />
          </span>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import { call } from "vuex-pathify";
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
      errorMessage: ''
    };
  },
  components: {
      Stars,
  },
  created() {
    this.getJuniorWeekReport();
  },
  methods: {
    juniorWeeklyReport_api: call("weeklyReportReview/juniorWeeklyReport"),
    async getJuniorWeekReport() {
      this.loading = true;
      let response = await this.juniorWeeklyReport_api()
      if(response.length && typeof(response) !== 'string'){
        this.juniorReport = response
      } else {
            this.error = true
            if(typeof(response) === 'string'){
                this.errorMessage = response
            } else {
            this.errorMessage = 'No Weekly report from you juiniors'
        }
      }
      this.loading = false
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
