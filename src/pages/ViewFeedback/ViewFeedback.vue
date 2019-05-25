<template>
  <div>
    <h1 class="page-title">View Feedbacks</h1>
    <div class="text-center" v-if="!comments.length">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <p>Loading...</p>
    </div>
    <div v-if="comments.length">
      <Timeline :comments="comments" :profile="profile" @postComment="postComment"/>
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
      comments: []
    };
  },
  computed: {
    profile: get("profile/user")
  },
  methods: {
    api_fetchFeedbacks: call("feedback/fetchFeedback"),
    api_postFeedbacks: call("feedback/postFeedback"),
    getFeedback() {
      this.comments = [];
      this.api_fetchFeedbacks()
        .then(res => {
          console.log(res.data);
          res.data.forEach(element => {
            this.comments.push(element);
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    postComment(val) {
      this.api_postFeedbacks(val)
        .then(res => {
          console.log(res);
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
