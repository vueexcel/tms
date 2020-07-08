<template>
  <div>
    <h1 class="page-title">View Feedbacks</h1>
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <p>Loading...</p>
    </div>
    <div v-if="!comments.length && !loading">
      <b-alert dismissible show class="alert-transparent" variant="danger">No feedbacks!</b-alert>
    </div>
    <div v-if="comments.length">
      <Timeline :comments="comments" :profile="profile" @postComment="postComment" />
    </div>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";
import Timeline from "@/components/Timeline/Timeline";
export default {
  name: "viewFeedback",
  components: {
    Timeline
  },
  created() {
    this.getFeedback();
  },
  data() {
    return {
      comments: [],
      loading: false
    };
  },
  computed: {
    profile: get("profile/user")
  },
  methods: {
    api_fetchFeedbacks: call("feedback/fetchFeedback"),
    api_postFeedbacks: call("feedback/postFeedbackAdmin"),
    getFeedback() {
      this.loading = true;
      this.comments = [];
      this.api_fetchFeedbacks()
        .then(res => {
          this.loading = false;
          res.data.forEach(element => {
            this.comments.push(element);
          });
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response);
        });
    },
    postComment(val) {
      if (val.comment === undefined) {
        return;
      }
      this.api_postFeedbacks(val)
        .then(() => {
          this.getFeedback();
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
</style>
