<template>
  <div>
    <h1 class="page-title">Employee</h1>
  </div>
</template>

<script>
import { get, call, sync } from "vuex-pathify";
export default {
  data() {
    return {
      user: {}
    };
  },
  async mounted() {
    if (Object.keys(this.$route.params).length) {
      this.fetchData();
    } else {
      await this.get_profile();
      await this.get_activity();
      this.user = this.userProfile;
    }
  },
  computed: {
    userToCheckByAdmin_: sync("allMember/userToCheckByAdmin")
  },
  methods: {
    getProfile: call("profile/getProfile"),
    getActivity: call("profile/getActivity"),
    get_profile: function() {
      this.getProfile();
    },
    get_activity: function() {
      this.getActivity();
    },
    fetchData() {
      this.user = this.userToCheckByAdmin_;
      console.log(this.user);
    }
  }
};
</script>

<style>
</style>
