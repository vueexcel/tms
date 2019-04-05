<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link v-show="sidebarOpened || sidebarStatic===true" to="/app">
        <img class="pl-1 pr-4" src="@/images/logo.png" width="100%" alt="logo">
      </router-link>
      <router-link v-show="!sidebarOpened || sidebarStatic===false" to="/app">
        <img class="pl-1 pr-4" src="@/images/X_logo.png" width="50px" alt="logo">
      </router-link>
    </header>
    <!-- USER -->
    <ul class="nav" v-if="!sidebar">
      <!-- <NavLink
        header="Dashboard"
        link="/app/profile"
        iconName="fas fa-clone"
        index="dashboard"
        isHeader
      />
      <NavLink
        header="Check-ins"
        link="/app/checkin"
        iconName="fas fa-clipboard"
        index="typography"
        isHeader
      />
      <NavLink
        header="Weekly Review"
        link="/app/weeklyReview"
        iconName="fas fa-file-signature"
        index="tables"
        isHeader
      />
      <NavLink
        header="Performance Review"
        link="/app/PerformanceReview"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />
      <NavLink
        header="Weekly Report Review"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />-->
      
      <!--<NavLink
        header="Admin"
        link="/app/notifications"
        iconName="fas fa-user-cog"
        index="notifications"
        isHeader
      /> -->
      
      <NavLink
        header="Manage KPI's"
        link="/admin/manageKpi"
        iconName="fas fa-inbox"
        index="dashboard"
        isHeader
      />
       <!-- link="/app/weeklyReview" -->
      <NavLink
        header="View Check-ins"
        link="/app/checkin"
        iconName="fas fa-bars"
        index="tables"
        isHeader
      />
      <!-- header="View Weekly Report" -->
      <NavLink
        header="Weekly Report Review"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />
      <NavLink
        header="Your Team"
        link="/app/team"
        iconName="fas fa-users"
        index="notifications"
        isHeader
      />
      <!-- <NavLink
        link="/app/notifications"
        iconName="fas fa-calendar-minus"
        index="notifications"
        isHeader
      /> -->
      <NavLink
        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />
    </ul>
    <!-- ADMIN -->
    <ul class="nav" v-if="sidebar">
      <NavLink
        header="Manage KPI's"
        link="/admin/manageKpi"
        iconName="fas fa-inbox"
        index="dashboard"
        isHeader
      />
      <NavLink
        header="Manage Employees"
        link="/admin/manageEmployee"
        iconName="fas fa-users"
        index="typography"
        isHeader
      />
       <!-- link="/app/weeklyReview" -->
      <NavLink
        header="View Check-ins"
        link="/app/checkin"
        iconName="fas fa-bars"
        index="tables"
        isHeader
      />
      <!-- header="View Weekly Report" -->
      <NavLink
        header="Weekly Report Review"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />
      <!-- <NavLink
        link="/app/notifications"
        iconName="fas fa-calendar-minus"
        index="notifications"
        isHeader
      /> -->
      <NavLink
        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import isScreen from "@/core/screenHelper";
import NavLink from "./NavLink/NavLink";
import { get } from "vuex-pathify";

export default {
  name: "Sidebar",
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: "Sales Report",
          value: 15,
          footer: "Calculating x-axis bias... 65%",
          color: "info"
        },
        {
          id: 1,
          title: "Personal Responsibility",
          value: 20,
          footer: "Provide required notes",
          color: "danger"
        }
      ]
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    }
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement
    }),
    sidebar: get("login/sidebar")
  }
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
