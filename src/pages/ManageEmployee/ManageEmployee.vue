<template>
  <div>
    <h1 class="page-title">Team Members</h1>
    <div class="text-center" v-if="!teams.length && !error">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <p>Loading...</p>
    </div>
    <div v-if="error">
      <b-alert
        :show="error"
        dismissible
        class="mx-auto text-center mt-3 alert-danger alert-transparent"
      >{{errorMessage}}</b-alert>
    </div>
    <!-- <div v-if="groupByTeam.length"> -->
    <div v-for="(team, index) in teams" :key="index">
      <h4 class="page-title" v-if="team.teamname">{{team.teamname}}</h4>
      <h4 class="page-title" v-else>No Team</h4>
      <div>
        <b-container class="no-gutters p-0">
          <b-row>
            <b-col lg="3" xs="12" v-for="(employee, index) in team.teamArray" :key="index">
              <employeeWidget
                :employee="employee"
                :index="index"
                @getMember="getMemberRefresh"
                :loggedInUserRole="'admin'"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div class="p-3 d-flex justify-content-end">
      <div
        class="number"
        v-for="(i,index) in num_pages()"
        :key="index"
        :class="[i == currentPage ? 'active' : '']"
        @click="change_page(i)"
      >{{i}}</div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
// import "imports-loader?jQuery=jquery,this=>window!flot";
// import "imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie";
/* eslint-enable */
import employeeWidget from "@/components/Employee/employeeWidget";
import { get, call } from "vuex-pathify";

export default {
  name: "ManageEmployee",
  components: {
    employeeWidget
  },
  data() {
    return {
      teams: [],
      error: false,
      errorMessage: "",
      employeePerPage: 20,
      currentPage: 1
    };
  },
  async created() {
    this.getallMembers();
  },
  computed: {
    allMembers: get("allMember/allMember")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getAllMember_: call("allMember/getAllMember"),
    get_profile: async function() {
      let response = await this.getProfile();
      if (response.data.role === "Admin") {
        if (this.$route.path !== '/admin/manageKpi') return this.$router.push("/admin/manageKpi");
      } else {
        if (localStorage.getItem("weeklyAutomate")) {
          this.$router.push("/app/automateWeekly");
        } else if (localStorage.getItem('updateReview') && localStorage.getItem('updateReview') === 'true') {
          this.$router.push('/app/week/WeeklyReport')
        } else {
          if (this.$route.path !== '/app/profile') return this.$router.push("/app/profile");
        }
      }
    },
    async getallMembers() {
      let res = await this.getAllMember_();
      if (res === true) {
        if (this.allMembers && this.allMembers.length) {
          this.groupByTeam(this.getEmployeePerPage());
        }
      } else {
        this.error = true;
        this.errorMessage = res;
      }
    },
    num_pages: function() {
      return Math.ceil(this.allMembers.length / this.employeePerPage);
    },
    change_page: function(i) {
      this.currentPage = i;
      this.teams = [],
      this.getallMembers();
      window.scrollTo(0, 0);
    },
    getEmployeePerPage: function() {
      var start = (this.currentPage - 1) * this.employeePerPage;
      var end = start + this.employeePerPage;
      return this.allMembers.slice(start, end);
    },
    groupByTeam(payload) {
      var groups = {};
      this.teams = [];
      payload.forEach(element => {
        if (element.role !== "Admin") {
          var list = groups[element.team];
          if (list) {
            list.push(element);
          } else {
            groups[element.team] = [element];
          }
        }
      });
      for (var team in groups) {
        let data = {
          teamname: team,
          teamArray: groups[team]
        };
        this.teams.push(data);
      }
    },
    getMemberRefresh(value) {
      if (value === true) {
        this.getallMembers();
      }
    }
  }
};
</script>

<style src="./ManageEmployee.scss" lang="scss" scoped />
