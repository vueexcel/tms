<template>
  <div>
    <h1 class="page-title">View Junior's Checkin</h1>
    <Alert360 />
    <div v-if="!juniorCheckin.length && !loading">
      <b-alert class="alert-transparent alert-danger" show>
        <span>None of your Junior have submitted checkin for this week</span>
      </b-alert>
    </div>
    <span class="fs-sm d-flex flex-column flex-wrap d-md-inline pl-3 mb-3 mb-sm-0" v-if="juniorCheckin.length">
      <span>
        <i class="fa fa-circle text-info" /> Give Reason (task not completed)
      </span>
      <span>
        <i class="fa fa-circle text-warning" /> Highlighted task (task not completed)
      </span>
    </span>
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <div>Loading...</div>
    </div>
    <ul class="timeline" v-if="juniorCheckin.length">
      <li
        v-for="( junior, index ) in juniorCheckin.slice().reverse()"
        :key="index"
        :class="{ onLeft: index %2 ==0 }"
      >
        <!-- :class="{onLeft:junior.highlight == '' || junior.task_not_completed_reason == '' }" -->
        <time class="eventTime" datetime="2014-05-19 03:04">
          <span class="date">{{ junior.created_at | day }}</span>
          <span class="time">{{ junior.created_at | time }}</span>
        </time>
        <span
          class="eventIcon"
          :class="junior.highlight == '' || junior.task_not_completed_reason == ''? 'eventIconSuccess' : 'eventIconPrimary'"
        >
          <i
            class="glyphicon"
            :class="junior.highlight == '' || junior.task_not_completed_reason == ''? 'glyphicon-comments' : 'glyphicon-duplicate'"
          />
        </span>

        <section class="event">
          <span class="thumb-xs avatar pull-left mr-sm">
            <img
              class="rounded-circle"
              :src="junior.user.profileImage ? junior.user.profileImage: image"
              alt="..."
            />
          </span>
          <h5 class="eventHeading">
            <a class="text-primary">{{ junior.user.name }}</a>
          </h5>
          <p class="fs-sm text-muted">{{ junior.created_at | moment }}</p>
          <!-- <p class="fs-mini white-space-pre">{{ junior.report }}</p> -->
          <div v-html="junior.report" class="report-wysiwyg wordBreak"></div>
          <p class="fs-mini text-custom white-space-pre">{{ junior.highlight }}</p>
          <p class="fs-mini text-warning white-space-pre">{{ junior.task_not_completed_reason }}</p>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import { call } from "vuex-pathify";
import image from "./../../assets/avatar.png";
import Alert360 from "@/components/Alert360/alert360";

export default {
  name: "Timeline",
  components: {
    Alert360
  },
  data() {
    return {
      image,
      juniorCheckin: [],
      loading: false
    };
  },
  created() {
    this.getJuniorCheckin();
  },
  methods: {
    api_getJuniorCheckin: call("checkin/juniorCheckin"),
    getJuniorCheckin() {
      this.loading = true;
      this.juniorCheckin = [];
      this.api_getJuniorCheckin()
        .then(res => {
          res.data.forEach(element => {
            this.juniorCheckin.push(element);
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

<style src="./Timeline.scss" lang="scss" scoped />
