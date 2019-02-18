<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>WeeklyReview</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">WeeklyReview</h1>
    <b-container class="bg-white no-gutters p-4" fluid>
      <b-row>
        <b-col xs="12" class="pt-4">
          <div>
            <form @submit.prevent="submitWeeklyReview" class="form-horizontal" role="form">
              <fieldset>
                <div class="form-group row">
                  <label
                    for="normal-field"
                    class="col-md-4 form-control-label text-md-left"
                  >Submit work done/ highlights of the work done in week</label>
                  <div class="col-md-8">
                    <b-form-select v-model="selected" :options="options" class="mb-3"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="hint-field" class="col-md-4 control-label text-md-left">
                    <!-- Label hint
                    <span class="help-block">Some help text</span>-->
                  </label>
                  <div class="col-md-8">
                    <b-form-textarea
                      id="textarea1"
                      v-model="kpiKraDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                    <a class="btn btn-default btn-sm mt-2 pl-4 pr-4">
                      <i class="fas fa-plus" style="color:green;"></i>&nbsp;&nbsp;
                      Add
                    </a>
                  </div>
                </div>
                <!-- add button here -->
                <hr>
                <div class="form-group row">
                  <label
                    class="col-md-4 control-label text-md-left"
                  >Any extra work/ feedback/issues which you want to bring to the notice of manager</label>
                  <div class="col-md-8">
                    <b-form-textarea
                      id="textarea1"
                      v-model="extraWorkDescription"
                      placeholder="Description.."
                      :rows="3"
                      :max-rows="6"
                    ></b-form-textarea>
                  </div>
                </div>
                <hr>
                <div class="form-group row">
                  <label
                    class="col-md-4 control-label text-md-left"
                  >Which daily check-in do you wish to highlight</label>
                  <div class="col-md-8">
                    <!-- ======= ACCORDION RIGHT =================-->
                    <b-card no-body>
                      <b-tabs pills card vertical end>
                        <b-tab title="Monday" active>
                          <p>
                            #report
                            <br>fixed the issues-
                            <br>The profile editor is missing "company"
                            <br>The profile editor should update "Enter your password" to "update your password"
                            the login screen has weird spacing betwen user and password. The login screen doesn't login when I hit "enter"
                            on my keyboard and
                            <br>
                            <br>1. debug the code for the charts (monthly sales and spend) of dashboard
                          </p>
                        </b-tab>
                        <b-tab title="Tuesday">
                          <p>#report
                            <br>1.Applied the forgot password component
                            <br>2.and saved the data localstorage.
                            <br>3.getting the new password
                            <br>4. new password for ams@hoxtonmediagroup.com id is : SY7BLP5U
                          </p>
                        </b-tab>
                        <b-tab title="Wednesday">
                          <p>#report
                            <br>sing App
                            <br>login via API implemented (axios)
                            <br>improvised check-in page
                            <br>installed POSTman
                            <br>installed mongoDB
                            <br>
                          </p>
                        </b-tab>
                        <b-tab title="Thursday">
                          <p>#report
                            <br>today's work
                            <br>1. added validation while signup a user with the same email address
                            <br>2. added redis for getting faster repoonse from the server
                            <br>3. the cache is automatically clear when cron job started
                          </p>
                        </b-tab>
                        <b-tab title="Friday">
                          <p>#report
                            <br>completed
                            <br>Start working on profile editor in "Accounts" page
                            <br>When customer clicks "edit profile", they should be able to edit all fields that they registered with EXCEPT for company name and email
                          </p>
                        </b-tab>
                        <b-tab title="Saturday">
                          <p>#report
                            <br>1. showed the data on chart from dashboard page
                            <br>2. middle align the topbar brand name
                            <br>3.shows the Brand(s) dropdown item by showing the account name or id (if account.name is not present)
                          </p>
                        </b-tab>
                      </b-tabs>
                    </b-card>
                    <!-- ======= ACCORDION RIGHT ENDS=================-->
                  </div>
                </div>
                <hr>
                <div class="form-group row">
                  <label class="col-md-4 control-label text-md-left" for="max-length">
                    Difficulty level of project
                    <br>(i.e., if project work did you did was difficult and
                    required more effort than usual)
                  </label>
                  <!-- <div class="col-md-8">
                    <i class="fas fa-star" style="font-size:20px; color:#FFDA3D;"></i>
                    <i class="fas fa-star" style="font-size:20px; color:#FFDA3D;"></i>
                    <i class="fas fa-star" style="font-size:20px; color:#FFDA3D;"></i>
                    <i class="fas fa-star-half-alt" style="font-size:20px; color:#FFDA3D;"></i>
                    <i class="fas fa-star" style="font-size:20px;"></i>
                  </div> -->
                  <starRating :Rating="Rating" @StarRating="StarRating" ref="form"/>
                </div>
              </fieldset>
              <div class="form-actions">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <button @click="submit" type="submit" class="btn btn-danger">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
// import $ from 'jquery';
/* eslint-disable */
import "imports-loader?jQuery=jquery,this=>window!flot";
import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import starRating from '@/components/Star/Star'
import Widget from "@/components/Widget/Widget";
import { call } from "vuex-pathify";

export default {
  name: "WeeklyReview",
  components: { 
    Widget,
    starRating
  },
  data() {
    return {
      Rating: 1,
      selected: "kpi",
      options: [
        { value: "kpi", text: "KPIs" }, 
        { value: "kra", text: "KRAs" },
        { value: "1", text: "item1" },
        { value: "2", text: "item2" },
        { value: "3", text: "item3" },
        { value: "4", text: "item4" },
        { value: "5", text: "item5" },
        { value: "6", text: "item6" },
      ],
      kpiKraDescription: "",
      extraWorkDescription: ""
    };
  },
  methods: {
    weeklyReview_: call("weeklyReview/weeklyReview"),
    submitWeeklyReview: function() {
      // alert('==========================')
      this.weeklyReview_({
        k_highlight: {
          kra: "",
          kpi: {}
        },
        extra: this.extraWorkDescription,
        select_days: ["id1", "id2", "id3"]
      });
    },
    StarRating(value) {
      this.Rating = value
    },
    submit() {
      this.Rating= 1
      this.$refs.form.submit()
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" scoped />
