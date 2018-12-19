<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Profile</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title ml-2 pl-4">Dashboard</h1>
    <b-container>
      <b-row>
        <b-col lg="8" xs="12">
          <div class="pb-xlg">
            <Widget class="mb-0 shadow">
              <div class="h-100">
                <div class="float-left pr-3">
                  <img
                    class="rounded-circle"
                    src="../../assets/people/a5.jpg"
                    width="75"
                    height="75"
                    alt="..."
                  >
                </div>

                <div class="pt-2">
                  <span class="large">
                    Adam
                    <span class="fw-semi-bold">Johns</span>
                  </span>
                  <p class="fw-small">UI/UX designer</p>
                </div>
              </div>

              <div class="w-auto pl-5 ml-5">
                <!-- blocks -->
                <span class="mr-4">Reviewers</span>
                <a href>7 reviews</a>
                <br>
                <!-- 1st block -->
                <div class="rounded bg-primary w-auto p-1 h-auto mr-1">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="../../assets/people/a4.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-1">
                    <span class="fw-bold">
                      Miha
                      <span class="fw-normal">Koshir</span>
                    </span>
                    <h6>UI/UX designer</h6>
                  </div>
                </div>
                <!-- 2nd block -->
                <div class="rounded bg-warning w-auto p-1 h-auto mr-1">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="../../assets/people/a5.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-1">
                    <span class="fw-bold">
                      Manish
                      <span class="fw-normal">Prakash</span>
                    </span>
                    <h6>Director</h6>
                  </div>
                </div>
                <!-- 3rd block -->
                <div class="rounded bg-success w-auto p-1 h-auto">
                  <span class="thumb-md float-left ml-1 mt-1">
                    <img
                      class="rounded-circle"
                      src="../../assets/people/a6.jpg"
                      width="35"
                      height="35"
                      alt="..."
                    >
                  </span>
                  <div class="float-left text-white text-left pl-1">
                    <span class="fw-bold">
                      Deepak
                      <span class="fw-normal">Mishra</span>
                    </span>
                    <h6>Project Manager Magento</h6>
                  </div>
                </div>
              </div>
            </Widget>
          </div>
          <!-- second widget -->
          <h1>Key Performance Area</h1>
          <Widget
            title="<h4 class='text-success'>First Human Colony on mars</h4>"
            customHeader
            close
            collapse
            refresh
            class="mb-0 border-bottom"
          >
            <div class="w-75">
              First 700 people will take part in building first human settlement
              outside of earth. Thats awesome right?
            </div>
            <p class="pt-3">Mar 20, 18:46</p>
          </Widget>
          <Widget
            title="<h4 class='text-success'>Light Blue reached $300</h4>"
            customHeader
            class="mb-0 border-bottom"
          >
            <div class="w-75">
              Light Blue Inc. shares just hit $300 price.
              "This was inevitable it should have happen sooner or later"
              -says NYSE expert
            </div>
            <p class="pt-3">Sep 25, 11:59</p>
          </Widget>
          <Widget title="<h4 class='text-success'>No More Spying</h4>" customHeader>
            <div class="w-75">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Libero perspiciatis ipsa provident quas natus?
            </div>
            <p class="pt-3">Mar 20, 18:46</p>
          </Widget>
          <!-- second widget ends-->
          <!-- third widget -->
          <h1>Extra Resource Area</h1>
          <Widget
            title="<h4 class='text-success'>First Human Colony on mars</h4>"
            customHeader
            close
            collapse
            refresh
            class="mb-0 border-bottom"
          >
            <div class="w-75">
              First 700 people will take part in building first human settlement
              outside of earth. Thats awesome right?
            </div>
            <p class="pt-3">Mar 20, 18:46</p>
          </Widget>
          <Widget
            title="<h4 class='text-success'>Light Blue reached $300</h4>"
            customHeader
            class="mb-0 border-bottom"
          >
            <div class="w-75">
              Light Blue Inc. shares just hit $300 price.
              "This was inevitable it should have happen sooner or later"
              -says NYSE expert
            </div>
            <p class="pt-3">Sep 25, 11:59</p>
          </Widget>
          <Widget title="<h4 class='text-success'>No More Spying</h4>" customHeader>
            <div class="w-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Sequi voluptatum maxime totam molestias excepturi?
            </div>
            <p class="pt-3">Mar 20, 18:46</p>
          </Widget>
          <!-- third widget ends-->
        </b-col>
        <!-- right -->
        <b-col>
          <div class="h-auto pb-3">
            <h4 class="mb-3">
              Overall
              <span class="font-weight-bold">Score</span>
            </h4>
            <!-- first bar -->
            <div>
              <div>
                <h6 class="text-dark">
                  Check-ins Score
                  <span class="float-right">75%</span>
                </h6>
                <span
                  style="font-size: 11px;"
                  class="text-secondary"
                >Daily stand-up report submitted</span>
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
                <h6 class="text-dark">
                  Overall Review
                  <span class="float-right">84%</span>
                </h6>
                <span style="font-size: 11px;" class="text-secondary">Overall performance review</span>
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
          <div class="h-auto">
            <h4 class="mb-3">
              Recent
              <span class="font-weight-bold">Activities</span>
            </h4>
            <widget>
              <div>
                <div class="h-100">
                  <span class="thumb-md float-left">
                    <img
                      class="rounded-circle"
                      src="../../assets/people/a5.jpg"
                      alt="..."
                      width="25"
                      height="25"
                    >
                  </span>
                </div>
                <div class="ml-2">
                  <span style="font-size: 10px;" class="text-primary fw-semi-bold">
                    Bob Nilson
                    <span class="text-muted">@nils</span>
                  </span>
                  <p class="fw-semi" style="font-size:8px;">December 17,2018 at 01:59 PM</p>
                </div>
              </div>
              <div
                style="font-size:10px;"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              <br>
              <div class="h-auto" style="font-size:12px;">
                <span class="mr-2">1 hour</span>
                <i class="fas fa-circle mr-2" style="font-size: 0.4rem;"></i>
                <a href class="text-danger">
                  <i class="fas fa-heart"></i>
                  Like
                </a>
                <i class="fas fa-circle ml-2 mr-2" style="font-size: 0.4rem;"></i>
                <a href class="text-black">Comment</a>
              </div>
            </widget>
          </div>
          <widget class="h-25 shadow">
            <div>
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
                  <span class="text-muted">@jess</span>
                </span>
                <p class="fw-semi" style="font-size:8px;">December 17,2018 at 01:59 PM</p>
              </div>
            </div>
            <div
              class="float-left"
              style="font-size:10px;"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </widget>
          <div class="ml-3" style="font-size:12px;">
            <span class="mr-1">1 hour</span>
            <span class="text-danger mr-1">Like</span>
            <span>Comment</span>
          </div>
          <div>
            <div>
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
                  <span class="text-muted">6 mins ago</span>
                </span>
                <p class="fw-semi" style="font-size:9px;">Hey have you heard anything about that?</p>
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
