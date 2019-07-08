<template>
  <div>
    <h1 class="page-title">Peer to Peer Review</h1>
    <!-- :tooltipPlacement="tooltipPlacement" -->
    <div v-if="pageLoader" class="text-center size">
      <i class="fas fa-circle-notch text-success fa-spin"></i>
    </div>
    <Widget 
    v-if="!pageLoader"
      class="shares-widget"
      ref="sharesWidget"
      showTooltip
      title="<h6>
            <span class='badge badge-primary'><i class'fa fa-facebook' /></span> &nbsp;
            Review <span class='fw-semi-bold'></span>
          </h6>"
      customHeader
      bodyClass="p-0"
    >
      <div class="list-group list-group-lg">
        <div v-for="(kpiUser,n) in userList" :key="n">
          <div class="list-group-item" v-if="kpiUser._id !== user._id">
          <div class="row">
            <div class="col-5">
              <div class="d-flex">
                <div class="thumb-lg mr">
                <img
                  class="rounded-circle"
                  :src="kpiUser.profileImage ? kpiUser.profileImage :dummyImage "
                  alt="..."
                />
              </div>
              <div class="d-flex flex-column">
                <div class="m-0">{{kpiUser.name}}
                  <i
                    class="fa fa-eye pointer_cursor pl-2"
                    v-b-toggle="'user'+kpiUser._id"
                    aria-hidden="true"
                    @click="checkReview(kpiUser,n)"
                  ></i>
                </div>
                <div class="d-flex flex-column">
                  <small class="text-muted">{{kpiUser.job_title}}</small>
                  <div>{{kpiUser.team}}</div>
                </div>
              </div>
              </div>
              <b-collapse :id="'user'+kpiUser._id" class="mt-2 w-75">
                <b-card class="color_background">
                  <h6>{{reviewComment[n]}}</h6>
                </b-card>
              </b-collapse>
            </div>
            <div class="col-5">
                <div v-if="kpiUser.loggedInUserReview">
                  <b-card class="color_background">
                  <h6>{{kpiUser.loggedInUserReview.comment}}</h6>
                </b-card>
                </div>
              <div v-if="enableReview[n] === true">
                <h6 class="pb-2">Review</h6>
                <b-form-textarea
                v-if="!kpiUser.loggedInUserReview"
                  v-model="textReview[n]"
                  :rows="3"
                  placeholder="Review here..."
                />
              </div>
            </div>
            <div class="col-2" v-if="!kpiUser.loggedInUserReview">
              <button
                class="btn btn-primary float-right"
                v-if="enableReview[n] !== true &&  loading[n] !== true"
                @click="reviewEnable(n)"
              >
                <i class="fa fa-pencil-square-o"></i>
              </button>
              <button
                class="btn btn-success float-right"
                v-if="enableReview[n] == true &&  loading[n] !== true"
                @click="SubmitReview(n,kpiUser)"
              >Ok</button>
              <button 
              class="btn btn-success float-right"
              v-if="enableReview[n] == true && loading[n] == true"
              >
                <i class="fas fa-circle-notch text-white fa-spin"></i>
              </button>
            </div>
          </div>
        </div>  
        </div>
      </div>
    </Widget>
  </div>
</template>

<script>
import Vue from "vue";
import { sync, call, get } from "vuex-pathify";
import Widget from "@/components/Widget/Widget";
import defaultImage from "@/components/Group/person-dummy.jpg";

export default {
  data() {
    return {
      enableReview: [],
      pageLoader: false,
      dummyImage: defaultImage,
      reviewArray: [],
      textReview: [],
      reviewComment: [],
      loading:[]
    };
  },
  components: {
    Widget
  },
  created() {
    this.callApi();
  },
  computed: {
    sameKpiUserList: sync("peerreview/kpiUserList"),
    reviewList: sync("peerreview/reviewList"),
    selfReview: sync('peerreview/selfReview'),
    user: get("profile/user"),
    userList(){
      let userArray = this.sameKpiUserList
      userArray.forEach(user => {
        if (user._id  !== this.user._id) {
          let response = this.selfReview.find(review =>{
            return review.user_id === user._id
          })
          user['loggedInUserReview'] = response
        }
      });
      return userArray;
    }
  },
  methods: {
    getKpiUser_: call("peerreview/getKpiUser"),
    submitReview: call("peerreview/submitReview"),
    getReview: call("peerreview/getReview"),
    getSelfReview:call('peerreview/getSelfReview'),
    async callApi() {
      this.pageLoader = true;
      let response = await this.getKpiUser_();
      if (response) {
        let getSelfReview = await this.getSelfReview()
        let reviewResponse = await this.getReview();
        if (reviewResponse && getSelfReview) {
          this.pageLoader = false;
        }
      }
    },
    reviewEnable(index) {
      Vue.set(this.enableReview, index, true);
    },
    async SubmitReview(index, user) {
      if(this.textReview[index]){
        Vue.set(this.loading,index,true)
        let payload = {
          comment: this.textReview[index],
          user_id: user._id
        };
        let response = await this.submitReview(payload);
        if(response){
          this.getSelfReview()
      Vue.set(this.loading,index,false)
      Vue.set(this.enableReview, index, false);
        }
      }
    },
    checkReview(kpiUser, index) {
      this.review = null;
      let response = this.reviewList.find(user => {
        return user.reviewer_id === kpiUser._id;
      });
      Vue.set(
        this.reviewComment,
        index,
        response && response.comment
          ? response.comment
          : `${kpiUser.name} did not reviewed you this month.`
      );
    }
  }
};
</script>

<style src="./PeerReview.scss" lang="scss" />

