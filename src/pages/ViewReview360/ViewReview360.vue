<template>
  <div>
    <h1 class="page-title">View All Review 360&#176;</h1>
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
        <!-- {{ junior.seen_id}} {{loggedInUser._id}} -->
        <!-- <section class="event" :class="{'bg-success': !junior.seen}"> -->
        <section class="event" :class="{'bg-success': junior.seen_id === loggedInUser._id}">
          <span class="thumb-xs avatar pull-left mr-sm">
            <img
              :src="junior.profileImage ? junior.profileImage: image"
              class="rounded-circle"
              alt="..."
            >
          </span>
          <b-form-group
            v-if="junior.seen_id && loggedInUser._id === junior.manager_id"
            class="abc-checkbox abc-checkbox-success abc-checkbox-circle float-right"
          >
            <!-- <input type="checkbox" :checked="anon" v-model="anon" id="checkbox-circle"> -->
            <input
              v-if="!spinnerLoading[index]"
              @click="seenStatus(junior,index)"
              :checked="anonseen[index]"
              v-model="anonseen[index]"
              type="checkbox"
              :id="`checkbox-circle${index}`"
            >
            <label
              v-b-tooltip.hover
              title="Your Junior won't know if you have seen this or not"
              v-if="!spinnerLoading[index]"
              :for="`checkbox-circle${index}`"
            >seen</label>
            <span v-if="spinnerLoading[index]">
              <i class="fa fa-circle-o-notch fa-spin fa-2x text-warning"></i>
            </span>
          </b-form-group>
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
import { call, get } from "vuex-pathify";
import image from "@/assets/people/anon.svg";
import starRating from "@/components/Star/Star";

export default {
  name: "Timeline",
  components: { starRating },
  data() {
    return {
      image,
      allUserReviews: [],
      loading: false,
      anonseen: [],
      spinnerLoading: []
    };
  },
  created() {
    this.getall360Reviews();
  },
  computed: {
    loggedInUser: get("profile/user")
  },
  methods: {
    api_getAllJuniorReviews: call("review360/getAllJuniorReviews"),
    api_setSeenStatus: call("review360/setSeenStatus"),
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
    },
    seenStatus(val, index) {
      this.spinnerLoading[index] = true;
      this.api_setSeenStatus(val._id)
        .then(res => {
          if (res.data.msg === "success seen") {
            val.seen_id = null;
            this.spinnerLoading[index] = false;
            this.api_getAllJuniorReviews();
          } else {
            alert("something went wrong!");
            this.spinnerLoading[index] = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.spinnerLoading[index] = false;
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
