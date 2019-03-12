<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Dashboard</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Dashboard</h1>
    <b-container class="no-gutters p-0">
      <b-row>
        <b-col lg="8" xs="12">
          <div class="pb-xlg">
            <Widget class="mb-0">
              <div class="h-100">
                <div class="float-left pr-3">
                  <img
                    class="rounded-circle"
                    src="@/assets/people/a5.jpg"
                    width="75"
                    height="75"
                    alt="..."
                  >
                </div>

                <div class="pt-2">
                  <span class="fs-larger text-capitalize">
                    {{name}}
                    <span class="fw-semi-bold">Prakash</span>
                  </span>
                  <p class="fw-small">UI/UX designer</p>
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
                <div class="rounded bg-primary w-auto p-1 h-auto mr-1 mt-2">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a4.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-2 pr-1">
                    <span class="fw-bold fs-large">
                      Miha
                      <span class="fw-normal">Koshir</span>
                    </span>
                    <br>
                    <span class="fs-sm">Project manager UI/UX</span>
                  </div>
                </div>
                <!-- 2nd block -->
                <div class="rounded bg-warning w-auto p-1 h-auto mr-1">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a5.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-2 pr-1">
                    <span class="fw-bold fs-large">
                      Manish
                      <span class="fw-normal">Prakash</span>
                    </span>
                    <br>
                    <span class="fs-sm">Director</span>
                  </div>
                </div>
                <!-- 3rd block -->
                <div class="rounded bg-success w-auto p-1 h-auto">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="@/assets/people/a6.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-2 pr-1">
                    <span class="fw-bold fs-large">
                      Deepak
                      <span class="fw-normal">Mishra</span>
                    </span>
                    <br>
                    <span class="fs-sm">Project Manager Magento</span>
                  </div>
                </div>
              </div>
            </Widget>
          </div>
          <!-- second widget -->
          <h1>Key Performance Area</h1>
            <AreaComponent/>
          <!-- second widget ends-->
          <!-- third widget -->
          <h1>Extra Resource Area</h1>
            <AreaComponent/>
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
                  <span class="float-right">75%</span>
                </h6>
                <span class="text-secondary fs-sm">Daily stand-up report submitted</span>
                <b-progress
                  class="w-75"
                  style="height: 5px"
                  variant="primary"
                  :value="60"
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
                  <span class="float-right">84%</span>
                </h6>
                <span class="text-secondary fs-sm">Overall performance review</span>
                <b-progress
                  class="w-75"
                  style="height: 5px"
                  variant="danger"
                  :value="40"
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
                      src="@/assets/people/a5.jpg"
                      alt="..."
                      width="25"
                      height="25"
                    >
                  </span>
                </div>
                <div class>
                  <span class="text-primary fw-semi-bold fs-larger">Bob Nilson</span>
                  <p class="fs-sm">December 17,2018 at 01:59 PM</p>
                </div>
              </div>
              <div class="fs-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</div>
              <starRating :displayStar="5" :ratedStar="ratedStar" @starRatingSelected="submitStarRateOne" />
            </widget>
          </div>
          <widget class="h-auto">
            <div>
              <div>
                <span class="text-primary fw-semi-bold fs-larger">Jessica Smith</span>
                <p class="fw-semi fs-sm">December 17,2018 at 01:59 PM</p>
              </div>
            </div>
            <div
              class="fs-sm"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</div>
            <starRating :displayStar="5" :ratedStar="ratedStar" @starRatingSelected="submitStarRateTwo" />
          </widget>
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
import AreaComponent from "./../../components/Area/Area"
import starRating from '@/components/Star/Star'
import { get, call } from "vuex-pathify";

export default {
  name: "Profile",
  data() {
    return {
      ratedStar: 1,
      two: 1
    }
  },
  components: { Widget, AreaComponent, starRating },
  mounted() {
    // console.log(localStorage.getItem("authenticated"));
    this.get_profile();
  },
  computed: {
    name: get("profile/name")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    get_profile: function() {
      this.getProfile({
        Authorization: localStorage.getItem("authenticated")
      });
    },
    submitStarRateOne(value){
        this.ratedStar = value
    },
    submitStarRateTwo(value){
      this.two = value
    }
  }
};
</script>

<style src="./Profile.scss" lang="scss" scoped />
