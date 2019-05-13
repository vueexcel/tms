<template>
  <!--==================================================================== 
          * Right general report
  *=======================================================================-->
  <div>
    <b-form @submit.prevent="submitReport">
      <Widget>
        <b-form-group>
          <h5 class="pb-2">Missed Checkins</h5>
          <b-form-select v-model="changeSelectOption" :options="options"></b-form-select>
        </b-form-group>
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
    <!-- Modal for missed checkins -->
    <div>
      <!-- <b-button @click="modalShow = !modalShow">Open Modal</b-button> -->

      <b-modal no-close-on-backdrop no-close-on-esc hide-footer v-model="modalShow">
        <div class="text-center">
          <div class="fw-bold fs-larger">Checkin for Today already exist</div>
          <p>What do you want to do with existing checkin for today</p>
          <b-button variant="danger" class="width-100 mb-xs mr-xs" @click="emitDeleteCheckin">Delete</b-button>
          <b-button variant="primary" class="width-100 mb-xs mr-xs" @click="updateCheckin">Update</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { sync, call, get } from "vuex-pathify";
import Widget from "@/components/Widget/Widget";

export default {
  components: { Widget },
  computed: {
    missedCheckin: get("profile/user"),
    changeSelectOption: sync("checkin/changeSelectOption"),
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
    this.makeOptions();
  },
  data() {
    return {
      options: [],
      modalShow: false,
      found: null
    };
  },
  methods: {
    makeOptions() {
      if (this.missedCheckin && Object.keys(this.missedCheckin).length) {
        this.options = [
          {
            value: null,
            text: "Select your missed checkin"
          }
        ];
        if (this.missedCheckin.missed_checkin_dates) {
          this.missedCheckin.missed_checkin_dates.forEach(element => {
            this.options.push({
              value: element.date,
              text: element.date
            });
          });
        }
      }
    },
    submitReport() {
      this.found = null;
      if (this.reports.length) {
        this.found = this.reports.find(function(element) {
          return element.day === "Today";
        });
      }
      if (this.found) {
        if (this.found.day !== "Today") {
          // New Checkin for the day..
          this.emitFormData();
        } else if (this.changeSelectOption !== null) {
          // Checkin with missed date
          this.emitFormData();
        } else {
          this.modalShow = true;
        }
      } else {
        this.emitFormData();
      }
    },
    clearForm() {
      this.genReport = "";
      this.status = false;
      this.genReportReason = "";
      this.highlightTask = "";
      this.highlightTaskReason = "";
    },
    emitFormData() {
      this.$emit("report", {
        report: this.genReport,
        task_completed: this.status,
        task_not_completed_reason: this.genReportReason,
        highlight: this.highlightTask,
        highlightTaskReason: this.highlightTaskReason,
        date: this.changeSelectOption
      });
      this.clearForm();
    },
    emitDeleteCheckin() {
      this.$emit("deleteCheckin", this.found._id);
      // this.clearForm();
      this.modalShow = false;
    },
    updateCheckin() {
      this.emitFormData();
      this.modalShow = false;
    }
  }
};
</script>
<style src="./Checkin.scss" lang="scss" scoped />

