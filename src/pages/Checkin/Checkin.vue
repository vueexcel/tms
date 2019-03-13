<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Check-ins</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Check-Ins</h1>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="6" xs="12">
          <div class="pb-xlg">
            <!-- time line starts here  -->
            <div class="timeline mr-3">
              <ul v-for="(report, index) in reports" :key="index">
                <li class="c1">
                  <div class="content p-0">
                    <!-- <h3>What is Lorem Ispem?</h3> -->
                    <p>
                      <img
                        class="rounded-circle mr-2 mt-1 float-left"
                        src="@/assets/people/a6.jpg"
                        width="35"
                        height="35"
                        alt="..."
                      >
                      <span>
                        <span class="text-primary fs-larger fw-semi-bold">Jessica Smith=======</span>
                        <br>
                        <span>
                          {{ report.created_at.slice(0,-12)}} at
                          {{new Date(report.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}}
                        </span>
                      </span>
                    </p>
                    <p>{{report.report}}</p>
                  </div>
                  <div class="time">
                    <h4>
                      {{ report.created_at.substr(0, report.created_at.indexOf(',')) }}
                      <br>
                      {{new Date(report.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}}
                    </h4>
                  </div>
                </li>
              </ul>
              <ul>
                <li class="c2">
                  <StandUpWidget
                    imgSrc="./../../../static/people/a6.jpg"
                    userName="Jessica Smith"
                    date_Time="December 13,2018 at 8:03 PM"
                    userReport="#report
                              worked on singapp
                              created login component
                              installed vuex
                              worked on HMG"
                  ></StandUpWidget>
                  <!-- ============ COMMENTS ===========-->
                  <Comments
                    userName="Ignacio Abad"
                    commentTime="6 mins ago"
                    comment="Hey, have you heard anything about that?"
                    imgSrc="@/assets/people/a1.jpg"
                  ></Comments>
                  <div class="time">
                    <h4>today
                      <br>9:41 am
                    </h4>
                  </div>
                </li>
              </ul>
              <ul>
                <li class="c3">
                  <StandUpWidget
                    imgSrc="@/assets/people/a6.jpg"
                    userName="Jessica Smith"
                    date_Time="Today at 9:41 AM"
                    userReport="Standup
                      will work on
                      singapp ---> implement pathify
                      read more..."
                  ></StandUpWidget>                  
                  <div class="time">
                    <h4>today
                      <br>9:41 am
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
            <!-- timeline ends here -->
          </div>
        </b-col>

        <!--==================================================================== 
          * Right general report
        *=======================================================================-->
        <b-col class="p-0">
          <GenReport></GenReport>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import $ from "jquery";
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import Widget from "@/components/Widget/Widget";
import { sync, call, get } from "vuex-pathify";
import StandUpWidget from "./CheckinComponents/StandupReportWidget";
import Comments from "./CheckinComponents/Comments";
import GenReport from "./GenReport";

export default {
  name: "Checkin",
  components: { Widget, StandUpWidget, Comments, GenReport },
  computed: {
    status: sync("checkin/status"),
    reason: sync("checkin/reason"),
    reasonHighlight: sync("checkin/reasonHighlight"),
    genReport: sync("checkin/genReport"),
    genReportReason: sync("checkin/genReportReason"),
    highlightTask: sync("checkin/highlightTask"),
    highlightTaskReason: sync("checkin/highlightTaskReason"),
    reports: get("checkin/reports")
  },
  mounted() {
    this.getAllCheckinsAPI();
  },
  methods: {
    dailyCheckin: call("checkin/dailyCheckin"),
    getAllCheckins: call("checkin/getAllCheckins"),
    formSubmit: function() {
      this.dailyCheckin({
        report: this.genReport,
        task_completed: this.status,
        task_not_completed_reason: this.genReportReason,
        highlight: this.highlightTask
      });
      this.genReport = "";
      this.status = "";
      this.genReportReason = "";
      this.highlightTask = "";
    },
    getAllCheckinsAPI: function() {
      this.getAllCheckins();
    }
  }
};
</script>

<style src="./Checkin.scss" lang="scss" scoped />
