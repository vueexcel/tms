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
                        <span class="text-primary fs-larger fw-semi-bold">Jessica Smith</span>
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
                        <span class="text-primary fs-larger fw-semi-bold">Jessica Smith</span>
                        <br>
                        <span>December 13,2018 at 8:03 PM</span>
                      </span>
                    </p>
                    <p>#report
                      <br>worked on singapp
                      <br>created login component
                      <br>installed vuex
                      <br>worked on HMG
                    </p>
                  </div>
                  <!-- ============ COMMENT ===========-->
                  <div>
                    <ul class="comments border-top">
                      <li class="pl-3 pt-2 pb-2 pr-0">
                        <img
                          class="rounded-circle mr-2 mt-1 float-left"
                          src="@/assets/people/a1.jpg"
                          width="30"
                          height="30"
                          alt="..."
                        >
                        <span>
                          <span class="text-primary fs-larger fw-semi-bold">Ignacio Abad</span>
                          <span>6 mins ago</span>
                          <br>
                          <span>Hey, have you heard anything about that?</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="time">
                    <h4>today
                      <br>9:41 am
                    </h4>
                  </div>
                </li>
              </ul>
              <ul>
                <li class="c3">
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
                        <span class="text-primary fs-larger fw-semi-bold">Jessica Smith</span>
                        <br>
                        <span>Today at 9:41 AM</span>
                      </span>
                    </p>
                    <p>Standup
                      <br>will work on
                      <br>singapp ---> implement pathify
                      <br>read more...
                    </p>
                  </div>
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
          <div>
            <b-form @submit.prevent="formSubmit">
              <Widget>
                <h5 class="pb-2">Write general report for the day</h5>
                <b-form-textarea
                  id="genReport"
                  v-model="genReport"
                  placeholder="Report..."
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <b-form-checkbox
                  class="pt-3"
                  id="checkbox1"
                  v-model="status"
                >Was task completed as per the standup</b-form-checkbox>
                <b-alert class="alert alert-info alert-transparent alert-sm mt-3" show dismissible>
                  <span class="fw-bold">Info:</span>
                  <span class="fs-sm">&nbsp;If not why? /or if something went wrong!</span>
                  <a class="btn btn-default btn-xs float-md-right mr" @click="reason = false">Ignore</a>
                  <a
                    class="btn btn-info btn-xs float-md-right mr-xs"
                    @click="reason = true"
                  >Give Reason</a>
                </b-alert>
                <b-form-textarea
                  v-show="reason"
                  class="alert-info alert-transparent"
                  id="genReportReason"
                  v-model="genReportReason"
                  placeholder="Give reason, why was standup not completed..."
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <hr>
                <h6 class="mb-3">
                  Any specific task/ thing which you want to
                  highlight towards your KPI/KRA
                </h6>
                <b-form-textarea
                  id="highlightTask"
                  v-model="highlightTask"
                  placeholder="Highlight task..."
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <b-alert
                  class="alert alert-warning alert-transparent alert-sm mt-3"
                  show
                  dismissible
                >
                  <span class="fw-bold">Info:</span>
                  <span class="fs-sm">
                    Want to mention anything specific
                    which went wrong/ not correct which you like to improve
                    in future?
                  </span>
                  <a
                    class="btn btn-default btn-xs float-md-right mr"
                    @click="reasonHighlight = false"
                  >Ignore</a>
                  <a
                    class="btn btn-info btn-xs float-md-right mr-xs"
                    @click="reasonHighlight = true"
                  >Give Reason</a>
                </b-alert>
                <b-form-textarea
                  v-show="reasonHighlight"
                  class="alert alert-warning alert-transparent alert-sm"
                  id="highlightTaskReason"
                  v-model="highlightTaskReason"
                  placeholder="Write anything specific which went wrong/ not correct which you like to improve in future?"
                  :rows="3"
                  :max-rows="6"
                ></b-form-textarea>
                <button type="submit" class="btn btn-primary btn-lg mb-xs fs-sm pl-4 pr-4">SUBMIT</button>
              </Widget>
            </b-form>
          </div>
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

export default {
  name: "Checkin",
  components: { Widget },
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
