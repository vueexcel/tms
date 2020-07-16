<template>
  <div>
    <h1 class="page-title">Feedback</h1>
    <Alert360 />
    <div class="text-center" v-if="fetchingData">
      <div>
        <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      </div>Loading...
    </div>
    <b-row v-if="!fetchingData">
      <b-col lg="6" xs="12">
        <Widget>
          <div class="mb-2">
            <h5>Feedback/Share Your Concerns/Suggestions</h5>
            <span
              class="wordBreak"
            >This is a section in which employee can share any concerns/feedback/problems/grievances with management. This message will be sent to management directly for notice.</span>
          </div>
          <div v-if="users.length && month == users[0].month">
            <span class="fw-semi-bold text-danger">Only one feedback per month is allowed</span>
          </div>
          <b-form
            class="mt"
            @submit.prevent="postFeedback"
            v-if="!users.length || month !== users[0].month"
          >
            <b-form-group class="mb-2">
              <Label class="sr-only" for="new-event">New event</Label>
              <b-form-textarea
                ref="feedback"
                type="textarea"
                id="new-event"
                v-model="feedback"
                placeholder="Post your feedback..."
                :rows="6"
                required
              />
            </b-form-group>
            <div>
              <b-button variant="danger" size="sm" type="submit" class="btn float-right">
                <span v-if="!loading">Post</span>
                <span v-if="loading">
                  <i class="fas fa-circle-notch text-white fa-spin"></i>
                </span>
              </b-button>
            </div>
            <div v-if="error" class="mt-3">
              <b-alert
                v-model="error"
                variant="danger"
                class="alert-transparent"
                dismissible
              >{{ errorMessage }}</b-alert>
            </div>
          </b-form>
        </Widget>
      </b-col>
      <b-col lg="6" xs="12">
        <section class="activities">
          <h2 class="ml-3">Your Previous Feedbacks</h2>
          <div v-if="!users.length">
            <p>No previous feedback found!</p>
          </div>
          <div v-if="users.length">
            <section class="event" v-for="(user, index) in users" :key="index">
              <header>
                <span class="eventAvatar">
                  <img
                    class="rounded-circle"
                    :src="user.user.profileImage? user.user.profileImage: avatar"
                    alt="..."
                  />
                </span>
                <h5 class="eventTitle">
                  <a class="text-primary">{{ user.user.name }}</a>
                </h5>
                <p class="eventTimestamp">{{ user.month }}</p>
              </header>
              <div class="eventBody">{{ user.feedback }}</div>
              <footer class="eventFooter pt-0">
                <ul class="post-comments" v-if="user.admin_response">
                  <li>
                    <span class="thumb-xs avatar pull-left mr-sm">
                      <img class="rounded-circle" :src="avatar" alt="..." />
                    </span>
                    <div class="comment-body">
                      <h6 class="author fs-sm fw-semi-bold">{{ user.admin_response.username }}</h6>
                      <p>{{ user.admin_response.Reply }}</p>
                    </div>
                  </li>
                </ul>
                <div class="text-danger" v-if="!user.admin_response">No comment from admin yet!</div>
              </footer>
            </section>
          </div>
        </section>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { call } from "vuex-pathify";
import image from "./../../assets/avatar.png";
import moment from "moment";
import Alert360 from "@/components/Alert360/alert360";
export default {
  name: "Profile",
  components: { Widget, Alert360 },
  data() {
    return {
      feedback: "",
      loading: false,
      error: false,
      errorMessage: null,
      fetchingData: false,
      users: [],
      avatar: image,
      month: ""
    };
  },
  created() {
    this.getFeedback();
    this.getMonth();
  },
  methods: {
    api_postFeedback: call("feedback/postFeedback"),
    api_getFeedback: call("feedback/getFeedback"),
    postFeedback() {
      this.loading = true;
      this.error = false;
      this.api_postFeedback({ feedback: this.feedback })
        .then(() => {
          this.loading = false;
          this.feedback = "";
          this.getFeedback();
        })
        .catch(err => {
          this.loading = false;
          this.feedback = "";
          if (err.response.data.msg) {
            this.error = true;
            this.errorMessage = err.response.data.msg;
          }
        });
    },
    getFeedback() {
      this.fetchingData = true;
      this.users = [];
      this.api_getFeedback()
        .then(res => {
          res.data.forEach(element => {
            this.users.push(element);
          });
          this.fetchingData = false;
        })
        .catch(err => {
          console.log(err);
          this.fetchingData = false;
        });
    },
    getMonth() {
      this.month = moment().format("MMMM");
    }
  }
};
</script>

<style src="./Feedback.scss" lang="scss" scoped />
