<template>
  <div class="h-auto pb-3" lg="4" xs="12">
    <div class="pb-1 bg-white">
      <h4 class="pl-4 pt-3">Group Involved</h4>
      {{allMembers.length}}
      <hr />
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
            <!-- <b-col class="col-md-1" v-if="member.kpi_id && member.kpi_id === allMembers[index]._id"> -->
            <b-col class="col-1" v-if="member.kpi_id && member.kpi_id === allMembers[index]._id">
              <span class="position-relative">
                <img
                  class="rounded-circle"
                  :src="member.profileImage ? member.profileImage : dummyImg"
                  width="33"
                  height="33"
                  alt="..."
                />
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
              <span class="text-primary fs-larger fw-normal">{{ member.name }}</span>
              <h6>{{member.jobtitle}}</h6>
            </b-col>
          </div>
        </b-row>
      </b-container>
      <!--@@@ ADDED MEMBERS CONTAINER ENDS @@@-->
      <allEmployeeBadge
        :index="index"
        :allMembers="array_"
        :dummyImg="dummyImg"
        :searchField="searchField"
        @addRemoveMember="addRemoveMember "
      />
    </div>
  </div>
</template>

<script>
//eslint-disable-next-line
import { get, call, sync } from "vuex-pathify";
import dummyImage from "./person-dummy.jpg";
import allEmployeeBadge from "@/components/Employee/allEmployeeBadge";
export default {
  name: "Group",
  components: {
    allEmployeeBadge
  },
  data() {
    return {
      searchField: "",
      dummyImg: dummyImage,
      searchByAllEmployee: false
    };
  },
  props: {
    index: { type: Number },
    array_: { type: Array }
  },
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
    }
  }
};
</script>

<style src="./Group.scss" lang="scss" />