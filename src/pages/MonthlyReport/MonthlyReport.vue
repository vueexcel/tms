<template>
  <div>
    <h1 class="page-title">WeeklyCheckin</h1>
    <b-container class="bg-white no-gutters p-4" fluid>
      <b-row>
        <b-col xs="12" class="pt-4">
          <div>
            <div v-if="false">
              <b-alert class="alert-transparent alert-danger" show>
                <span>No checkin's found from previous month to submit monthly report</span>
              </b-alert>
            </div>
            <form class="form-horizontal">
              <fieldset>
                
                <!-- add button here -->
                <div class="form-group row">
                  <label
                    class="col-md-6 control-label text-md-left"
                  >Any extra work/ feedback/issues which you want to bring to the notice of manager</label>
                  <div class="col-md-6">
                    <b-form-textarea
                      id="textarea1"
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
                  <div class="col-md-8" v-if="false">
                    <!-- ======= ACCORDION RIGHT =================-->
                    <b-card no-body class="border-0">
                      <b-tabs pills card vertical end class="border-0">
                        <!-- {{date}} -->
                        <b-tab
                          v-for="(reportdata,index) in report"
                          :key="index"
                          :title="reportdata.day"
                          class="border-0 white-space-pre pl-3 pr-3 pb-3 pt-0"
                          @click="pickDay(index,reportdata)"
                        >
                          <!-- {{reportdata.report}} -->
                          <!-- <b-card-text></b-card-text> -->
                        </b-tab>
                      </b-tabs>
                    </b-card>

                    <!-- ======= ACCORDION RIGHT ENDS=================-->
                  </div>
                </div>
                <hr>
                <div class="form-group row" v-if="false">
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
                    <button type="button" class="btn btn-success">Submit</button>
                  </div>
                  <div class="col-md-4 col-12">
                    <button type="button" class="btn btn-danger">Delete</button>
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
export default {
  name: "monthlyReport"
};
</script>

<style>
</style>
