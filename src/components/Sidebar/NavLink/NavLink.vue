<template>
  <li v-if="!childrenLinks && isHeader" :class="{headerLink: true, className}">
    <router-link :to="link">
      <span class="icon">
        <i :class="fullIconName"></i>
      </span>
      <span v-html="header"></span>
      <!-- {{header}} -->
      <sup v-if="label" class="headerLabel">{{label}}</sup>
      <b-badge v-if="badge" class="badge rounded-f" variant="warning" pill>{{badge}}</b-badge>
    </router-link>
  </li>
  <li v-else-if="childrenLinks" :class="{headerLink: true, className}">
    <div @click="() => togglePanelCollapse(link)">
      <router-link :to="link" event class="d-flex">
        <span class="icon">
          <i :class="fullIconName"></i>
        </span>
        <span v-html="header"></span>
        <!-- {{header}} -->
        <sup v-if="label" class="headerLabel">{{label}}</sup>
        <div :class="{caretWrapper: true, carretActive: isActive}">
          <i class="fa fa-angle-left"/>
        </div>
      </router-link>
    </div>
    <b-collapse :id="'collapse' + index" :visible="isActive">
      <ul>
        <NavLink
          v-for="link in childrenLinks"
          :key="link.link"
          :activeItem="activeItem"
          :header="link.header"
          :index="link.index"
          :link="link.link"
          :childrenLinks="link.childrenLinks"
          :badge="count"
        />
      </ul>
    </b-collapse>
  </li>
  <li v-else>
    <router-link :to="index !== 'menu' && link">
      <span v-html="header"></span>
      <!-- {{header}} -->
      <sup v-if="label" class="headerLabel">{{label}}</sup>
      <b-badge
        v-if="link === '/app/week/WeeklyReport'"
        class="badge rounded-f float-right mt-0"
        variant="warning"
        pill
      >{{count}}</b-badge>
      <b-badge
        v-if="link === '/app/month/monthlyReportReview'"
        class="badge rounded-f float-right mt-0"
        variant="warning"
        pill
      >{{countmonthly}}</b-badge>
      <b-badge
        v-if="link === '/app/360/viewreview360'"
        class="badge rounded-f float-right mt-0"
        variant="warning"
        pill
      >{{unreadView360}}</b-badge>
    </router-link>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import { get } from "vuex-pathify";
export default {
  name: "NavLink",
  props: {
    badge: { type: String, dafault: "" },
    header: { type: String, default: "" },
    iconName: { type: String, default: "" },
    headerLink: { type: String, default: "" },
    link: { type: String, default: "" },
    childrenLinks: { type: Array, default: null },
    className: { type: String, default: "" },
    isHeader: { type: Boolean, default: false },
    deep: { type: Number, default: 0 },
    activeItem: { type: String, default: "" },
    label: { type: String },
    index: { type: String }
  },
  data() {
    return {
      headerLinkWasClicked: true
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive"]),
    togglePanelCollapse(link) {
      this.changeSidebarActive(link);
      this.headerLinkWasClicked =
        !this.headerLinkWasClicked || !this.activeItem.includes(this.index);
    }
  },
  computed: {
    countToReviewReport_: get("weeklyReportReview/countToReviewReport"),
    unreadMonthlyReport: get("monthlyReportReview/unreadMonthlyReport"),
    unreadView360: get("review360/count360"),
    fullIconName() {
      return `${this.iconName}`; //removed 'fi' in order use fontawesome5 icons / Dashboard
    },
    isActive() {
      return (
        this.activeItem &&
        this.activeItem.includes(this.index) &&
        this.headerLinkWasClicked
      );
    },
    count() {
      if (this.activeItem === "/app/week" && this.countToReviewReport_) {
        return JSON.stringify(this.countToReviewReport_);
      } else {
        return "0";
      }
    },
    countmonthly() {
      if (this.unreadMonthlyReport) {
        return JSON.stringify(this.unreadMonthlyReport);
      } else {
        return "0";
      }
    }
  }
};
</script>

<style src="./NavLink.scss" lang="scss" scoped />
