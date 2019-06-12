<template>
  <div>
    <h1 class="page-title">Check-Ins</h1>
    <span class="fs-sm" v-if="reports.length">
      <i class="fa fa-circle text-info"/> Give Reason (task not completed)
      <i class="ml-1 fa fa-circle text-warning"/> Highlighted task (task not completed)
    </span>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="6" xs="12">
          <div class="pb-xlg">
            <!-- time line starts here  -->
            <div
              class="timeline mr-3"
              v-for="(report, index) in reports.slice().reverse()"
              :key="index"
            >
              <ul>
                <li class="c1">
                  <div class="content p-0">
                    <!-- <h3>What is Lorem Ispem?</h3> -->
                    <p>
                      <img
                        class="rounded-circle mr-2 mt-1 float-left"
                        :src="userProfile.profileImage ? userProfile.profileImage : image"
                        width="25"
                        height="25"
                        alt="..."
                      >
                      <span>
                        <span
                          class="text-primary fs-larger fw-semi-bold"
                          :class="{not_completed : report.task_completed === false}"
                        >
                          <!-- {{ report.user }} -->
                          {{ currentUserName }}
                        </span>
                        <br>
                        <span :class="{not_completed : report.task_completed === false}">
                          {{time}}
                          {{report.created}}
                        </span>
                      </span>
                    </p>
                    <p
                      class="white-space-pre mt-0 pt-0"
                      :class="{not_completed : report.task_completed === false}"
                    >{{report.report}}</p>
                    <span v-if="report.task_not_completed_reason !== '' || report.highlight !=='' ">
                      <p
                        class="text-primary btn"
                        v-if="!read_more[index]"
                        @click="showData( index,'readMore' )"
                      >Read more..</p>
                      <p
                        v-if="read_more[index]"
                        class="textColor white-space-pre"
                        :class="{not_completed : report.task_completed === false}"
                      >{{report.task_not_completed_reason}}</p>
                      <p
                        v-if="read_more[index]"
                        class="text-warning white-space-pre"
                        :class="{not_completed : report.task_completed === false}"
                      >{{report.highlight}}</p>
                      <p
                        class="text-primary btn"
                        v-if="read_more[index]"
                        @click="showData( index,'readLess' )"
                      >Read less..</p>
                    </span>
                  </div>
                  <div class="time">
                    <h4>
                      {{date}}
                      {{ report.day}}
                      <br>
                      {{date}}
                      {{report.time}}
                    </h4>
                  </div>
                </li>
              </ul>
              <ul>
                <div>
                  <li class="c2" v-if="report.managerComment">
                    <StandUpWidget
                      imgSrc="./../../../static/people/a6.jpg"
                      :generatedReport="report.report"
                      :userReport="report.report"
                      :highlight="report.highlight"
                      :userName="report.user"
                      :date_Time="report.created"
                    ></StandUpWidget>
                    <!-- ============ COMMENTS =========== -->
                    <Comments
                      userName="Ignacio Abad"
                      commentTime="6 mins ago"
                      comment="Hey, have you heard anything about that?"
                      imgSrc="@/assets/people/a1.jpg"
                    ></Comments>
                    <div class="time">
                      <h4>
                        today
                        <br>9:41
                        <span class="fw-semi-bold">am</span>
                      </h4>
                    </div>
                  </li>
                </div>
              </ul>
              <!-- <ul>
                <li class="c3">
                  <StandUpWidget
                    v-if="false"
                    imgSrc="@/assets/people/a6.jpg"
                    userName="Jessica Smith"
                    date_Time="Today at 9:41 AM"
                    userReport="Standup
                      will work on
                      singapp  implement pathify
                      read more..."
                  ></StandUpWidget>
                  <div class="time">
                    <h4>
                      today
                      <br>9:41
                      <span class="fw-semi-bold">am</span>
                    </h4>
                  </div>
                </li>
              </ul>-->
            </div>
            <!-- timeline ends here -->
          </div>
        </b-col>

        <!--==================================================================== 
          * Right general report
        *=======================================================================-->
        <b-col class="p-0">
          <GenReport @report="report" :slackChannels="slackChannels" @deleteCheckin="deleteCheckin" :error="error"></GenReport>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";

/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import Widget from "@/components/Widget/Widget";
import { sync, call, get } from "vuex-pathify";
import StandUpWidget from "./CheckinComponents/StandupReportWidget";
import Comments from "./CheckinComponents/Comments";
import GenReport from "./GenReport";
import { timeout } from "q";
import dummyimage from "@/components/Group/person-dummy.jpg";

export default {
  name: "Checkin",
  data() {
    return {
      generatedReport: [],
      read_more: [],
      image: dummyimage,
      error: "",
      errorMessage: false,
      slackChannels: []
    };
  },
  components: { Widget, StandUpWidget, Comments, GenReport },
  computed: {
    userProfile: get("profile/user"),
    reports: get("checkin/reports"), //data from API getAllCheckins
    time() {
      this.reports.forEach(element => {
        var time = this.$moment(element.created_at)
          .tz("GMT")
          .local()
          .format("h:mm: A");
        if (time !== "Invalid date") {
          element["created"] =
            this.$moment(element.created_at).calendar(null, {
              sameDay: "[Today]",
              nextDay: "[Tomorrow]",
              nextWeek: "dddd",
              lastDay: "[Yesterday]",
              lastWeek: "MMMM DD,YYYY",
              sameElse: "MMMM DD,YYYY"
            }) +
            " at " +
            time;
        }
      });
    },
    date() {
      this.reports.forEach(date => {
        var time = this.$moment(date.created_at)
          .tz("GMT")
          .local()
          .format("h:mm: A");
        if (time !== "Invalid date") {
          date["time"] = this.$moment(date.created_at).format("h:mm: A");
          date["day"] = this.$moment(date.created_at).calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "dddd",
            sameElse: "DD/MM/YYYY"
          });
        }
      });
    },
    currentUserName() {
      let UserName;
      if (this.userProfile._id === this.reports[0].user) {
        UserName = this.userProfile.username;
      }
      return UserName;
    }
  },
  mounted() {
    this.getAllCheckinsAPI();
    this.getAllSlackChannels();
  },
  methods: {
    dailyCheckin: call("checkin/dailyCheckin"),
    deleteDailyCheckin: call("checkin/deleteDailyCheckin"),
    getProfile: call("profile/getProfile"),
    getAllCheckins: call("checkin/getAllCheckins"),
    getAllSlackChannels_: call("checkin/getAllSlackChannels"),
    getAllCheckinsAPI: function() {
      this.getAllCheckins();
    },
    async getAllSlackChannels() {
      this.slackChannels = [];
      let response = await this.getAllSlackChannels_();
      if (response.length && typeof response !== "string") {
        this.slackChannels = response;
      } else {
        this.errorMessage = true;
        if (typeof response === "string") {
          this.error = response;
        } else {
          this.error = "No Slack Channel Found";
        }
      }
    },
    async report(report) {
      let response = await this.dailyCheckin({
        report: report.report,
        task_completed: report.task_completed,
        task_not_completed_reason: report.task_not_completed_reason,
        highlight: report.highlight,
        date: report.date,
        slackChannels: report.slackChannels
      }).then(res => {
        this.getAllCheckinsAPI();
        this.getProfile(res.date);
      });
      if (response === false) {
        this.error = "Invalid Request";
      }
    },
    deleteCheckin(deleteReport) {
      this.deleteDailyCheckin(deleteReport);
    },
    showData: function(index, mode) {
      if (mode === "readMore") {
        Vue.set(this.read_more, index, true);
      } else {
        Vue.set(this.read_more, index, false);
      }
    }
  },
  filters: {
    moment: function(date) {
      return this.$moment(date).format("MMMM DD YYYY");
    }
  }
};
</script>

<style src="./Checkin.scss" lang="scss" scoped />
