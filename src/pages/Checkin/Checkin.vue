<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item class="active_class">Check-ins</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Check-Ins</h1>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="6" xs="12">
          <div class="pb-xlg">
            <!-- time line starts here  -->
            <div class="timeline mr-3" v-for="(report, index) in reports" :key="index">
              <ul >
                <li class="c1">
                  <div class="content p-0">
                    <!-- <h3>What is Lorem Ispem?</h3> -->
                    <p>
                      <img
                        class="rounded-circle mr-2 mt-1 float-left"
                        src="@/assets/people/a6.jpg"
                        width="25"
                        height="25"
                        alt="..."
                      > 
                       <span>
                        <span class="text-primary fs-larger fw-semi-bold" :class="{not_completed : report.task_completed === false}" > {{ report.user }} </span>
                        <br>
                        <span :class="{not_completed : report.task_completed === false}">
                          {{time}}
                          {{report.created}}
                        </span>
                      </span>
                    </p>
                    <p :class="{not_completed : report.task_completed === false}">{{report.report}} <br/><br/> {{report.highlight}}</p>
                    <p :class="{not_completed : report.task_completed === false}">{{report.task_not_completed_reason}}</p>
                  </div>
                  <div class="time">
                    <h4>
                      {{date}}
                      {{ report.day}}
                      <br>
                      {{date}}
                      {{report.date}}
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
              </ul> -->
            </div>
            <!-- timeline ends here -->
          </div>
        </b-col>

        <!--==================================================================== 
          * Right general report
        *=======================================================================-->
        <b-col class="p-0">
          <GenReport @report="report"></GenReport>
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
  data() {
    return {
      generatedReport: []
    };
  },
  components: { Widget, StandUpWidget, Comments, GenReport },
  computed: {
    reports: get("checkin/reports"), //data from API getAllCheckins
    time(){ 
      this.reports.forEach(element => {
        var time = this.$moment(element.created_at).tz('GMT').format("hh:mm A") 
        if(time !== 'Invalid date') {
          element['created'] = this.$moment(element.created_at).format("dddd,MMMM DD YYYY") + ', at '+time
        } 
      });
    },
    date() {
      this.reports.forEach(date => {
        var time = new Date(date.created_at)
        date['day'] = this.$moment(date.created_at).format('dddd')
        date['date'] = this.$moment(date.created_at).format("MMMM DD YYYY")
      })
    }
  },
  mounted() {
    this.getAllCheckinsAPI();
  },
  methods: {
    dailyCheckin: call("checkin/dailyCheckin"),
    getAllCheckins: call("checkin/getAllCheckins"),
    getAllCheckinsAPI: function() {
      this.getAllCheckins(localStorage.getItem('authenticated'));
    },
    report(report) {
      this.dailyCheckin({
        report: report.report,
        task_completed: report.task_completed,
        task_not_completed_reason: report.task_not_completed_reason,
        highlight: report.highlight
      })
    }
  },
  filters: {
    moment: function (date) {
      return this.$moment(date).format("MMMM DD YYYY")
    }
  }
};
</script>

<style src="./Checkin.scss" lang="scss" scoped />
