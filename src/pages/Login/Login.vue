<template>
  <div class="login-page">
    <b-container class="pt-1 pb-1 bg-white shadow-sm w-50">
      <div class="mx-auto" customHeader>
        <div class="login_container pt-4 pb-5">
          <h5 class="logo mb-5">
            <img src="./../../images/logo.png" width="100%" alt="logo">
          </h5>
          <div class="alert alert-danger alert-transparent alert-sm" v-if="loginfailed">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              @click="closeError"
              aria-hidden="true"
            >×</button>
            {{loginError}}.
          </div>
          <h6
            class="mt-0 mb-5 text-center font-weight-bold"
          >Enter Your ExcellenceHR Username to Login</h6>
          <form class="mt-4" @submit.prevent="login">
            <div class="form-group">
              <input
                class="form-control no-border"
                ref="username"
                required
                type="text"
                name="username"
                placeholder="Username"
                autofocus
              >
            </div>
            <div class="form-group">
              <input
                class="form-control no-border"
                ref="password"
                required
                type="password"
                name="password"
                placeholder="Password"
              >
            </div>
            <div class="clearfix">
              <!-- <div class="abc-checkbox float-left">
                <input type="checkbox" id="checkbox" v-model="signinChecked">
                <label for="checkbox" class="text-muted fs-sm">
                  <span class="align-text-middle">Keep me signed in</span>
                </label>
              </div> -->
              <div class="btn-toolbar float-right">
                <b-button class="pr-4 pl-4" type="submit" size="sm" variant="inverse">
                  <span v-if="!loader">Login</span>
                  <span v-if="loader">
                    <i class="fa fa-circle-o-notch fa-spin-fast"></i>
                  </span>
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { get, call, sync } from "vuex-pathify";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      loader: false,
      loginfailed: false,
      signinChecked: "",
      loginError: ""
    };
  },
  computed: {
    authenticated: get("login/authenticated"),
    sidebar: sync("login/sidebar")
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
            this.getProfile().then(response => {
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

    // login() {
    //   const username = this.$refs.username.value;
    //   const password = this.$refs.password.value;
    //   if ((username === "admin") & (password === "java@123")) {
    //     this.sidebar = true;
    //     this.$router.push("/admin/manageKpi");
    //   } else if ((username === "user") & (password === "java@123")) {
    //     this.sidebar = false;
    //     this.$router.push("/app/profile");
    //   } else {
    //     alert("please make sure you entered correct user name & password");
    //   }
    // }
  }
};
// };
</script>

<style src="./Login.scss" lang="scss" scoped >
