<template>
  <div class="h-auto pb-3" lg="4" xs="12">
    <div class="pb-1 bg-white">
      <h4 class="pl-4 pt-3">Group Involved</h4>
      <hr>
      <!--###### CONTAINER IS FALSE ########### -->
      <b-container class="pb-3 pt-1" v-if="false">
        <b-row class="text-center">
          <b-col>
            <h6 class="text-primary fw-normal fs-larger">Add Member</h6>
            <a class="btn btn-outline-success rounded-circle btn-sm">
              <i class="fas fa-plus" style="color:green;"></i>
            </a>
          </b-col>
        </b-row>
      </b-container>
      <!--@@@ ADDED MEMBERS CONTAINER @@@-->
      <b-container class="pb-4 pt-1">
        <b-row v-for="(member, key) in array_" :key="key">
          <div v-if="member.kpi_id && member.kpi_id === allMembers[index]._id" class="d-flex">
            <b-col class="col-md-1" v-if="member.kpi_id && member.kpi_id === allMembers[index]._id">
              <span class="position-relative">
                <img
                  class="rounded-circle"
                  :src="member.profileImage ? member.profileImage : dummyImg"
                  width="33"
                  height="33"
                  alt="..."
                >
                <b-badge
                  @click="addRemoveMember(index, member, 'deleteMember')"
                  variant="danger"
                  class="circle-2 fs-sm position-absolute badgePosSelected cursor p-0"
                >
                  <i class="fas fa-times cursor" style="color:white; font-size:10px"></i>
                </b-badge>
              </span>
            </b-col>
            <b-col class="ml-4" v-if="true">
              <span class="text-primary fs-larger fw-normal">{{ member.username }}</span>
              <h6>{{member.jobtitle}}</h6>
            </b-col>
          </div>
        </b-row>
      </b-container>
      <!--@@@ ADDED MEMBERS CONTAINER ENDS @@@-->
      <div class="pl-4 pr-4 pb-1">
        <b-form-input type="search" v-model="searchField" name="search" placeholder="Search"></b-form-input>
      </div>
      <p class="text-center m-0">
        <small>ALL MEMBERS</small>
      </p>
    </div>
    <div class="p-2">
      <!-- ==============================================
              ======= MEMBER Image with badge (loop)
      ====================================================-->
      <span
        class="position-relative ml-1 d-inline-block mb-2"
        v-for="(img, i) in searchFilter"
        :key="i"
      >
        <img
          v-b-tooltip.hover
          :title="img.username"
          class="rounded-circle"
          :src="img.profileImage ? img.profileImage : dummyImg"
          width="25"
          height="25"
          alt="..."
        >
        <b-badge
          @click="addRemoveMember(index, img, 'addMember')"
          variant="primary"
          class="circle-2 position-absolute badgePos p-0 top"
        >
          <i class="fa fa-plus" style="color:white; font-size:10px"></i>
        </b-badge>
        <b-badge class="badge circle-2 position-absolute badgePos p-0 top badge-white">
          <i
            class="fa fa-check-circle text-success"
            v-if="img.kpi_id && img.kpi_id === allMembers[index]._id"
          ></i>
        </b-badge>
      </span>
      <!-- ======================================================
              ======= MEMBER Image with badge (loop) ends
      ===========================================================-->
    </div>
  </div>
</template>

<script>
import allMembers from "./allMembers.json";
import { get, call, sync } from "vuex-pathify";
import dummyImage from "./person-dummy.jpg";
export default {
  name: "Group",
  data() {
    return {
      searchField: "",
      allMembersArray: allMembers,
      dummyImg: dummyImage
    };
  },
  props: {
    index: { type: Number },
    array_: { type: Array }
  },
  created() {},
  methods: {
    addMembers_: call("adminKPI/addMember"),
    getAllMembers_: call("allMember/getAllMember"),
    addRemoveMember(index, user, type) {
      this.addMembers_({
        kpiIndex: index,
        user: user,
        type: type
      })
        .then(response => {
          if (response === true) {
            this.getAllMembers_();
          }
          this.searchField = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    addNewTeam: sync("adminKPI/addNewTeam"),
    allMembers() {
      return this.addNewTeam.slice().reverse();
    },
    searchFilter: function() {
      if (this.$props.array_) {
        return this.$props.array_.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      }
    }
  }
};
</script>

<style src="./Group.scss" lang="scss" />