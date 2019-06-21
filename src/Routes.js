import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";
import LayoutAdmin from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import ErrorPage from "@/pages/Error/Error";
// Core
import TypographyPage from "@/pages/Typography/Typography";

// Tables
import TablesBasicPage from "@/pages/Tables/Basic";

// Maps
import GoogleMapPage from "@/pages/Maps/Google";

// === Main
import Profile from "@/pages/Profile/Profile";
import Checkin from "@/pages/Checkin/Checkin";
import ViewCheckin from "@/pages/ViewCheckin/ViewCheckin";
import WeeklyReview from "@/pages/WeeklyReview/WeeklyReview";
import WeeklyReport from "@/pages/WeeklyReportReview/WeeklyReport";
import MonthlyPerformanceReview from "@/pages/MonthlyPerformanceReview/MonthlyPerformanceReview";
import Juniors from "@/pages/Juniors/Juniors";
import ManagerReview from "@/pages/ManagerReview/ManagerReview"
import Team from "@/pages/Team/Team";
import Feedback from "@/pages/Feedback/Feedback";
import JuniorWeekReport from "@/pages/JuniorWeekReport/JuniorWeekReport"
import JuniorMonthlyReport from "@/pages/JuniorMonthlyReport/JuniorMonthlyReport"
import ViewFeedback from "@/pages/ViewFeedback/ViewFeedback";
import MonthlyReport from "@/pages/MonthlyReport/MonthlyReport";
import MonthlyReportReview from "@/pages/MonthlyReportReview/MonthlyReportReview";
import Review360 from "@/pages/Review360/Review360";
import ViewReview360 from "@/pages/ViewReview360/ViewReview360";
// --admin pages--
import ManageEmployee from "@/pages/ManageEmployee/ManageEmployee";
import ManageKPI from "@/pages/Kpi/Kpi";
import Settings from "@/pages/Settings/Settings";

// Charts
import ChartsPage from "@/pages/Charts/Charts";

// Ui
import IconsPage from "@/pages/Icons/Icons";
import NotificationsPage from "@/pages/Notifications/Notifications";
import { relativeTimeRounding } from "moment";
import store from "./store/index";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    // {
    //   path: "/error",
    //   name: "Error",
    //   component: ErrorPage
    // },
    {
      path: "/app",
      name: "Layout",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "profile",
          name: "Profile",
          component: Profile,
          meta: { requiresAuth: true }
        },
        {
          path: "checkin",
          name: "Checkin",
          component: Checkin
        },
        {
          path: "viewCheckin",
          name: "ViewCheckin",
          component: ViewCheckin
        },
        {
          path: "week/weeklyCheckin", //previously weeklyReview
          name: "WeeklyReview",
          component: WeeklyReview
        },
        {
          path: "PerformanceReview",
          name: "MonthlyPerformanceReview",
          component: MonthlyPerformanceReview
        },
        {
          path: "team",
          name: "Team",
          component: Team
        },
        {
          path: "week/weeklyReport",
          name: "WeeklyReport",
          component: WeeklyReport
        },
        {
          path: "month/monthlyReport",
          name: "monthlyReport",
          component: MonthlyReport
        },
        {
          path: "month/monthlyReportReview",
          name: "monthlyReportReview",
          component: MonthlyReportReview
        },
        {
          path: 'juniors',
          name: "Juniors",
          component: Juniors
        },
        {
          path: 'feedback',
          name: "Feedback",
          component: Feedback
        },
        {
          path: 'viewfeedback',
          name: "ViewFeedback",
          component: ViewFeedback
        },
        {
          path: 'week/managerReview',
          name: "ManagerReview",
          component: ManagerReview
        },
        {
          path: 'week/juniorWeekReport',
          name: "JuniorWeekReport",
          component: JuniorWeekReport
        },
        {
          path: 'month/juniorMonthlyReport',
          name: "JuniorMonthlyReport",
          component: JuniorMonthlyReport
        }, {
          path: '360/review360',
          name: "review360",
          component: Review360
        },
        {
          path: '360/viewreview360',
          name: "viewreview360",
          component: ViewReview360
        },
        {
          path: "typography",
          name: "TypographyPage",
          component: TypographyPage
        },
        {
          path: "components/icons",
          name: "IconsPage",
          component: IconsPage
        },
        {
          path: "notifications",
          name: "NotificationsPage",
          component: NotificationsPage
        },
        {
          path: "components/charts",
          name: "ChartsPage",
          component: ChartsPage
        },
        {
          path: "tables",
          name: "TablesBasicPage",
          component: TablesBasicPage
        },
        {
          path: "components/maps",
          name: "GoogleMapPage",
          component: GoogleMapPage
        },
      ]
    },
    {
      path: "/admin",
      name: "LayoutAdmin",
      component: LayoutAdmin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "manageKpi",
          name: "ManageKPI",
          component: ManageKPI,
          meta: { requiresAuth: true }
        },
        {
          path: "manageEmployee",
          name: "ManageEmployee",
          component: ManageEmployee,
          meta: { requiresAuth: true }
        },
        {
          path: "settings",
          name: "Settings",
          component: Settings,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('authenticated') && !$cookies.get("keepLoggedIn")) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else if ((localStorage.getItem('authenticated') && to.path == "/") || ($cookies.get("keepLoggedIn") && to.path == "/")) {
    if (store.state.profile.user.role === 'Admin') {
      next({
        path: '/admin/manageKpi'
      })
    } else {
      next({
        path: '/app/profile'
      })
    }
    // next()
  } else {
    next()
  }
})


export default router;
