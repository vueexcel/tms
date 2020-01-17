<template>
    <div class="h-100 bg-light">
        <div class="top_padding d-flex">
            <div class="left left_padding">
                <h5 class="logo pb-4">
                    <img src="./../../images/logo.png" width="65%" alt="logo" />
                </h5>
                <span>Welcome to</span>
                <h6 class="botton_padding weight">Team Management System</h6>
                <div class="w-50">
                    <form @submit.prevent="login">
                        <div class="alert alert-danger alert-sm" v-if="loginfailed">
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
                            <input
                                class="form-control no-border"
                                ref="username"
                                required
                                type="text"
                                name="username"
                                placeholder="Username"
                                autofocus
                            />
                            </div>
                            <div class="form-group">
                            <input
                                class="form-control no-border"
                                ref="password"
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <button type="submit" class="w-100 btn btn-inverse btn-sm mt-4">
                                <span v-if="!loader">Login</span>
                                <span v-if="loader">
                                    <i class="fa fa-circle-o-notch fa-spin-fast"></i>
                                </span>    
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="right">
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
            </div>
        </div>
    </div>
</template>

<script>
import { get, call } from "vuex-pathify";

export default {
  name: 'LoginPage',
  data () {
    return {
      loader: false,
      loginfailed: false,
      signinChecked: "",
      loginError: ""
    }
  },
  computed:{
      authenticated: get("login/authenticated"),
  },
  methods: {
      loginApi: call("login/login_"),
    getProfile: call("profile/getProfile"),
    login() {
      const username = this.$refs.username.value.toLowerCase();
      const password = this.$refs.password.value;
      if (username.length !== 0 && password.length !== 0) {
        this.loader = true;
        this.loginApi({ username: username, password: password }).then(resp => {
          if (this.signinChecked !== "") {
            this.loader = false;
          }
          if (resp === true) {
            this.getProfile().then(() => {
              if (resp === true) {
                this.loader = resp;
                this.loader = false;
              } else {
                this.loader = false;
              }
            });
          } else {
            this.loader = false;
            this.loginfailed = true;
            this.loginError = resp.charAt(0).toUpperCase() + resp.slice(1);
          }
        });
      }
    },
    closeError() {
      this.loginfailed = false;
      this.loginError = "";
    }
  }
}
</script>

<style src="./Login.scss" lang="scss" scoped />