<template>
  <div>
    <h1 class="page-title">Dashboard</h1>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="8" xs="12">
          <div class="pb-xlg">
            <Widget class="mb-0">
              <div class="h-100">
                <div class="float-left pr-3">
                  <img
                    :src="user.profileImage ? user.profileImage : image"
                    class="rounded-circle"
                    width="75"
                    height="75"
                    alt="..."
                  >
                </div>

                <div class="pt-2">
                  <span class="fs-larger text-capitalize">
                    <span class="fw-semi-bold">{{user.name}}</span>
                  </span>
                  <p class="fw-small">{{user.jobtitle}}</p>
                </div>
              </div>
              <!--==================================================================== 
                * Dashbard blocks 
              *=======================================================================-->
              <div class="w-auto pl-5 ml-5">
                <!-- blocks -->
                <span class="mr-4 fw-semi-bold">Reviewers</span>
                <br>
                <!-- 1st block -->
                <!-- v-bind:class="{ codegreen, codeblue , codeorange }" -->
                <span v-for="(manager,index) in sortedArray" :key="index">
                  <div
                    class="rounded w-auto p-1 h-auto mr-1 mt-2"
                    v-bind:class="{success : manager.weight <= 3 ,primary:  manager.weight > 3 && manager.weight <= 6, warning:  manager.weight > 6 && manager.weight <= 10}"
                  >
                    <span class="thumb-md float-left ml-1 mt-1">
                      <img
                        class="rounded-circle"
                        :src="manager.profileImage ? manager.profileImage : image"
                        width="35"
                        height="35"
                        alt="..."
                      >
                    </span>
                    <div class="float-left text-white text-left pl-2 pr-1">
                      <span class="fw-bold fs-large">
                        {{manager.username | firstname }}
                        <span
                          class="fw-normal"
                        >{{manager.username | lastname }}</span>
                      </span>
                      <br>
                      <span class="fs-sm">{{manager.job_title}}</span>
                    </div>
                  </div>
                </span>
              </div>
            </Widget>
          </div>
          <!-- second widget -->
          <h1>Key Performance Area</h1>
          <div v-if="user.kpi">
            <AreaComponent :eraKpiArray="user.kpi.kpi_json"/>
          </div>
          <!-- second widget ends-->
          <!-- third widget -->
          <h1>Extra Resource Area</h1>
          <div v-if="user.kpi">
            <AreaComponent :eraKpiArray="user.kpi.era_json"/>
          </div>
          <!-- third widget ends-->
        </b-col>

        <!--==================================================================== 
          * Right overAll Score
        *=======================================================================-->
        <b-col class="p-0 ml-3">
          <div class="h-auto pb-3" lg="4" xs="12">
            <h2 class="mb-3">
              Overall
              <span class="fw-semi-bold">Score</span>
            </h2>
            <!-- first bar -->
            <div>
              <div>
                <h6 class="text-dark fs-larger">
                  Check-ins Score
                  <i
                    v-b-popover.hover="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit.'"
                    title="Popover Title"
                    class="fas fa-question-circle fs-sm text-danger"
                  ></i>
                  <span class="float-right">{{user.Checkin_rating}}%</span>
                </h6>
                <span class="text-secondary fs-sm">Daily stand-up report submitted</span>
                <b-progress
                  class="w-75"
                  style="height: 5px"
                  variant="primary"
                  :value="user.Checkin_rating"
                  :max="100"
                />
              </div>
            </div>
            <!-- second bar -->
            <div>
              <div>
                <h6 class="text-dark fs-larger">
                  Overall Review
                  <i
                    v-b-popover.hover="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit.'"
                    title="Popover Title"
                    class="fas fa-question-circle fs-sm text-danger"
                  ></i>
                  <span class="float-right">{{user.Overall_rating}}%</span>
                </h6>
                <span class="text-secondary fs-sm">Overall performance review</span>
                <b-progress
                  class="w-75"
                  style="height: 5px"
                  variant="danger"
                  :value="user.Overall_rating"
                  :max="100"
                />
              </div>
            </div>
            <!-- Recent Activities -->
          </div>
          <div class="h-auto mt-5">
            <h2 class="mb-3">
              Recent
              <span class="fw-semi-bold">Activities</span>
            </h2>
            <widget class="mb-3">
              <div>
                <div class="h-100">
                  <span class="thumb-md float-left mr-2 mt-1">
                    <img
                      class="rounded-circle"
                      :src="user.profileImage ? user.profileImage : image"
                      alt="..."
                      width="25"
                      height="25"
                    >
                  </span>
                </div>
                <div class>
                  <span class="text-primary fw-semi-bold fs-larger">{{user.name}}</span>
                  <span v-for="(recentactivity,index) in activity" :key="index">
                    <span v-for="(misschecked,index) in recentactivity.missed_checkin" :key="index">
                      {{time}}
                      <p class="fs-sm">{{recentactivity.dates}}</p>

                      <div class="fs-sm">{{misschecked.checkin_missed_message}}</div>
                    </span>
                  </span>
                </div>
              </div>
              <!-- <starRating :displayStar="5" :starSize="starSize" :ratedStar="ratedStar" @starRatingSelected="submitStarRateOne" /> -->
            </widget>
          </div>
          <!-- <widget class="h-auto">
            <div>
              <div >
                <span class="text-primary fw-semi-bold fs-larger">{{user.name}}</span>
                <p class="fw-semi fs-sm">December 17,2018 at 01:59 PM</p>
              </div>
            </div>
            {{activitydata}}
            <span  v-for="(recentactivity,index) in activity" :key="index">
              <span v-for="(misschecked,index) in recentactivity.missed_checkin" :key="index">
            <div class="fs-sm">{{misschecked.checkin_missed_message}}</div>
              
            </span>
            </span>
           <starRating :displayStar="5" :starSize="starSize" :ratedStar="two" @starRatingSelected="submitStarRateTwo" /> 
          </widget>-->
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
import AreaComponent from "./../../components/Area/Area";
import starRating from "@/components/Star/Star";
import { get, call } from "vuex-pathify";
import dummyimage from "@/components/Group/person-dummy.jpg";

export default {
  name: "Profile",
  data() {
    return {
      ratedStar: 1,
      two: 1,
      starSize: "17px",
      image: dummyimage
    };
  },
  components: { Widget, AreaComponent, starRating },
  mounted() {
    this.get_profile();
    this.get_activity();
  },
  computed: {
    user: get("profile/user"),
    activity: get("profile/activity"),
    time() {
      this.activity.forEach(element => {
        var time = this.$moment(element.date)
          .tz("GMT")
          .local()
          .format("h:mm: A");
        if (time !== "Invalid date") {
          element["dates"] =
            this.$moment(element.date).format("MMMM DD,YYYY") + " at " + time;
        }
      });
    },
    sortedArray() {
      let managers = this.user.managers;
      if (managers) {
        function compare(a, b) {
          if (a.weight && b.weight) {
            if (a.weight > b.weight) return -1;
            if (a.weight < b.weight) return 1;
            return 0;
          }
        }
        managers = managers.sort(compare);
        return managers;
      }
    }
  },
  filters: {
    firstname: function(value) {
      if (value.indexOf(" ") >= 0) {
        return value
          .split(" ")
          .slice(0, -1)
          .join(" ");
      } else return value;
    },
    lastname: function(value) {
      if (value.indexOf(" ") >= 0) {
        return value
          .split(" ")
          .slice(-1)
          .join(" ");
      } else return;
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
    },
    submitStarRateOne(value) {
      this.ratedStar = value;
    },
    submitStarRateTwo(value) {
      this.two = value;
    }
  }
};
</script>

<style src="./Profile.scss" lang="scss" scoped />
