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
          <div class="pb-xlg h-100 border">
            <h1>helllo</h1>
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
