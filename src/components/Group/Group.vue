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
            <b-container class="pb-4 pt-1" v-if="team.memberList.length">
              <b-row v-for="(member, key) in team.memberList" :key="key">
                <b-col class="col-md-1">
                  <span class="position-relative">
                    <img class="rounded-circle" :src="member.image" width="33" height="33" alt="...">
                    <b-badge
                      @click="removeMember(key, index)"
                      variant="danger"
                      class="circle-2 fs-sm position-absolute badgePosSelected cursor p-0"
                    >
                      <i class="fas fa-times cursor" style="color:white; font-size:10px"></i>
                    </b-badge>
                  </span>
                </b-col>
                <b-col class="ml-4">
                  <span class="text-primary fs-larger fw-normal">{{ member.name }}</span>
                  <h6>Vp Operations</h6>
                </b-col>
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
            <span class="position-relative ml-1" v-for="(img, i) in searchFilter" :key="i">
              <img
                v-b-tooltip.hover
                :title="img.name"
                class="rounded-circle"
                :src="img.image"
                width="25"
                height="25"
                alt="..."
              >
              <b-badge @click="addMember(i, index, img.name)" :variant="img.variant" class="circle-2 position-absolute badgePos p-0">
                <i class="fa fa-plus" style="color:white; font-size:10px"></i>
              </b-badge>
            </span>
            <!-- ============================
              ======= MEMBER Image with badge (loop) ends
            ==================================-->
          </div>
        </div>
</template>

<script>
import allMembers from './allMembers.json'
import { get, call, sync } from "vuex-pathify";
export default {
  name: 'Group',
  data() {
    return {
      searchField: '',
      allMembersArray: allMembers
    }
  },
  props:{
    team: {type: Object},
    index: {type: Number},
    array_:{type: Array}
  },
  created(){
  },  
  methods:{
    addMember: function(i, index, name) {
      for (let index = 0; index < this.allMembersArray.length; index++) {
        if (this.allMembersArray[index].name == name) {
          var addMemberToList = this.allMembersArray[index];
        }
      }
      this.addNewTeam[this.$props.array_.length - 1 - index].memberList.push(
        addMemberToList
      );
      this.searchField=''
    },
    removeMember: function(key, index) {
      this.addNewTeam[this.$props.array_.length - 1 - index].memberList.splice(
        key,
        1
      );
    }
  },
  computed:{
    addNewTeam: sync("adminKPI/addNewTeam"),
    searchFilter: function() {
      return this.allMembersArray.filter(item => {
        return item.name.toLowerCase().includes(this.searchField.toLowerCase());
      });
    }
  }
}
</script>

<style>

</style>
