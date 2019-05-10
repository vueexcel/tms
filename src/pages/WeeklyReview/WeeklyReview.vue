<template>
  <div>
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
                    <b-form-select v-model="selected" v-if="user.kpi" class="mb-3">
                      <option
                        v-for="(kpi,index) in user.kpi.kpi_json"
                        :key="index"
                        v-bind:value="kpi.title"
                      >{{ kpi.title }}</option>
                    </b-form-select>
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
                    <b-card no-body class="border-0">
                      <b-tabs pills card vertical end class="border-0">
                        {{date}}
                        <span v-for="(reportdata,index) in report" :key="index">
                          <b-tab
                            :title="reportdata.day"
                            class="border-0"
                            @click="pickDay(index,reportdata)"
                          >
                            <p name="report">{{reportdata.report}}</p>
                          </b-tab>
                        </span>
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
                  <starRating
                    :displayStar="5"
                    :ratedStar="ratedStar"
                    @starRatingSelected="submitStarRate"
                  />
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
import starRating from "@/components/Star/Star";
import Widget from "@/components/Widget/Widget";
import { get, call } from "vuex-pathify";

export default {
  name: "WeeklyReview",
  components: {
    Widget,
    starRating
  },
  data() {
    return {
      ratedStar: 1,
      selected: "kpi",
      kpiKraDescription: "",
      extraWorkDescription: "",
      selectedDay: null,
      id: null
    };
  },
  mounted() {
    this.get_report();
  },
  computed: {
    user: get("profile/user"),
    report: get("weeklyReview/report"),
    date() {
      Array.prototype.forEach.call(this.report, date => {
        var time = this.$moment(date.created_at)
          .tz("GMT")
          .local()
          .format("h:mm: A");
        if (time !== "Invalid date") {
          date["time"] = this.$moment(date.created_at).format("h:mm: A");
          date["day"] = this.$moment(date.created_at).format("dddd");
        }
      });
    }
  },
  methods: {
    getReport: call("weeklyReview/getReport"),
    weeklyReview_: call("weeklyReview/weeklyReview"),
    get_report: function() {
      this.getReport();
    },
    submitWeeklyReview: function() {
      // alert('==========================')
      this.weeklyReview_({
        k_highlight: {
          kra: this.selected,
          kpi: this.kpiKraDescription
        },
        extra: this.extraWorkDescription,
        select_days: [this.id],
        difficulty: this.ratedStar
      });
    },
    submitStarRate(value) {
      this.ratedStar = value;
    },
    submit() {
      this.ratedStar = 1;
    },
    pickDay(index, reportdata) {
      this.selectedDay = reportdata.day;
      this.id = reportdata._id;
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" scoped />
