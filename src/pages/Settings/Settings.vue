<template>
  <div>
    <h1>Settings</h1>
    <b-row class="justify-content-md-center">
      <b-col lg="12" md="12">
        <Widget>
          <b-form-group>
            <b-form @submit.prevent="setSlackSettings()">
              <legend>
                <strong>Slack</strong> tokens
              </legend>
              <b-form-group
                horizontal
                label="Web hook"
                label-for="normal-field-4"
                label-class="text-md-right"
                :label-cols="2"
                breakpoint="md"
              >
                <b-form-input
                  type="text"
                  id="normal-field-4"
                  v-model="slackTokens.webhook_url"
                  required
                />
              </b-form-group>
              <b-form-group
                horizontal
                label-for="normal-field"
                label-class="text-md-right"
                :label-cols="2"
                breakpoint="md"
              >
                <div slot="label">Slack token</div>
                <b-form-input
                  type="text"
                  v-model="slackTokens.slack_token"
                  id="label-hint"
                  required
                />
              </b-form-group>
              <b-form-group
                horizontal
                label-for="normal-field"
                label-class="text-md-right"
                :label-cols="2"
                breakpoint="md"
              >
                <div slot="label">Secret key</div>
                <b-form-input
                  type="text"
                  v-model="slackTokens.secret_key"
                  id="label-hint"
                  required
                />
              </b-form-group>
              <b-form-group
                horizontal
                label
                label-for="transparent-field"
                :label-cols="2"
                breakpoint="md"
              >
                <b-button variant="primary" type="submit" class="mr-xs w-28">
                  <span v-if="loadingSlackToken">
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                  </span>
                  <span v-else>Save Changes</span>
                </b-button>
              </b-form-group>
            </b-form>
          </b-form-group>
        </Widget>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col md="12">
        <Widget customHeader>
          <b-row>
            <b-col lg="12">
              <b-form @submit.prevent="setSchedularMsg()">
                <legend>
                  <strong>Reminder</strong> messages
                </legend>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field">Monthly reminder</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        class="form-control"
                        v-model="reminderMessage.monthly_remainder"
                        type="text"
                        id="normal-field"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.monthly_remainder"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-week">Weekly reminder01</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        class="form-control"
                        v-model="reminderMessage.weekly_remainder1"
                        type="text"
                        id="normal-field-week"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.weekly_remainder"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-week2">Weekly reminder02</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        class="form-control"
                        v-model="reminderMessage.weekly_remainder2"
                        type="text"
                        id="normal-field-week2"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <!-- no checkbox here -->
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-review">Review activity</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        class="form-control"
                        v-model="reminderMessage.review_activity"
                        type="text"
                        id="normal-field-review"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.review_activity"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-month">Monthly manager reminder</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        class="form-control"
                        v-model="reminderMessage.monthly_manager_reminder"
                        type="text"
                        id="normal-field-month"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.monthly_manager_reminder"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <!-- missed checkin on UI recent_activity on DB -->
                      <label for="normal-field-month">Missed checkin</label>
                    </div>
                    <div class="col-8 col-md-5 text-md-right">
                      <input
                        class="form-control"
                        v-model="reminderMessage.missed_checkin"
                        type="text"
                        id="normal-field-month"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.recent_activity"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <!-- missed checkin on UI recent_activity on DB -->
                      <label for="normal-field-month">Weekly report review message</label>
                    </div>
                    <div class="col-8 col-md-5 text-md-right">
                      <input
                        class="form-control"
                        v-model="reminderMessage.weekly_report_mesg"
                        type="text"
                        id="normal-field-month"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <!-- missed checkin on UI recent_activity on DB -->
                      <label for="normal-field-month">Monthly report review message</label>
                    </div>
                    <div class="col-8 col-md-5 text-md-right">
                      <input
                        class="form-control"
                        v-model="reminderMessage.monthly_report_mesg"
                        type="text"
                        id="normal-field-month"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <!-- missed checkin on UI recent_activity on DB -->
                      <label for="normal-field-month">Weekly missed review message</label>
                    </div>
                    <div class="col-8 col-md-5 text-md-right">
                      <input
                        class="form-control"
                        v-model="reminderMessage.missed_reviewed_mesg"
                        type="text"
                        id="normal-field-month"
                        required
                      />
                    </div>
                    <div class="col-2">
                      <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        v-model="schedularSettings.missed_reviewed"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-week">Make 360&deg; mandatory</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <!-- <input
                        class="form-control"
                        v-model="reminderMessage.weekly_remainder1"
                        type="text"
                        id="normal-field-week"
                        required
                      />-->
                      <input
                        @change="setSchedularSettings()"
                        v-model="schedularSettings.revew_360_setting"
                        class="apple-switch form-control"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-2">
                      <!-- v-model="schedularSettings.weekly_remainder" -->
                      <!-- <input
                        @change="setSchedularSettings()"
                        class="apple-switch form-control"
                        type="checkbox"
                      />-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2 text-md-right">
                      <label for="normal-field-week">Skip Weekly Review&deg; for manager</label>
                    </div>
                    <div class="col-8 col-md-5">
                      <input
                        @change="setSchedularSettings()"
                        v-model="schedularSettings.managerSkip"
                        class="apple-switch form-control"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
                <b-form-group
                  horizontal
                  label
                  label-for="transparent-field"
                  :label-cols="2"
                  breakpoint="md"
                >
                  <b-button variant="primary" type="submit" class="mr-xs ml-xs w-28">
                    <span v-if="loadingReminderMessage">
                      <i class="fa fa-circle-o-notch fa-spin"></i>
                    </span>
                    <span v-else>Save Changes</span>
                  </b-button>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { call } from "vuex-pathify";
export default {
  components: {
    Widget
  },
  created() {
    this.getSlackSettings();
    this.getSchedularSettings();
    this.getSchedularMsg();
  },
  data() {
    return {
      loadingSlackToken: false,
      loadingReminderMessage: false,
      loaderSchedularSettings: false,
      slackTokens: {
        webhook_url: "",
        slack_token: "",
        secret_key: ""
      },
      reminderMessage: {
        monthly_remainder: "",
        weekly_remainder1: "",
        weekly_remainder2: "",
        review_activity: "",
        monthly_manager_reminder: "",
        missed_checkin: "",
        weekly_report_mesg: "",
        monthly_report_mesg: "",
        missed_reviewed_mesg: ""
      },
      schedularSettings: {
        monthly_manager_reminder: false,
        monthly_remainder: false,
        recent_activity: false,
        review_activity: false,
        weekly_remainder: false,
        revew_360_setting: false,
        managerSkip: false,
        missed_reviewed: false
      }
    };
  },
  methods: {
    api_getSlackSettings: call("settings/slackSettings"),
    api_setSlackSettings: call("settings/setSlackSettings"),
    api_getSchedularSettings: call("settings/schedularSettings"),
    api_setSchedularSettings: call("settings/setSchedularSettings"),
    api_getSchedularMsg: call("settings/schedularMsg"),
    api_setSchedularMsg: call("settings/setSchedularMsg"),
    getSlackSettings() {
      this.api_getSlackSettings()
        .then(res => {
          this.slackTokens.webhook_url = res.data[0].webhook_url;
          this.slackTokens.slack_token = res.data[0].slack_token;
          this.slackTokens.secret_key = res.data[0].secret_key;
        })
        .catch(err => console.log(err));
    },
    setSlackSettings() {
      this.loadingSlackToken = true;
      this.api_setSlackSettings(this.slackTokens)
        .then(res => {
          this.loadingSlackToken = false;
        })
        .catch(err => {
          console.log(err);
          this.loadingSlackToken = false;
        });
    },
    getSchedularSettings() {
      this.api_getSchedularSettings()
        .then(res => {
          this.schedularSettings.missed_reviewed = res.data[0].missed_reviewed
          this.schedularSettings.monthly_manager_reminder =
            res.data[0].monthly_manager_reminder;
          this.schedularSettings.monthly_remainder =
            res.data[0].monthly_remainder;
          this.schedularSettings.recent_activity = res.data[0].recent_activity;
          this.schedularSettings.review_activity = res.data[0].review_activity;
          this.schedularSettings.weekly_remainder =
            res.data[0].weekly_remainder;
          this.schedularSettings.revew_360_setting =
            res.data[0].revew_360_setting;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSchedularSettings() {
      this.loaderSchedularSettings = true;
      this.api_setSchedularSettings(this.schedularSettings)
        .then(res => {
          this.loaderSchedularSettings = false;
        })
        .catch(err => {
          this.loaderSchedularSettings = false;
          console.log(err);
        });
    },
    getSchedularMsg() {
      this.api_getSchedularMsg()
        .then(res => {
          this.reminderMessage.missed_reviewed_mesg = res.data[0].missed_reviewed_mesg
          this.reminderMessage.monthly_remainder =
            res.data[0].monthly_remainder;
          this.reminderMessage.weekly_remainder1 =
            res.data[0].weekly_remainder1;
          this.reminderMessage.weekly_remainder2 =
            res.data[0].weekly_remainder2;
          this.reminderMessage.review_activity = res.data[0].review_activity;
          this.reminderMessage.monthly_manager_reminder =
            res.data[0].monthly_manager_reminder;
          this.reminderMessage.missed_checkin = res.data[0].missed_checkin;
          this.reminderMessage.weekly_report_mesg =
            res.data[0].weekly_report_mesg;
          this.reminderMessage.monthly_report_mesg =
            res.data[0].monthly_report_mesg;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSchedularMsg() {
      this.loadingReminderMessage = true;
      this.api_setSchedularMsg(this.reminderMessage)
        .then(res => {
          this.getSchedularMsg()
          this.loadingReminderMessage = false;
        })
        .catch(err => {
          console.log(err);
          this.loadingReminderMessage = false;
        });
    }
  }
};
</script>

<style src="./Settings.scss" lang="scss" />
