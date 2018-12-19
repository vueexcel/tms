<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link to="/app"> <img src="./../../images/logo.png" width="100%" alt="logo"> </router-link>
    </header>
    <ul class="nav">
      <NavLink
        header="Dashboard"
        link="/app/dashboard"
        iconName="fas fa-clone"
        index="dashboard"
        isHeader
      />
      <NavLink
        header="Check-ins"
        link="/app/typography"
        iconName="fas fa-clipboard"
        index="typography"
        isHeader
      />
      <NavLink
        header="Weekly Review"
        link="/app/tables"
        iconName="fas fa-file-signature"
        index="tables"
        isHeader
      />
      <NavLink
        header="Performance Review"
        link="/app/notifications"
        iconName="fas fa-chart-line"
        index="notifications"
        isHeader
      />
      <NavLink
        header="Your Team"
        link="/app/notifications"
        iconName="fas fa-users"
        index="notifications"
        isHeader
      />
      <NavLink
        header="Admin"
        link="/app/notifications"
        iconName="fas fa-user-cog"
        index="notifications"
        isHeader
      />
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'info',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
