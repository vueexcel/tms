<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Profile</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Dashboard</h1>
    <b-container>
      <b-row>
        <b-col lg="8" xs="12">
          <div class="pb-xlg h-100">
            <Widget class="h-100 mb-0 shadow">
              <!-- tgvhnml,;lvchjbkm -->
              <span class="thumb-md float-left mr-2">
                <img
                  class="rounded-circle"
                  src="../../assets/people/a5.jpg"
                  width="75"
                  height="75"
                  alt="..."
                >
              </span>
              <div class="float-left mt-3">
                <span class="large">
                  Adam
                  <span class="fw-semi-bold">Johns</span>
                </span>
                <p class="fw-semi">UI/UX designer</p>
              </div>
              <div class="flex"></div>

              <!-- hgvjhnl,kbjgvjnk -->
            </Widget>
          </div>
        </b-col>

        <b-col>
          <div class="h-75">
            <h4 class="mb-3">Overall <span class="font-weight-bold">Score</span></h4>
            <div>
              <div class="float-left">
                <h6 class="text-dark">Check-ins Score</h6>
                <span style="font-size: 11px;" class="text-secondary">Daily stand-up report submitted</span>
                  <b-progress class="mb-xs w-75" style="height: 5px" variant="primary" :value="60" :max="100" />
              </div>
              <div class="float-right bg-white">
                75%
              </div>
            </div>
            <div>
              <div class="float-left">
             <h6>Overall Review</h6>
             <span style="font-size: 11px;" class="text-secondary">Overall performance review</span>
            <b-progress class="mb w-75" style="height: 5px"
              variant="danger" :value="35" :max="100" />
              </div>
              <div class="float-right">
                84%
              </div>
            </div>
          </div>
          <div class="h-75">
            <h4 class="mb-3">Recent <span class="font-weight-bold">Activities</span></h4>
            <widget class="h-75 shadow">
              <div >
              <span class="thumb-md float-left">
                <img
                  class="rounded-circle"
                  src="../../assets/people/a5.jpg"
                  alt="..."
                  width="25"
                  height="25"
                >
              </span>
              <div class="float-left ml-2">
                <span style="font-size: 10px;" class="text-primary fw-semi-bold">
                  Bob Nilson
                  <span class=" text-muted">@nils</span>
                </span>
                <p class="fw-semi" style="font-size:8px;"> December 17,2018 at 01:59 PM</p>
              </div>
              </div>
              <div class="float-left" style="font-size:10px;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </widget>
          </div>
            <div class="ml-3" style="font-size:12px;">
                <span class="mr-1">1 hour</span>   
                  <span class="text-danger mr-1">Like</span>
                  <span>Comment</span>
            </div>
            <widget class="h-25 shadow">
              <div >
              <span class="thumb-md float-left">
                <img
                  class="rounded-circle"
                  src="../../assets/people/a5.jpg"
                  alt="..."
                  width="25"
                  height="25"
                >
              </span>
              <div class="float-left ml-2">
                <span style="font-size: 10px;" class="text-primary fw-semi-bold">
                  Jessica Smith
                  <span class=" text-muted">@jess</span>
                </span>
                <p class="fw-semi" style="font-size:8px;"> December 17,2018 at 01:59 PM</p>
              </div>
              </div>
              <div class="float-left" style="font-size:10px;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </widget>
            <div class="ml-3" style="font-size:12px;">
                <span class="mr-1">1 hour</span>   
                  <span class="text-danger mr-1">Like</span>
                  <span>Comment</span>
            </div>
            <div>
              <div >
              <span class="thumb-md float-left">
                <img
                  class="rounded-circle"
                  src="../../assets/people/a5.jpg"
                  alt="..."
                  width="25"
                  height="25"
                >
              </span>
              <div class="float-left ml-2">
                <span style="font-size: 10px;" class="text-primary fw-semi-bold">
                  Jessica Smith
                  <span class=" text-muted">6 mins ago</span>
                </span>
                <p class="fw-semi" style="font-size:9px;"> Hey have you heard anything about that?</p>
              </div>
              </div>
              
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

export default {
  name: "Profile",
  components: { Widget },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style src="./Profile.scss" lang="scss" scoped />
