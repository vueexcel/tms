<template>
  <b-list-group class="thin-scroll">
    <b-list-group-item class="listGroupItem">
      <span
        class="notificationIcon thumb-sm"
        v-for="(recentactivity,index) in activity"
        :key="index"
      >
        <img
          class="rounded-circle"
          :src="user.profileImage ? user.profileImage : image"
          alt="..."
          width="25"
          height="25"
        >

        <p class="m-0 overflow-hidden">
          <!-- 1 new user just signed up! Check out
        &nbsp;
          <a href="#">Monica Smith</a>'s account.-->
          <span v-if="recentactivity.missed_checkin">
          <span v-for="(misschecked,index) in recentactivity.missed_checkin" :key="index">
            <div>
              You have missed your daily checkin on
              {{date}}
              {{misschecked.day}}
            </div>
          </span>
          </span>
          <span v-else if="recentactivity.Daily_chechkin_message">
            <span v-for="(dailycheckin,index) in recentactivity.Daily_chechkin_message" :key="index">
            <div>
              You have missed your daily checkin on
              {{date}}
              {{misschecked.day}}
            </div>
          </span>
          </span>
        </p>
      </span>
      <!-- <time class="help-block m-0">2 mins ago</time> -->
    </b-list-group-item>
    <!-- <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-angle-double-up fa-2x"/>
      </span>
      <p class="text-ellipsis m-0">
        2.1.0-pre-alpha just released.
        <time class="help-block m-0">5h ago</time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-bolt fa-lg"/>
      </span>
      <p class="text-ellipsis m-0 overflow-hidden">
        Server load limited.
        <time class="help-block m-0">7h ago</time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <img class="rounded-circle" src="../../../assets/people/a5.jpg" alt="...">
      </span>
      <p class="m-0 overflow-hidden">
        User
        <a href="#">Jeff</a> registered
        &nbsp;&nbsp;
        <b-button size="xs" variant="success" class="mr-1">Allow</b-button>
        <b-button size="xs" variant="danger">Deny</b-button>
        <time class="help-block m-0">12:18 AM</time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-shield fa-lg"/>
      </span>
      <p class="m-0 overflow-hidden">
        Instructions for changing your Envato Account password. Please
        check your account
        <a
          href="#"
        >security page</a>.
        <time class="help-block m-0">12:18 AM</time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <span class="rounded bg-primary rounded-lg">
          <i class="fa fa-facebook text-white"/>
        </span>
      </span>
      <p class="text-ellipsis m-0">
        New
        <strong>76</strong> facebook likes received.
        <time class="help-block m-0">15 Apr 2014</time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <span class="circle circle-lg bg-gray-dark">
          <i class="fa fa-circle-o text-white"/>
        </span>
      </span>
      <p class="text-ellipsis m-0">
        Dark matter detected.
        <time class="help-block m-0">15 Apr 2014</time>
      </p>
    </b-list-group-item>-->
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
            console.log(dates);
            // console.log(dates.checkin_missed_message,'!!!!')
            // console.log(dates);
            var date = this.$moment(dates.checkin_missed_message);
            if (date) {
              // console.log(date.checkin_missed_message,'!!!!!!!!!')
              dates["day"] = this.$moment(date.checkin_missed_message).format(
                " MMMM DD, YYYY"
              );
            }
          });
        }
        else if(activity.Daily_checkin){
           activity.Daily_checkin.forEach(dates => {
            console.log(dates);
            // console.log(dates.checkin_missed_message,'!!!!')
            // console.log(dates);
            var date = this.$moment(dates.checkin_missed_message);
            if (date) {
              // console.log(date.checkin_missed_message,'!!!!!!!!!')
              dates["day"] = this.$moment(date.checkin_missed_message).format(
                " MMMM DD, YYYY"
              );
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
