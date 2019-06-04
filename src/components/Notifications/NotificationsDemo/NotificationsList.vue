<template>
  <b-list-group class="thin-scroll">
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon" v-for="(recentactivity,index) in activity" :key="index">
        <span v-if="recentactivity.missed_checkin">
          <span v-for="(misschecked,index) in recentactivity.missed_checkin" :key="index">
            <div>
              You have missed your daily checkin on
              {{date}}
              {{misschecked.day}}
            </div>
          </span>
        </span>
        <span v-if="recentactivity.Daily_checkin">
          <span v-for="(dailycheckin,index) in recentactivity.Daily_checkin" :key="index">
            <div>
              You have done your daily checkin on
              {{dailycheckin.dailyday}}
            </div>
          </span>
        </span>
        <span v-if="recentactivity.report_reviewed">
          <span v-for="(reportreviewed,index) in recentactivity.report_reviewed" :key="index">
            <div>{{reportreviewed.Message}}</div>
          </span>
        </span>
        <span v-if="recentactivity.review_report">
          <span v-for="(reviewreport,index) in recentactivity.review_report" :key="index">
            <div>{{reviewreport.Message}}</div>
          </span>
        </span>
        <span v-if="recentactivity.Junior_weekly">
          <span v-for="(reviewreport,index) in recentactivity.Junior_weekly" :key="index">
            <div>{{reviewreport.Message}}</div>
          </span>
        </span>
      </span>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { get, call } from "vuex-pathify";
import dummyimage from "@/components/Group/person-dummy.jpg";
export default {
  name: "NotificationsList",
  data() {
    return {
      image: dummyimage
    };
  },
  mounted() {
    this.get_activity();
    this.get_profile();
  },
  computed: {
    user: get("profile/user"),
    activity: get("profile/activity"),
    date() {
      this.activity.forEach(activity => {
        if (activity.missed_checkin) {
          activity.missed_checkin.forEach(dates => {
            var date = this.$moment(dates.checkin_missed_message);
            if (date) {
              dates["day"] = this.$moment(date.checkin_missed_message).format(
                " MMMM DD, YYYY"
              );
            }
          });
        }
        if (activity.Daily_checkin) {
          activity.Daily_checkin.forEach(dailydate => {
            var date = this.$moment(dailydate.Daily_chechkin_message);
            if (date) {
              dailydate["dailyday"] = this.$moment(
                date.Daily_chechkin_message
              ).format(" MMMM DD, YYYY");
            }
          });
        }
      });
    }
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getActivity: call("profile/getActivity"),
    get_profile: function() {
      this.getProfile();
    },
    get_activity: function() {
      this.getActivity();
    }
  }
};
</script>

<style src="./ListGroup.scss" lang="scss" />
