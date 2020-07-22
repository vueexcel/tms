<template>
  <b-container>
    <b-row class="wrapper">
      <b-col class="p-5">
        <h5 class="logo pb-4">
          <img src="./../../images/logo.png" height="60" width="300" alt="logo" />
        </h5>
        <span>Welcome to</span>
        <h6 class="botton_padding weight">Team Management System</h6>
        <div class="login-form">
          <form @submit.prevent="login">
            <div class="alert alert-danger alert-sm" v-if="loginfailed" data-testid="error" id="error">
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                @click="closeError"
                aria-hidden="true"
              >×</button>
              {{loginError}}.
            </div>
            <div class="form-group">
              <!-- <input
                class="form-control no-border"
                ref="username"
                id="username"
                required
                type="text"
                name="username"
                placeholder="Username"
                autofocus
              /> -->
            <common-input
              @setVal="getVal($event, 'username')"
              class="form-control no-border"
              :type="'text'"
              :name="'username'"
              :placeholder="'Username'"
              :id="'username'"
              v-model="username"
              required
              autofocus
              >
            </common-input>
            </div>
            <div class="form-group">
              <!-- <input
                class="form-control no-border"
                ref="password"
                id="password"
                required
                type="password"
                name="password"
                placeholder="Password"
              /> -->
              <common-input
              @setVal="getVal($event, 'password')"
              class="form-control no-border"
              :id="'password'"
              :type="'password'"
              :name="'password'"
              :placeholder="'Password'"
              v-model="password"
              required
              >
              </common-input>
              <!-- <button type="submit" :disabled="loader" class="w-100 btn btn-inverse btn-sm mt-4">
                <span v-if="!loader">Login</span>
                <span v-if="loader">
                  <i class="fa fa-circle-o-notch fa-spin"></i> Loading...
                </span>
              </button> -->
              <primary-button
                :type="'submit'"
                class="mt-4" 
                :text="'Login'"
                :isLoading="loader"
                :variant="'btn-inverse'"
                :width="'w-100'"
                :size="'btn-sm'"
                ></primary-button>
            </div>
          </form>
        </div>
      </b-col>

      <b-col class="pt-5 pl-4 pr-4">
        <div class="about pb-2">About Excellence TMS</div>
        <p class="about_tms">TMS is a system designed to tracker performance of employee’s. It allows seniors/managers to leave feedback for employee and also allow employees to send feedback to seniors/management</p>
        <div class="about">Features</div>
        <div>
          <ul class="featureList">
            <li>Performance management via reviews</li>
            <li>Increment’s / Peer Performance / Promotions</li>
            <li>Clear specification of job description via KPI/ERA</li>
            <li>Transparent feedback system (360 degree reviews)</li>
            <li>Peer Reviews / Anonymous Feedback</li>
            <li>Team Management</li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { get, call } from "vuex-pathify";
import primaryButton from './../../components/common/button.vue'
import commonInput from '@/components/common/input.vue'

export default {
  name: 'LoginPage',
  data () {
    return {
      loader: false,
      loginfailed: false,
      signinChecked: "",
      loginError: "",
      username: "" ,
      password: ""   }
  },
  components: {
    primaryButton,
    commonInput
  },
  computed:{
    authenticated: get("login/authenticated"),
  },
  methods: {
    loginApi: call("login/login_"),
    getProfile: call("profile/getProfile"),
    async login() {
      const username = this.username.toLowerCase();
      const password = this.password;
      if (username.length !== 0 && password.length !== 0) {
        this.loader = true;
        await this.loginApi({ username: username, password: password }).then(resp => {
          if (this.signinChecked !== "") {
            this.loader = false;
          }
          if (resp === true) {
            this.getProfile().then((response) => {
              if (resp === true) {
                this.loader = resp;
                this.loader = false;
              } else {
                this.loader = false;
              }
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
            });
          } else {            
            this.loader = false;
            this.loginfailed = true;
            this.loginError = resp.charAt(0).toUpperCase() + resp.slice(1);
          }
        }).catch((error) => {
          if (error.status === 500) {
            this.loader = false
            this.loginfailed = true
            this.loginError = 'Gettting some issue'
          }
        });
      }
    },
    closeError() {
      this.loginfailed = false;
      this.loginError = "";
    },

    getAlert () {
      alert('calling')
    },
    getVal(e, str){
      this[str] = e.target.value
    }
  }
}
</script>

<style src="./Login.scss" lang="scss" scoped />