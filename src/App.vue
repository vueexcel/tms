<template>
  <router-view/>
</template>

<script>
import { call } from "vuex-pathify";
export default {
  name: "App",
  created() {
    if (this.$route.fullPath !== "/") {
      // this.getProfile();
    }
  },
  methods: {
    getProfile: call("profile/getProfile")
  }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
