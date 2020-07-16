<template>
  <div>
    <h1 class="page-title">Automate Weekly</h1>
    <b-container class="p-0">
      <b-row class="d-flex justify-content-center">
        <b-col sm="12" md="8">
          <b-card class="mb-xlg border-0" :style="{ position: 'relative' }">
            <div>
              <i
                class="fa fa-exclamation-triangle fa-5x text-warning d-flex justify-content-center"
                aria-hidden="true"
              ></i>
            </div>
            <b-badge
              class="mt-lg fw-thin rounded-0"
              variant="success"
              :style="{ position: 'absolute', top: 0, left: 0 }"
            >
              <i class="fa fa-cogs text-center"></i>
            </b-badge>
            <hr />
            <p>This will only submit your week's checkin, first report of the week will be selected by default</p>
            <div>
              <span class="fw-bold">Note:</span> You won't be able to submit :-
              <ol class="text-danger">
                <li>
                  <i class="fa fa-asterisk"></i> Highlights of the work done in week
                </li>
                <li>
                  <i class="fa fa-asterisk"></i> Any extra work/ feedback/issues which you want to bring to the notice of manager
                </li>
                <li>
                  <i class="fa fa-asterisk"></i> Difficulty level of project
                </li>
              </ol>
            </div>
            <div v-if="message" class="text-danger">
              <hr />
              <b-alert
                show
                :variant="status === 200 ? 'success' : 'danger'"
                dismissible
                :class="status === 200 ? 'light' : 'text-danger'"
                class="fw-bold alert-transparent mt-3"
              >{{ message }}</b-alert>
            </div>
            <!-- <b-button
              class="border-0"
              style="width: 200px;"
              :variant="loading ? 'secondary' : 'danger'"
              :disabled="loading"
              @click="sendWeeklyReport"
            >
              <span v-if="!loading">Submit weekly anyways</span>
              <span v-if="loading">
                <i class="fa fa-circle-o-notch fa-spin"></i>
              </span>
            </b-button> -->

            <primary-button 
              class="border-0"
              style="width: 200px;"
              :variant="loading ? 'btn-secondary' : 'btn-danger'"
              :type="'button'" 
              :text="'Submit weekly anyways'"
              :isLoading="loading"
              @clickCall="sendWeeklyReport($event)"></primary-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import Widget from "@/components/Widget/Widget";
import { call } from "vuex-pathify";
import mountains from "../../assets/cards/lifestyle.jpg";
import primaryButton from '@/components/common/button.vue'


export default {
  name: "AutomateWeekly",
  data() {
    return {
      mountains,
      loading: false,
      message: "",
      status: 0
    };
  },
  mounted() {
    localStorage.removeItem("weeklyAutomate");
  },
  methods: {
    api_weeklyAutomated: call("weeklyReview/weeklyAutomated"),
    sendWeeklyReport() {
      this.loading = true;
      this.message = "";
      this.api_weeklyAutomated()
        .then(res => {
          console.log(res);
          this.message = res.data.msg;
          this.loading = false;
          this.status = res.status;
          if (res.status === 200 || res.status === 403) {
            setTimeout(
              that => {
                that.$router.push("/app/week/weeklyCheckin");
              },
              1000,
              this
            );
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  },
  components:{
    primaryButton
  }
};
</script>

<style src="./AutomateWeekly.scss" lang="scss" scoped />

