<template>
  <div>
    <h1 class="page-title">Review Your Manager</h1>
    <div class="text-center" v-if="false">
      <div>
        <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      </div>Loading...
    </div>
    <b-row>
      <b-col lg="6" xs="12">
        <Widget>
          <div class="mb-2">
            <h5>Use this section to write review for your manager/seniors</h5>
          </div>
          <div v-if="errormsg" class="text-danger fw-bold">{{errormsg}}</div>
          <div v-if="!errormsg">
            <div class="pb-5">
              <span
                class="fw-semi-bold text-danger"
              >Only one review per manager per month is allowed</span>
            </div>Select Manager:
            <b-form-select v-model="selected" class="mb-3">
              <option
                v-for="(manager, index) in managers"
                :key="index"
                :value="manager.id"
              >{{manager.username }}</option>
            </b-form-select>
            <starRating
              class="border-bottom"
              :starSize="windowWidth < 435 ? '17px' : '28px'"
              :ratedStar="ratedStar"
              :displayStar="10"
              @starRatingSelected="submitStars"
            />
            <!-- :starSize="'25px'" -->
            <!-- :disableStar="activeReport.canReview === false ? true : false" -->

            <b-form-group class="abc-checkbox abc-checkbox-success abc-checkbox-circle mt-3">
              <common-input
                :id="'checkbox-circle'"
                :type="'checkbox'"
                @setVal="getVal($event, 'password')"
                v-model="anon"
                :checked="anon"
                >
              </common-input>
              <!-- <input type="checkbox" :checked="anon" v-model="anon" id="checkbox-circle" /> -->
              <label for="checkbox-circle">Anonymous</label>
              <!-- <p
              class="pl-3 fs-sm text-muted"
              >* although manager can not see your identity, but your ID will be saved to the DB in order to prevent system abuse</p>-->
            </b-form-group>
            <b-form class="mt" @submit.prevent="postFeedback">
              <b-form-group class="mb-2">
                <!-- <Label class="sr-only" for="new-event">New event</Label> -->
                <b-form-textarea
                  type="textarea"
                  id="new-event"
                  v-model="feedback"
                  placeholder="Post your review about your manager..."
                  :rows="6"
                  required
                />
              </b-form-group>
              <div class="btn-toolbar">
                <!-- <b-button variant="danger" size="sm" type="submit" class="btn ml-auto">
                  <span v-if="!loading">Post</span>
                  <span v-if="loading">
                    <i class="fas fa-circle-notch text-white fa-spin"></i>
                  </span>
                </b-button> -->
                <primary-button
                  class="ml-auto"
                  :type="'submit'" 
                  :text="'Post'"
                  :variant="'btn-danger'"
                  :size="'btn-sm'"
                  :isLoading="loading"
                  ></primary-button>
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
          </div>
        </Widget>
      </b-col>
      <b-col lg="6" xs="12">
        <section class="activities">
          <h2 class="ml-3">Your Previous Reviews</h2>
          <div v-if="!previousPost.length">
            <p>No previous review found!</p>
          </div>
          <div v-if="previousPost.length">
            <section class="event" v-for="(user, index) in previousPost" :key="index">
              <header>
                <span class="eventAvatar" v-if="user.profileImage">
                  <img
                    class="rounded-circle"
                    :src="user.profileImage? user.profileImage: avatar"
                    alt="..."
                  />
                </span>
                <span class="eventAvatar" v-else>
                  <img class="rounded-circle" :src="anonymousImage" alt="..." />
                </span>
                <!-- {{ user }} -->
                <h5 class="eventTitle">
                  <a class="text-primary">{{ user.username ? user.username: '#anonymos' }}</a>
                </h5>
                <p class="eventTimestamp">{{ user.month }}</p>
              </header>
              <header>
                <h5 class="eventTitle">
                  <span class="fs-sm">Manager: &nbsp;</span>
                  <span class="fs-sm text-primary">{{ user.manager }}</span>
                </h5>
              </header>
              <div class="pb-3">
                Your Comment:
                <span>{{ user.comment }}</span>
              </div>
              <div class="pb-0">Rating:</div>
              <starRating
                class
                :ratedStar="user.rating"
                :displayStar="10"
                :starSize="windowWidth < 435 ? '17px' : '20px'"
              />
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
import anon from "./../../assets/people/anon.svg";
import starRating from "@/components/Star/Star";
import primaryButton from '@/components/common/button.vue'
import moment from "moment";
import commonInput from '@/components/common/input.vue';

export default {
  name: "Profile",
  components: { Widget, starRating, primaryButton,commonInput },
  data() {
    return {
      anonymousImage: anon,
      feedback: "",
      loading: false,
      error: false,
      errorMessage: null,
      fetchingData: false,
      users: [],
      avatar: image,
      month: "",
      selected: null,
      managers: [],
      anon: false,
      ratedStar: 0,
      previousPost: [],
      errormsg: "",
      windowWidth: 0
    };
  },
  created() {
    this.getFeedback();
    // this.api_getmanagers();
    this.getPost();
    this.errormsg = "";
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      //Init
      this.getWindowWidth();
    });
  },
  methods: {
    api_postFeedback: call("review360/submitPost"),
    api_getmanagers: call("review360/getmanagers"),
    api_getPost: call("review360/getPost"),
    api_360reviewStatus: call("profile/getManagerReviewStatus"),
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },
    async postFeedback() {
      if (this.selected && this.ratedStar !== 0) {
        this.loading = true;
        this.error = false;
        // find manager ID
        var userName = "";
        userName = await this.managers.find(element => {
          if (element.id === this.selected) {
            return element;
          }
        });
        this.api_postFeedback({
          manager: userName.username,
          managerProfileImage: userName.profileImage,
          managerID: this.selected,
          rating: this.ratedStar,
          comment: this.feedback,
          anon: this.anon
        })
          .then(res => {
            this.loading = false;
            this.feedback = "";
            this.ratedStar = 0;
            this.anon = false;
            if (res.status !== 204) {
              this.api_360reviewStatus();
              this.getPost();
              this.getFeedback();
            } else {
              alert(
                "you have already submitted review against this manager for this month, please try again next month"
              );
            }
            this.selected = null;
          })
          .catch(err => {
            this.loading = false;
            this.feedback = "";
            this.selected = null;
            if (err.response.data.msg) {
              this.error = true;
              this.errorMessage = err.response.data.msg;
            }
          });
      } else {
        alert("stars rating & manager name are mandatory");
      }
    },
    submitStars(value) {
      this.ratedStar = value;
    },
    getFeedback() {
      //   this.fetchingData = true;
      //   this.users = [];
      this.errormsg = "";
      this.managers = [];
      this.managers.push({
        username: "Please select manager",
        value: null,
        id: null
      });
      this.api_getmanagers()
        .then(res => {
          if (res.status === 204) {
            throw `currently you don't have any manager assigned`;
          } else {
            res.data.forEach(element => {
              this.managers.push({
                username:
                  element.username.charAt(0).toUpperCase() +
                  element.username.slice(1),
                profileImage: element.profileImage,
                id: element._id
              });
            });
          }
        })
        .catch(err => {
          this.errormsg = err;
          // this.fetchingData = false;
        });
    },
    getPost() {
      this.previousPost = [];
      this.api_getPost()
        .then(res => {
          res.data.forEach(element => {
            this.previousPost.push(element);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMonth() {
      this.month = moment().format("MMMM");
    },
    getVal(e){
      this.anon = e.target.value
    }
  }
};
</script>

<style src="./../Feedback/Feedback.scss" lang="scss" scoped />
