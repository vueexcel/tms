<template>
  <!--==================================================================== 
          * Right general report
  *=======================================================================-->
  <div>
    <div v-if="error">
      <b-alert show dismissible class="alert-transparent alert-danger mt-5">{{error}}</b-alert>
    </div>
    <b-form @submit.prevent="submitReport">
      <Widget>
        <b-form-group>
          <div v-if="options.length > 1">
            <h5 class="pb-2">Missed Checkins</h5>
            <b-form-select v-model="changeSelectOption" :options="options"></b-form-select>
          </div>
        </b-form-group>
        <h5 class="pb-2">Write general report for the day</h5>
        <!-- <b-form-textarea
          id="genReport"
          v-model="genReport"
          placeholder="Report..."
          required
          :rows="3"
          :max-rows="6"
        ></b-form-textarea>-->
        <vue-editor v-model="genReport" :editorToolbar="customToolbar"></vue-editor>
        <div
          class="text-muted float-right"
        >slack formatting: *bold* | _italics_ | ~strike~ | `code` | ```preformatted```</div>
        <div class="mt-5">
          <input type="checkbox" id="checkbox-1-1" class="regular-checkbox mr-2" v-model="status">
          <label for="checkbox-1-1" class="checkbox_label">Was task not completed as per the standup</label>
        </div>
        <b-alert class="alert alert-info alert-transparent alert-sm mt-3" show>
          <span class="fw-bold">Info:</span>
          <span class="fs-sm">&nbsp;If not why? /or if something went wrong!</span>
          <a
            class="btn btn-default btn-xs float-md-right mr"
            v-if="reason"
            @click="reason = false"
          >x</a>
          <a
            class="btn btn-info btn-xs float-md-right mr-xs"
            v-if="!reason"
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

        <br>
        <div>
          <b-form-group label="Submit Checkin on #Slack Channel">
            <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
              <b-form-checkbox
                :value="channel.value"
                v-for="channel in slackChannels"
                :key="channel.value"
              >{{channel.text}}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
        <!-- <button type="submit" class="btn btn-primary btn-lg mb-xs fs-sm pl-4 pr-4 mt-3">SUBMIT</button> -->
        <primary-button 
          :type="'submit'"
          class="mb-xs fs-sm pl-4 pr-4 mt-3"
          :variant="'btn-primary'" 
          :text="'SUBMIT'" 
          :size="'btn-lg'"></primary-button>
      </Widget>
    </b-form>

    <!-- Modal for missed checkins -->
    <div>
      <!-- <b-button @click="modalShow = !modalShow">Open Modal</b-button> -->

      <b-modal no-close-on-backdrop no-close-on-esc hide-footer v-model="modalShow">
        <div class="text-center">
          <div class="fw-bold fs-larger">Checkin for Today already exist</div>
          <p>What do you want to do with existing checkin for today</p>
          <!-- <b-button variant="danger" class="width-100 mb-xs mr-xs" @click="emitDeleteCheckin">Delete</b-button> -->
           <primary-button 
            class="mb-xs mr-xs"
            :variant="'btn-danger'"
            :width="'width-100'"
            :text="'Delete'"
            @clickCall="emitDeleteCheckin($event)"></primary-button>
          <!-- <b-button variant="primary" class="width-100 mb-xs mr-xs" @click="updateCheckin">Update</b-button> -->
          <primary-button 
            class="mb-xs mr-xs"
            :variant="'btn-primary'"
            :width="'width-100'"
            :text="'Update'"
            @clickCall="updateCheckin($event)"></primary-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { sync, get } from "vuex-pathify";
import Widget from "@/components/Widget/Widget";
import primaryButton from '@/components/common/button.vue'
import { VueEditor } from "vue2-editor";

export default {
  components: { Widget, VueEditor, primaryButton },
  computed: {
    missedCheckin: get("profile/user"),
    changeSelectOption: sync("checkin/changeSelectOption"),
    status: sync("checkin/status"),
    reason: sync("checkin/reason"),
    genReport: sync("checkin/genReport"),
    genReportReason: sync("checkin/genReportReason"),
    highlightTask: sync("checkin/highlightTask"),
    reports: get("checkin/reports")
  },
  mounted() {
    this.makeOptions();
  },
  watch: {
    missedCheckin() {
      this.makeOptions();
    }
  },
  data() {
    return {
      options: [],
      modalShow: false,
      found: null,
      selected: [],
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ]
      // customToolbar: [
      //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //   ["bold", "italic", "underline", "strike"],
      //   [{ list: "ordered" }, { list: "bullet" }],
      //   [{ color: [] }, { background: [] }],
      //   ["blockquote", "code-block"],
      //   ["clean"]
      // ]
    };
  },
  props: {
    error: {
      type: String,
      default: ""
    },
    slackChannels: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    makeOptions() {
      if (this.missedCheckin && Object.keys(this.missedCheckin).length) {
        this.options = [];
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
      this.selected = [];
    },
    emitFormData() {
      this.$emit("report", {
        report: this.genReport,
        task_completed: this.status,
        task_not_completed_reason: this.genReportReason,
        highlight: this.highlightTask,
        date: this.changeSelectOption,
        slackChannels: this.selected
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

