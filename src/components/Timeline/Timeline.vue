<template>
  <div v-if="comments.length">
    <ul class="timeline">
      <li
        :class="{onLeft : index % 2 == 0 }"
        v-for="(comment, index) in comments.slice().reverse()"
        :key="index"
      >
        <!-- <time class="eventTime" datetime="2014-05-19 03:04">
          <span class="date">yesterday</span>
          <span class="time">
            8:03
            <span class="fw-semi-bold">pm</span>
          </span>
        </time>-->
        <span class="eventIcon eventIconPrimary">
          <i class="glyphicon glyphicon-envelope"/>
        </span>
        <section class="event">
          <span class="thumb-sm avatar pull-left mr-sm">
            <img
              class="rounded-circle"
              :src="comment.user.profileImage ? comment.user.profileImage : image"
              alt="..."
            >
          </span>
          <h4 class="eventHeading">
            <a href="#">{{ comment.user.name }}</a>
          </h4>
          <p class="fs-sm text-muted">{{ comment.month }}</p>
          <p class="fs-mini">{{ comment.feedback }}</p>
          <!-- admin comments -->
          <footer class="mt-0 pt-0">
            <ul class="postComments">
              <li v-if="comment.admin_response">
                <span class="thumb-xs avatar pull-left mr-sm">
                  <img
                    class="rounded-circle"
                    :src="comment.admin_response.profileImage ? comment.admin_response.profileImage: image"
                    alt="..."
                  >
                </span>
                <div class="commentBody">
                  <h6 class="author fs-sm fw-semi-bold">
                    {{ comment.admin_response.username }}
                    <!-- <small>7 mins ago</small> -->
                  </h6>
                  <p>{{ comment.admin_response.Reply }}</p>
                </div>
              </li>
              <li>
                <span class="thumb-xs avatar pull-left mr-sm">
                  <img
                    class="rounded-circle"
                    :src="profile.profileImage !== '' ?profile.profileImage:image"
                    alt="..."
                  >
                </span>
                <div class="commentBody">
                  <b-form @submit.prevent="submit(comment, index)">
                    <b-form-input
                      v-model="postComment[index]"
                      required
                      @keyup.enter="submit"
                      size="sm"
                      placeholder="Write your comment..."
                    />
                  </b-form>
                </div>
              </li>
            </ul>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import image from "./../../assets/avatar.png";

export default {
  name: "Timeline",
  props: {
    comments: {
      type: Array,
      default: []
    },
    profile: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      image,
      postComment: []
    };
  },
  methods: {
    submit(comment, index) {
      this.$emit("postComment", {
        comment: this.postComment[index],
        user: comment
      }); //emitting to ViewFeedback.vue
      this.postComment[index] = "";
    }
  }
};
</script>

<style src="./Timeline.scss" lang="scss" scoped />
