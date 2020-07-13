<template>
  <div :class="{root: true, sidebarClose, sidebarStatic}">
    <Sidebar />
    <div class="wrap">
      <Header />
      <v-touch
        class="content"
        @swipeleft="handleSwipe"
        @swiperight="handleSwipe"
        :swipe-options="{direction: 'horizontal', threshold: 100}"
      >
        <div v-if="Object.keys(userProfile).length">
          <router-view />
        </div>
        <div v-if="!Object.keys(userProfile).length" class="text-center">
          <h1 class="text-success">Loading...</h1>
        </div>
        <footer class="contentFooter"></footer>
      </v-touch>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { get } from "vuex-pathify";

import "./Layout.scss";

export default {
  name: "Layout",
  components: { Sidebar, Header },
  methods: {
    ...mapActions("layout", [
      "switchSidebar",
      "handleSwipe",
      "changeSidebarActive"
    ])
  },
  computed: {
    ...mapState("layout", {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic
    }),
    userProfile: get("profile/user")
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem("sidebarStatic"));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
