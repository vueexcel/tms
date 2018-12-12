<template>
  <div class="login-page">
    <b-container class="pt-1 pb-1 bg-white shadow w-75">
      <Widget class="mx-auto" customHeader>
        <h5 class="logo mb-5">
          <img src="./logo.png" width="100%" alt="logo">
        </h5>
        <h6 class="mt-0 mb-5 text-center font-weight-bold">Enter Your ExcellenceHR Username to Login</h6>
        <form class="mt-4" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">{{errorMessage}}</b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="username"
              required
              type="text"
              name="username"
              placeholder="Username"
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
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      errorMessage: null
    };
  },
  methods: {
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      if (username.length !== 0 && password.length !== 0) {
        window.localStorage.setItem("authenticated", true);
        this.$router.push("/app/main/analytics");
      }
    }
  },
  created() {
    if (window.localStorage.getItem("authenticated") === "true") {
      this.$router.push("/app/main/analytics");
    }
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped >
