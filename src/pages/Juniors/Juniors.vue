<template>
    <div>
    <h1 class="page-title">Your Juniors</h1>
    <Alert360 />
    <div class="text-center" v-if="loading">
      <i class="fas fa-circle-notch text-success fa-spin fa-3x"></i>
      <p>Loading...</p>
    </div>
    <div v-if="!juniorsArray.length && !error && !loading">
      <p>No data available</p>
    </div>
    <div v-if="error">
       <b-alert
        :show="error"
        dismissible
        class="mx-auto text-center mt-3 alert-danger alert-transparent"
      >{{errorMessage}}</b-alert>
    </div>
    <div v-if="juniorsArray.length">
      <!-- <div v-for="(team, index) in juniorsArray" :key="index"> -->
        <!-- <h4 class="page-title" v-if="team.teamname">{{team.teamname}}</h4> -->
        <!-- <h4 class="page-title" v-else>No Team</h4> -->
        <div>
          <b-container class="no-gutters p-0">
            <b-row>
              <b-col lg="3" xs="12" v-for="(employee, index) in juniorsArray" :key="index">
                <employeeWidget :employee="employee" :index="index" :loggedInUserRole="'manager'" />
                 <!-- @getMember="getMemberRefresh" -->
              </b-col>
            </b-row>
          </b-container>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import employeeWidget from "@/components/Employee/employeeWidget";
import Alert360 from "@/components/Alert360/alert360";
import { get, call } from "vuex-pathify";
export default {
    data() {
        return {
            juniorsArray: [],
            error: false,
            errorMessage: '',
            loading: false
        }
    },
    components: {
        employeeWidget,
        Alert360
    },
    mounted () {
        this.getAllData()
    },
    computed: {
        allJuniors_: get("allMember/allJuniors"),
    },
    methods: {
        getAllJuniors_: call("allMember/getAllJuniors"),
        async getAllData(){
            this.loading = true
            await this.getAllJuniors();
            this.loading = false
        },
        async getAllJuniors() {
            let response = await this.getAllJuniors_()
            if(response === true){
                this.juniorsArray = this.allJuniors_
            } else {
                this.error = true
                this.errorMessage = response
            }
        }
    },
}
</script>

<style src="./Juniors.scss" lang="scss" scoped />
