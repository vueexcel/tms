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
import ViewFeedback from "@/pages/ViewFeedback/ViewFeedback";
// --admin pages--
import ManageEmployee from "@/pages/ManageEmployee/ManageEmployee";
import ManageKPI from "@/pages/Kpi/Kpi";

// Charts
import ChartsPage from "@/pages/Charts/Charts";

// Ui
import IconsPage from "@/pages/Icons/Icons";
import NotificationsPage from "@/pages/Notifications/Notifications";
import { relativeTimeRounding } from "moment";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorPage
    },
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
          path: "weeklyCheckin", //previously weeklyReview
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
          path: "weeklyReport",
          name: "WeeklyReport",
          component: WeeklyReport
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
          path: 'managerReview',
          name: "ManagerReview",
          component: ManagerReview
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
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if ($cookies.get("keepLoggedIn") && to.path == "/") {
    next({
      path: '/admin'
    })
  } else {
    next()
  }

  return;
});

export default router;
