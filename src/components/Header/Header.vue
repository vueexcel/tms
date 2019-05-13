<template>
  <b-navbar class="header d-print-none">
    <b-nav>
      {{recentactivitylenght}}
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class="la la-bars la-lg"/>
        </a>
        <b-tooltip target="barsTooltip" placement="bottom">
          Turn on/off
          <br>sidebar
          <br>collapsing
        </b-tooltip>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <span class="rounded rounded-lg bg-gray text-white d-md-none">
            <i class="la la-bars la-lg"/>
          </span>
          <i class="la la-bars la-lg d-sm-down-none ml-4"/>
        </a>
      </b-nav-item>
    </b-nav>
    <b-nav></b-nav>
    <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-gray mr-n-sm"/>
      <i class="fa fa-circle text-warning"/>
      &nbsp;
      sing
      &nbsp;
      <i class="fa fa-circle text-warning mr-n-sm"/>
      <i class="fa fa-circle text-gray"/>
    </a>
    <b-nav class="ml-auto">
      <b-nav-item-dropdown
        id="basic-nav-dropdown"
        class="notificationsMenu d-sm-down-none mr-2"
        extra-menu-classes="notificationsWrapper py-0 animated animated-fast fadeInUp"
        right
      >
        <template slot="button-content">
          <span class="avatar thumb-sm float-left mr-2">
            <img
              class="rounded-circle"
              :src="user.profileImage ? user.profileImage : image"
              alt="..."
            >
          </span>
          <span class="small">
            <span class="fw-semi-bold">{{user.username}}</span>
          </span>
          <span
            class="ml-1 circle bg-warning text-white fw-bold"
          
          >{{notificationlength}}</span>
        </template>
        <Notifications/>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class="la la-cog px-2"/>
        </template>
        <!-- <b-dropdown-item>
          <i class="la la-user"/> My Account
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item>Calendar</b-dropdown-item>
        <b-dropdown-item>Inbox &nbsp;&nbsp;
          <b-badge variant="danger" pill class="animated bounceIn">9</b-badge>
        </b-dropdown-item>
        <b-dropdown-divider/>-->
        <b-dropdown-item-button @click="logout">
          <i class="la la-sign-out"/> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <!-- <b-nav-item>
        <a class="d-sm-down-none px-2" id="toggle-chat" href="#" @click="toggleChat">
          <i class="la la-globe" />
        </a>
        <div id="chat-notification" class="chatNotification hide">
          <div class="chatNotificationInner">
            <h6 class="title d-flex text-white">
              <span class="thumb-xs">
                <img src="../../assets/people/a6.jpg" alt=""
                  class="rounded-circle mr-xs float-left" />
              </span>
              Jess Smith
            </h6>
            <p class="text">
              Hi there! <br /> This is a completely new version of Sing App <br />
              built with <strong class="text-primary">Vue</strong>
            </p>
          </div>
        </div>
      </b-nav-item>-->
      <b-nav-item class="fs-lg d-md-none">
        <a href="#" @click="toggleChat">
          <span class="rounded rounded-lg bg-gray text-white">
            <i class="la la-globe"/>
          </span>
        </a>
      </b-nav-item>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get, call, sync } from "vuex-pathify";
import $ from "jquery";
import Notifications from "@/components/Notifications/Notifications";
import dummyimage from "@/components/Group/person-dummy.jpg";

export default {
  name: "Headed",
  data() {
    return {
      image: dummyimage,
      notificationlength: 0,
      dailycheckinlength: 0,
      notificationlength: 0,
      reportreviewlength: 0
    };
  },
  components: { Notifications },
  computed: {
    user: get("profile/user"),
    activity: get("profile/activity"),
    ...mapState("layout", {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic
    }),
    recentactivitylenght() {
      // console.log(this.activity);
      Array.prototype.forEach.call(this.activity, element => {
        // console.log(element);
        if (element.Daily_checkin) {
          this.dailycheckinlength = element.Daily_checkin.length;
          // console.log(dailycheckinlength);
        }
        if (element.missed_checkin) {
          this.misscheckinlength = element.missed_checkin.length;
        }
        if (element.report_reviewed) {
          this.reportreviewlength = element.report_reviewed.length;
        }
        this.notificationlength =this.dailycheckinlength + this.misscheckinlength + this.reportreviewlength;
      });
    }
  },
  methods: {
    ...mapActions("layout", [
      "toggleSidebar",
      "toggleChat",
      "switchSidebar",
      "changeSidebarActive"
    ]),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },

    logout() {
      window.localStorage.setItem("authenticated", false);
      // this.$router.push("/login");
      localStorage.clear();
      this.$cookies.remove("keepLoggedIn");
      this.$router.push("/");
    }
  },
  created() {
    if (window.innerWidth > 576) {
      setTimeout(() => {
        const $chatNotification = $("#chat-notification");
        $chatNotification
          .removeClass("hide")
          .addClass("animated fadeIn")
          .one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            () => {
              $chatNotification.removeClass("animated fadeIn");
              setTimeout(() => {
                $chatNotification
                  .addClass("animated fadeOut")
                  .one(
                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd" +
                      " oanimationend animationend",
                    () => {
                      $chatNotification.addClass("hide");
                    }
                  );
              }, 6000);
            }
          );
        $chatNotification
          .siblings("#toggle-chat")
          .append('<i class="chat-notification-sing animated bounceIn"></i>');
      }, 4000);
    }
  }
};
</script>

<style src="./Header.scss" lang="scss" scoped />
