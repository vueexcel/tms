<template>
  <!--==================================================================== 
          * Right general report
  *=======================================================================-->
  <div>
    <b-form @submit.prevent="submitReport">
      <Widget>
        <h5 class="pb-2">Write general report for the day</h5>
        <b-form-textarea
          id="genReport"
          v-model="genReport"
          placeholder="Report..."
          required
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>
        <div class="mt-3">
          <input type="checkbox" id="checkbox-1-1" class="regular-checkbox mr-2" v-model="status">
          <label class="checkbox_label">Was task completed as per the standup</label>
        </div>
        <!-- <b-form-checkbox
          class="pt-3"
          id="checkbox1"
          v-model="status"
        ></b-form-checkbox>-->
        <b-alert class="alert alert-info alert-transparent alert-sm mt-3" show dismissible>
          <span class="fw-bold">Info:</span>
          <span class="fs-sm">&nbsp;If not why? /or if something went wrong!</span>
          <a class="btn btn-default btn-xs float-md-right mr" @click="reason = false">Ignore</a>
          <a class="btn btn-info btn-xs float-md-right mr-xs" @click="reason = true">Give Reason</a>
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
        <b-alert class="alert alert-warning alert-transparent alert-sm mt-3" show dismissible>
          <span class="fw-bold">Info:</span>
          <span class="fs-sm">
            Want to mention anything specific
            which went wrong/ not correct which you like to improve
            in future?
          </span>
          <!-- <a
            class="btn btn-default btn-xs float-md-right mr"
            @click="reasonHighlight = false"
          >Ignore</a>-->
          <a
            class="btn btn-info btn-xs float-md-right mr-xs mt-1"
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
</template>

<script>
import { sync, call, get } from "vuex-pathify";
import Widget from "@/components/Widget/Widget";

export default {
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
    console.log(this.reports[this.reports.length - 1]);
  },
  methods: {
    submitReport() {
      if (this.reports[this.reports.length - 1].day !== "Today") {
        console.log(this.reports[this.reports.length - 1].day);
        this.$emit("report", {
          report: this.genReport,
          task_completed: this.status,
          task_not_completed_reason: this.genReportReason,
          highlight: this.highlightTask,
          highlightTaskReason: this.highlightTaskReason
        });
      } else {
        alert(`today's report already exists`);
      }
      this.genReport = "";
      this.status = false;
      this.genReportReason = "";
      this.highlightTask = "";
      this.highlightTaskReason = "";
    }
  }
};
</script>
<style src="./Checkin.scss" lang="scss" scoped />

