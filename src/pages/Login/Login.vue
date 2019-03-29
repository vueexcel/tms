<template>
  <div class="login-page">
    <b-container class="pt-1 pb-1 bg-white shadow-sm w-50">
      <div class="mx-auto" customHeader>
        <div class="login_container pt-4 pb-5">
          <h5 class="logo mb-5">
            <img src="./../../images/logo.png" width="100%" alt="logo">
          </h5>
          <div class="alert alert-danger alert-transparent alert-sm" v-if="loginfailed">
            <button type="button" class="close" data-dismiss="alert" @click="closeError" aria-hidden="true">×</button>
            {{loginError}}.
          </div>
          <h6 class="mt-0 mb-5 text-center font-weight-bold">Enter Your ExcellenceHR Username to Login</h6>
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
              <div class="abc-checkbox float-left">
                <input type="checkbox" id="checkbox">
                <label for="checkbox" class="text-muted fs-sm">
                  <span class="align-text-middle">Keep me signed in</span>
                </label>
              </div>
              <div class="btn-toolbar float-right">
                <b-button class="pr-4 pl-4" type="submit" size="sm" variant="inverse">Login</b-button>
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
  computed: {
    authenticated: get("login/authenticated"),
    loginfailed: sync("login/loginfailed"),
    sidebar: sync("login/sidebar"),
    loginError() {
      if(this.loginfailed){
        return 'Wrong Credentials try again'
      }
    }
  },
  methods: {
    api: call("login/login_"),
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      if (username.length !== 0 && password.length !== 0) {
        this.api({
          username: username,
          password: password
        });
      }
    },
    closeError() {
      this.loginfailed = false
    },
    
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
  },
  created() {
    // if (window.localStorage.getItem("authenticated") !== null) {
    // this.$router.push("/app/profile");
    // this.$router.push("/admin/manageKpi"); //comment this to go to Login
  }
};
// };
</script>

<style src="./Login.scss" lang="scss" scoped >
