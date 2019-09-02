<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link v-if="sidebarOpened || sidebarStatic===true" to>
        <img class="pl-1 pr-4" src="@/images/logo.png" width="100%" alt="logo">
      </router-link>
      <!-- to="/app" -->
      <router-link v-if="!sidebarOpened && sidebarStatic === false" to>
        <img class="pl-2 pr-3" src="@/images/X_logo.png" width="50px" alt="logo">
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
        :activeItem="activeItem"
        header="Weekly"
        link="/app/week"
        iconName="fas fa-chart-bar"
        index="week"
        :childrenLinks="[
          { header: 'Weekly Report', link: '/app/week/WeeklyReport' },
          {header: 'Juniors Weekly Report',link:'/app/week/juniorWeekReport'}
        ]"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Monthly"
        link="/app/month"
        iconName="fas fa-calendar"
        index="month"
        :childrenLinks="[
          { header: 'Monthly Review', link: '/app/month/monthlyReportReview' },
          {header: 'Juniors Monthly Report',link:'/app/month/juniorMonthlyReport'}
        ]"
        isHeader
      />
      <!-- <NavLink
        header="Monthly Review"
        link="/app/month/monthlyReportReview"
        iconName="fas fa-calendar"
        :badge="unreadMonthlyReport.toString()"
        isHeader
      />-->
      <!-- :badge="unreadMonthlyReport.toString()" -->
      <!-- <NavLink
        header="Juniors Monthly Report"
        link="/app/month/juniorMonthlyReport"
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
        header="Notes"
        link="/app/notes"
        iconName="fa fa-sticky-note"
        index="Notes"
        isHeader
      />
      <!-- <NavLink
        header="Juniors Weekly Report"
        link="/app/juniorWeekReport"
        iconName="fa fa-flag-checkered"
        index="feedback"
        isHeader
      />
      <NavLink
        header="Juniors Monthly Report"
        link="/app/juniorMonthlyReport"
        iconName="fa fa-users"
        index="feedback"
        isHeader
      />-->
      <!-- index="performanceReview" -->
      <NavLink
        header="View Feedback"
        link="/admin/viewfeedback"
        iconName="fas fa-comments"
        :badge="JSON.stringify(feedbackCount)"
        isHeader
      />
      <!-- <NavLink
        header="View Monthly Report"
        link="/app/PerformanceReview"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />-->
      <NavLink
        header="ViewReview360&#176;"
        link="/app/360/viewreview360"
        iconName="fas fa-recycle"
        index="review360"
        :badge="unreadView360.toString()"
        isHeader
      />
      <!-- <NavLink
        header="Settings"
        link="/admin/settings"
        iconName="fas fa-gears"
        index="setting"
        isHeader
      /> -->
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
    <!-- ######################### manager #############################-->
    <!-- <ul class="nav" v-if="!sidebar"> -->
    <ul class="nav" v-if="sideBar.role === 'manager'">
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
        :activeItem="activeItem"
        header="Weekly"
        iconName="fas fa-chart-bar"
        link="/app/week"
        index="week"
        isHeader
        :childrenLinks="[
          { header: 'Weekly Checkin',  link: '/app/week/weeklyCheckin' },
          { header: 'Weekly Report', link: '/app/week/WeeklyReport' },
          {header: 'Juniors Weekly Report',link:'/app/week/juniorWeekReport'},
          {header: `View Manager's Review`,link:'/app/week/managerReview'}
        ]"
      />
      <!-- <NavLink
        header="Weekly Checkin"
        link="/app/weeklyCheckin"
        iconName="fas fa-file-signature"
        index="tables"
        isHeader
      />-->
      <!-- v-if="sideBar.role === 'manager'" -->
      <!-- <NavLink
        header="Weekly Report"
        link="/app/WeeklyReport"
        iconName="fas fa-chart-bar"
        index="performanceReview"
        :badge="count"
        isHeader
      />-->
      <!-- header="Monthly Report" -->
      <NavLink
        :activeItem="activeItem"
        header="Monthly"
        iconName="fas fa-calendar"
        link="/app/month"
        index="month"
        isHeader
        :badge="unreadMonthlyReport.toString()"
        :childrenLinks="[
          { header: 'Monthly Report',  link: '/app/month/monthlyReport' },
          { header: 'Monthly Review', link: '/app/month/monthlyReportReview' },
          { header: 'Juniors Monthly Report',link:'/app/month/juniorMonthlyReport'},
          { header: `View Manager's Review`,link:'/app/month/viewManagerReiewMonthly'}
        ]"
      />

      <!-- <NavLink
        header="Monthly Report"
        link="/app/monthlyReport"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />-->
      <!-- <NavLink
        header="Monthly Review"
        link="/app/month/monthlyReportReview"
        iconName="fas fa-calendar-check"
        :badge="unreadMonthlyReport.toString()"
        index="notifications"
        isHeader
      />-->
      <!-- <NavLink
        header="Juniors Monthly Report"
        link="/app/juniorMonthlyReport"
        iconName="fa fa-users"
        index="feedback"
        isHeader
      />-->
      <NavLink header="Your Juniors" link="/app/juniors" iconName="fas fa-users" isHeader/>
      <!-- index="performanceReview" -->
      <!-- v-if="sideBar.role === 'manager'" -->
      <NavLink
        header="View Junior's Checkin"
        link="/app/viewCheckin"
        iconName="fas fa-folder-open"
        index="performanceReview"
        isHeader
      />
      <NavLink
        header="Notes"
        link="/app/notes"
        iconName="fa fa-sticky-note"
        index="Notes"
        isHeader
      />

      <!-- <NavLink
        header="View Manager's Review"
        link="/app/managerReview"
        iconName="fas fa-file-text"
        isHeader
      />-->
      <!-- <NavLink
        v-if="sideBar.role === 'manager'"
        header="Juniors Weekly Report"
        link="/app/juniorWeekReport"
        iconName="fa fa-flag-checkered"
        index="feedback"
        isHeader
      />-->
      <NavLink
        :activeItem="activeItem"
        header="360View&Review"
        iconName="fas fa-recycle"
        link="/app/360"
        index="360"
        isHeader
        :childrenLinks="[
          { header: 'Review360&#176;',  link: '/app/360/review360' },
          { header: 'ViewReview360&#176;', link: '/app/360/viewreview360' },
        ]"
      />
      <!-- <NavLink
        header="Review360"
        link="/app/review360"
        iconName="fas fa-refresh"
        index="review360"
        isHeader
      />-->
      <!-- <NavLink
        header="ViewReview360"
        link="/app/viewreview360"
        iconName="fas fa-recycle"
        index="review360"
        isHeader
      />-->
      <!-- v-if="sideBar.role === 'manager'" -->

      <NavLink
        header="Feedback"
        link="/app/feedback"
        iconName="fas fa-file-signature"
        index="feedback"
        isHeader
      />
      <!-- <NavLink
        header="Peer to Peer Review"
        link="/app/peerReview"
        iconName="fas fa-handshake-o"
        index="feedback"
        isHeader
      /> -->

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
    <!-- ##################### employee/ user ############################3 -->
    <ul class="nav" v-if="sideBar.role !== 'manager' && sideBar.role !== 'Admin' ">
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
        link="/app/week/weeklyCheckin"
        iconName="fas fa-file-signature"
        index="tables"
        isHeader
      />
      <NavLink
        header="View Manager's Review"
        link="/app/week/managerReview"
        iconName="fas fa-file-text"
        isHeader
      />
      <NavLink
        header="Monthly Report"
        link="/app/month/monthlyReport"
        iconName="fas fa-calendar"
        index="notifications"
        isHeader
      />
      <NavLink
        header="View Manager's Review"
        link="/app/month/viewManagerReiewMonthly"
        iconName="fas fa-calendar-check"
        index="viewManagerReiewMonthly"
        isHeader
      />
      <NavLink
        header="Feedback"
        link="/app/feedback"
        iconName="fas fa-file-signature"
        index="feedback"
        isHeader
      />
      <NavLink
        header="Review360"
        link="/app/360/review360"
        iconName="fas fa-refresh"
        index="review360"
        isHeader
      />
      <!-- <NavLink
        header="Peer to Peer Review"
        link="/app/peerReview"
        iconName="fas fa-handshake-o"
        index="feedback"
        isHeader
      /> -->
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
      // this.getUsersMonthlyReports();
    },
    // countToReviewReport_(newValue, oldValue) {
    //   // console.log(newValue);
    //   // this.fetchfeedbackCount();
    // }
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    api_fetchFeedback: call("feedback/fetchFeedback"),
    setCountToReview_: call("weeklyReportReview/setCountToReview"),
    api_fetchweekly: call("weeklyReportReview/getallWeeklyReport"),
    api_getAllJuniorReviews: call("review360/getAllJuniorReviews"), //360 view count
    api_getUsersMonthlyReports: call(
      "monthlyReportReview/getUsersMonthlyReports"
    ),
    async fetchfeedbackCount() {
      if (this.sideBar.role === "Admin") {
        await this.api_fetchFeedback();
        await this.api_fetchweekly();
        await this.api_getUsersMonthlyReports();
        await this.api_getAllJuniorReviews();
        await this.setCountToReview_({
          user: this.userProfile,
          reportArray: this.allweeklyReport_
        });
      }
      if (this.sideBar.role === "manager") {
        this.api_fetchweekly();
        await this.api_fetchweekly();
        await this.api_getUsersMonthlyReports();
        await this.api_getAllJuniorReviews();
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
    unreadView360: get("review360/count360"),

    userProfile: get("profile/user"),
    allweeklyReport_: get("weeklyReportReview/allweeklyReport"),
    unreadMonthlyReport: get("monthlyReportReview/unreadMonthlyReport"),

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
