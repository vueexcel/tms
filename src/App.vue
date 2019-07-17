<template>
  <router-view />
</template>

<script>
import { call, get } from "vuex-pathify";
export default {
  name: "App",
  created() {
    if (this.$route.fullPath !== "/") {
      // this.getProfile();
    }
  },
  mounted() {
    if (!Object.keys(this.userProfile).length && this.$route.fullPath !== "/") {
      this.getProfileData();
    }
  },
  computed: {
    userProfile: get("profile/user")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getProfileData() {
      this.getProfile({ reload: true });
    }
  }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
