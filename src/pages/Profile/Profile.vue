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
            </Widget>
          </div>
        </b-col>

        <b-col>
          <div class="pb-xlg h-100">
            <h4 class="mb-3">Overall <span class="font-weight-bold">Score</span></h4>
            <div>
              <div class="float-left">
                <h6 class="text-dark">Check-ins Score</h6>
                <span style="font-size: 11px;">Daily stand-up report submitted</span>
                  <b-progress class="mb-xs w-75" style="height: 5px" variant="primary" :value="60" :max="100" />
              </div>
              <div class="float-right bg-white">
                75%
              </div>
            </div>
            <div>
              <div class="float-left">
             <h6>Overall Review</h6>
             <span style="font-size: 11px;">Overall performance review</span>
            <b-progress class="mb w-75" style="height: 5px"
              variant="danger" :value="35" :max="100" />
              </div>
              <div class="float-right">
                84%
              </div>
            </div>
          </div>
          <div class="border" >
            kjfhkjshk
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
