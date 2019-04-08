<template>
  <div class="h-auto pb-3" lg="4" xs="12">
    <div class="pb-1 bg-white">
      <h4 class="pl-4 pt-3">Group Involved</h4>
      <hr>
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
          <div v-if="member.profile" class="d-flex">
            <b-col class="col-md-1" v-if="member.kpi_id && member.kpi_id === addNewTeam[index]._id">
              <span class="position-relative">
                <img
                  class="rounded-circle"
                  :src="member.profile.data.user_profile_detail.profileImage"
                  width="33"
                  height="33"
                  alt="..."
                >
                <b-badge
                  @click="removeMember(key, index, member.name)"
                  variant="danger"
                  class="circle-2 fs-sm position-absolute badgePosSelected cursor p-0"
                >
                  <i class="fas fa-times cursor" style="color:white; font-size:10px"></i>
                </b-badge>
              </span>
            </b-col>
            <b-col class="ml-4" v-if="member.kpi_id && member.kpi_id === addNewTeam[index]._id">
              <span class="text-primary fs-larger fw-normal">{{ member.username }}</span>
              <h6>{{member.profile.data.user_profile_detail.jobtitle}}</h6>
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
      <!-- ============================
              ======= MEMBER Image with badge (loop)
      ==================================-->
      <span
        class="position-relative ml-1 d-inline-block mb-2"
        v-for="(img, i) in searchFilter"
        :key="i"
      >
        <img
          v-b-tooltip.hover
          v-if="img.profile && img.profile.data.user_profile_detail.profileImage"
          :title="img.username"
          class="rounded-circle"
          :src="img.profile.data.user_profile_detail.profileImage"
          width="25"
          height="25"
          alt="..."
        >
        <div v-else>{{img.username}}</div>

        <b-badge
          @click="addMember(index, img)"
          variant="primary"
          class="circle-2 position-absolute badgePos p-0 top"
        >
          <i class="fa fa-plus" style="color:white; font-size:10px"></i>
        </b-badge>
        <b-badge class="badge circle-2 position-absolute badgePos p-0 top badge-white">
          <i
            class="fa fa-check-circle text-success"
            v-if="img.kpi_id && img.kpi_id === addNewTeam[index]._id"
          ></i>
        </b-badge>
      </span>
      <!-- ============================
              ======= MEMBER Image with badge (loop) ends
      ==================================-->
    </div>
  </div>
</template>

<script>
import allMembers from "./allMembers.json";
import { get, call, sync } from "vuex-pathify";
export default {
  name: "Group",
  data() {
    return {
      searchField: "",
      allMembersArray: allMembers
    };
  },
  props: {
    index: { type: Number },
    array_: { type: Array }
  },
  created() {},
  methods: {
    addMembers_: call("adminKPI/addMember"),
    getAllMembers_: call('allMember/getAllMember'),
    async addMember(index, user) {
      this.addMembers_({
        kpiIndex: index,
        user: user
      }).then(response => {
        if(response === true){
          this.getAllMembers_()
        }
        this.searchField = "";
      });
    },
    removeMember: function(key, index, name) {
      for (let index = 0; index < this.allMembersArray.length; index++) {
        if (this.allMembersArray[index].name == name) {
          this.allMembersArray[index]["added"] = false;
        }
      }
      this.addNewTeam[this.$props.array_.length - 1 - index].memberList.splice(
        key,
        1
      );
    }
  },
  computed: {
    addNewTeam: sync("adminKPI/addNewTeam"),
    searchFilter: function() {
      return this.array_.filter(item => {
        return item.username
          .toLowerCase()
          .includes(this.searchField.toLowerCase());
      });
      // return this.allMembersArray.filter(item => {
      //   return item.name.toLowerCase().includes(this.searchField.toLowerCase());
      // });
    }
  }
};
</script>

<style src="./Group.scss" lang="scss" />