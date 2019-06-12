<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link v-show="sidebarOpened || sidebarStatic===true" to>
        <img class="pl-1 pr-4" src="@/images/logo.png" width="100%" alt="logo">
      </router-link>
      <!-- to="/app" -->
      <router-link v-show="!sidebarOpened || sidebarStatic===false" to>
        <img class="pl-1 pr-4" src="@/images/X_logo.png" width="50px" alt="logo">
      </router-link>
    </header>
    <!-- ADMIN -->
    <ul class="nav" v-if="sideBar.role === 'Admin'">
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
      <NavLink
        header="Weekly Report"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-bar"
        index="performanceReview"
        :badge="count"
        isHeader
      />
      <!-- <NavLink
        header="Monthly Report Review"
        link="/app/monthlyReportReview"
        iconName="fas fa-calendar"
        isHeader
      />-->
      <!-- index="notifications" -->
      <NavLink
        header="View Junior's Checkin"
        link="/app/viewCheckin"
        iconName="fas fa-folder-open"
        index="performanceReview"
        isHeader
      />
      <NavLink header="Your Juniors" link="/app/juniors" iconName="fas fa-users" isHeader/>

      <NavLink
        header="Juniors Weekly Report"
        link="/app/juniorWeekReport"
        iconName="fa fa-flag-checkered"
        index="feedback"
        isHeader
      />
      <!-- index="performanceReview" -->
      <NavLink
        header="View Feedback"
        link="/app/viewfeedback"
        iconName="fas fa-comments"
        :badge="JSON.stringify(feedbackCount)"
        isHeader
      />
      <NavLink
        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />
      <NavLink
        header="ViewReview360"
        link="/app/viewreview360"
        iconName="fas fa-recycle"
        index="review360"
        isHeader
      />
      <!-- link="/app/weeklyReview" -->
      <!-- <NavLink
        header="View Check-ins"
        link="/app/checkin"
        iconName="fas fa-bars"
        index="tables"
        isHeader
      />-->
      <!-- header="View Weekly Report" -->
      <!-- <NavLink
        header="Weekly Report Review"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />-->
      <!-- <NavLink
        link="/app/notifications"
        iconName="fas fa-calendar-minus"
        index="notifications"
        isHeader
      />-->
      <!-- <NavLink
        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />-->
    </ul>
    <!-- USER -->
    <!-- <ul class="nav" v-if="!sidebar"> -->
    <ul class="nav" v-else>
      <NavLink
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
        header="Weekly Checkin"
        link="/app/weeklyCheckin"
        iconName="fas fa-file-signature"
        index="tables"
        isHeader
      />
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="Weekly Report"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-bar"
        index="performanceReview"
        :badge="count "
        isHeader
      />
      <!-- <NavLink
        header="Monthly Report"
        link="/app/monthlyReport"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="Monthly Report Review"
        link="/app/monthlyReportReview"
        iconName="fas fa-calendar-check"
        index="notifications"
        isHeader
      />-->
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="Your Juniors"
        link="/app/juniors"
        iconName="fas fa-users"
        isHeader
      />
      <!-- index="performanceReview" -->
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="View Junior's Checkin"
        link="/app/viewCheckin"
        iconName="fas fa-folder-open"
        index="performanceReview"
        isHeader
      />

      <NavLink
        header="View Manager's Review"
        link="/app/managerReview"
        iconName="fas fa-file-text"
        isHeader
      />
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="Juniors Weekly Report"
        link="/app/juniorWeekReport"
        iconName="fa fa-flag-checkered"
        index="feedback"
        isHeader
      />
      <NavLink
        header="Review360"
        link="/app/review360"
        iconName="fas fa-refresh"
        index="review360"
        isHeader
      />
      <NavLink
        v-if="sideBar.role === 'manager'"
        header="ViewReview360"
        link="/app/viewreview360"
        iconName="fas fa-recycle"
        index="review360"
        isHeader
      />
      <NavLink
        header="Feedback"
        link="/app/feedback"
        iconName="fas fa-file-signature"
        index="feedback"
        isHeader
      />

      <!-- <NavLink
        header="Performance Review"
        link="/app/PerformanceReview"
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
      />-->

      <!-- <NavLink
        header="Manage KPI's"
        link="/admin/manageKpi"
        iconName="fas fa-inbox"
        index="dashboard"
        isHeader
      />-->
      <!-- link="/app/weeklyReview" -->
      <!-- <NavLink

        header="View Check-ins"
        link="/app/checkin"
        iconName="fas fa-bars"
        index="tables"
        isHeader
      />-->
      <!-- header="View Weekly Report" -->
      <!-- <NavLink

        header="Weekly Report Review"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-line"
        index="performanceReview"
        isHeader
      />-->
      <!-- <NavLink
        header="Your Team"
        link="/app/team"
        iconName="fas fa-users"
        index="notifications"
        isHeader
      />-->
      <!-- <NavLink
        link="/app/notifications"
        iconName="fas fa-calendar-minus"
        index="notifications"
        isHeader
      />-->
      <!-- <NavLink

        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />-->
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import isScreen from "@/core/screenHelper";
import NavLink from "./NavLink/NavLink";
import { get, call } from "vuex-pathify";

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
  watch: {
    sideBar(newValue, oldValue) {
      this.fetchfeedbackCount();
    },
    countToReviewReport_(newValue, oldValue) {
      // console.log(newValue);
      // this.fetchfeedbackCount();
    }
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    api_fetchFeedback: call("feedback/fetchFeedback"),
    setCountToReview_: call("weeklyReportReview/setCountToReview"),
    api_fetchweekly: call("weeklyReportReview/getallWeeklyReport"),
    async fetchfeedbackCount() {
      if (this.sideBar.role === "Admin") {
        await this.api_fetchFeedback();
        await this.api_fetchweekly();
        await this.setCountToReview_({
          user: this.userProfile,
          reportArray: this.allweeklyReport_
        });
      }
      if (this.sideBar.role === "manager") {
        this.api_fetchweekly();
        await this.api_fetchweekly();
        await this.setCountToReview_({
          user: this.userProfile,
          reportArray: this.allweeklyReport_
        });
      }
    },

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
    sidebar: get("login/sidebar"),
    sideBar: get("profile/user"),
    feedback: get("feedback/feedbacksCount"),
    countToReviewReport_: get("weeklyReportReview/countToReviewReport"),

    userProfile: get("profile/user"),
    allweeklyReport_: get("weeklyReportReview/allweeklyReport"),

    count() {
      if (this.countToReviewReport_) {
        return JSON.stringify(this.countToReviewReport_);
      } else {
        return "0";
      }
    },
    feedbackCount() {
      return this.feedback.length;
    }
  }
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
