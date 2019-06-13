<template>
  <div>
    <h1 class="page-title">View All Review 360</h1>
    <!-- <div v-if="!allUserReviews.length && !loading"> -->
    <!-- ###### alert made false -->
    <div v-if="!allUserReviews.length && !loading">
      <b-alert class="alert-transparent alert-danger" show>
        <span>None of your Junior have submitted 360 review for this month</span>
      </b-alert>
    </div>
    <!-- <span class="fs-sm" v-if="allUserReviews.length">
      <i class="fa fa-circle text-info"/> Give Reason (task not completed)
      <i class="ml-1 fa fa-circle text-warning"/> Highlighted task (task not completed)
    </span>-->
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <div>Loading...</div>
    </div>
    <!-- <ul class="timeline" v-if="allUserReviews.length"> -->
    <ul class="timeline" v-if="allUserReviews.length">
      <li
        v-for="( junior, index ) in allUserReviews.slice().reverse()"
        :key="index"
        :class="{ onLeft: index %2 ==0 }"
      >
        <!-- :class="{onLeft:junior.highlight == '' || junior.task_not_completed_reason == '' }" -->
        <time class="eventTime" datetime="2014-05-19 03:04">
          <!-- <span class="date">{{ junior.created_at | day }}</span> -->
          <!-- <span class="time">{{ junior.created_at | time }}</span> -->
          <span class="time">{{ junior.month }}</span>
        </time>
        <span :class="junior.anon ? 'eventIconWarning' : 'eventIconSuccess'" class="eventIcon">
          <i :class="junior.anon ? 'glyphicon-eye-close' : 'glyphicon-eye-open'" class="glyphicon"/>
        </span>

        <section class="event">
          <span class="thumb-xs avatar pull-left mr-sm">
            <img
              :src="junior.profileImage ? junior.profileImage: image"
              class="rounded-circle"
              alt="..."
            >
          </span>
          <h5 class="eventHeading">
            <a class="text-primary" v-if="junior.username">{{ junior.username }}</a>
            <a class="text-primary" v-else>#anonymous</a>
          </h5>
          <p class="fs-sm text-muted">
            <!-- {{ junior.created_at | moment }} -->
          </p>
          <p>
            <!-- {{ junior.report }} -->
            Manager:
            <span class="fw-bold">{{ junior.manager }}</span>
          </p>
          <p class="fs-mini mb-0">
            Comment:
            <span class="white-space-pre text-info fs-lg fw-semi-bold">{{ junior.comment }}</span>
          </p>
          <p>
            <starRating class :ratedStar="junior.rating" :displayStar="10" :starSize="'18px'"/>
          </p>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import { call } from "vuex-pathify";
import image from "@/assets/people/anon.svg";
import starRating from "@/components/Star/Star";

export default {
  name: "Timeline",
  components: { starRating },
  data() {
    return {
      image,
      allUserReviews: [],
      loading: false
    };
  },
  created() {
    this.getall360Reviews();
  },
  methods: {
    api_getAllJuniorReviews: call("review360/getAllJuniorReviews"),
    getall360Reviews() {
      this.loading = true;
      this.allUserReviews = [];
      this.api_getAllJuniorReviews()
        .then(res => {
          res.data.forEach(element => {
            this.allUserReviews.push(element);
          });
          this.loading = false;
        })
        .catch(err => {
          console.log(err.response);
          this.loading = false;
        });
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

<style src="./../../components/Timeline/Timeline.scss" lang="scss" scoped />
