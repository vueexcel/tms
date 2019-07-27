<template>
  <div>
    <div>
      <Widget class="mb-0">
        <div class="h-100">
          <div class="float-left pr-3">
            <img
              :src="user.profile && user.profile.profileImage ? user.profile.profileImage : image"
              class="rounded-circle"
              width="75"
              height="75"
              alt="..."
            />
          </div>

          <div class="pt-2" v-if="user.profile">
            <span class="fs-larger text-capitalize">
              <span class="fw-semi-bold">{{user.profile.name}}</span>
            </span>
            <p class="fw-small">{{user.profile.jobtitle}}</p>
          </div>
        </div>
        <!--==================================================================== 
                * Dashbard blocks 
        *=======================================================================-->
        <div class="w-auto pl-5 ml-5">
          <!-- blocks -->
          <span class="mr-4 fw-semi-bold">Reviewers</span>
          <br />
          <!-- 1st block -->
          <span v-for="(manager,index) in sortedArray" :key="index">
            <div
              class="rounded w-auto p-1 h-auto mr-1 mt-2"
              v-bind:class="{success : manager.weight <= 3 ,primary:  manager.weight > 3 && manager.weight <= 6, warning:  manager.weight > 6 && manager.weight <= 10}"
            >
              <span class="thumb-md float-left ml-1 mt-1">
                <img
                  class="rounded-circle"
                  :src="manager.profileImage ? manager.profileImage : image"
                  width="35"
                  height="35"
                  alt="..."
                />
              </span>
              <div class="float-left text-white text-left pl-2 pr-1">
                <span class="fw-bold fs-large">{{manager.username }}</span>
                <br />
                <span class="fs-sm">{{manager.job_title}}</span>
              </div>
            </div>
          </span>
        </div>
      </Widget>
    </div>
    <div>
      <h1>Key Performance Area</h1>
          <div v-if="user.profile && user.profile.kpi">
            <section>
        <div v-for="(kpiera,index) in newArray" :key="index" class="areaBorder">
          <div
            class="mb-0 bg-white pl-5 pt-1 pr-4"
            v-if="kpiera.title !== '' && kpiera.desc !== ''"
          >
            <p class="text-primary capitalize">
              {{kpiera.title}}
              <RadialProgressBar
                v-if="kpiera.rating"
                class="pull-right"
                :diameter="45"
                :completed-steps="kpiera.rating"
                :total-steps="total"
                :strokeWidth="5"
              >
                <p></p>
                <p class="fs-mini">{{ kpiera.rating.toFixed(1) }}</p>
              </RadialProgressBar>
            </p>
            <!-- {{kpiera.desc}} -->
          </div>
        </div>
      </section>
            <!-- <AreaComponent :eraKpiArray="user.profile.kpi.kpi_json" :monthlyRating="user.profile.Monthly_rating" /> -->
          </div>
          <!-- second widget ends-->
          <!-- third widget -->
          <h1>Extra Resource Area</h1>
          <div v-if="user.profile.kpi">
            <AreaComponent :eraKpiArray="user.profile.kpi.era_json" :monthlyRating="user.profile.Monthly_rating" />
          </div>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import AreaComponent from "@/components/Area/Area";
import dummyimage from "@/components/Group/person-dummy.jpg";
import { get, call, sync } from "vuex-pathify";
export default {
  data() {
    return {
      user: {},
      image: dummyimage
    };
  },
  components: {
    Widget,
    AreaComponent
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
    userToCheckByAdmin_: sync("allMember/userToCheckByAdmin"),
    sortedArray() {
      if(this.user.profile){
        this.checkin_rating = this.user.profile.Checkin_rating
          ? Math.round(this.user.profile.Checkin_rating)
          : 0;
        this.Overall_rating = this.user.profile.Overall_rating
          ? this.user.profile.Overall_rating
          : 0;
        let managers = this.user.profile.managers;
        if (managers) {
          function compare(a, b) {
            if (a.weight && b.weight) {
              if (a.weight > b.weight) return -1;
              if (a.weight < b.weight) return 1;
              return 0;
            }
          }
          managers = managers.sort(compare);
          return managers;
        }
      }
    },
    newArray(){
      let newArray = []
      this.user.profile.kpi.kpi_json.forEach(element => {
        if (Object.keys(this.user.profile.Monthly_rating).length) {
          Object.keys(this.user.profile.Monthly_rating).forEach(ele => {
            if (element.ID === ele) {
              newArray.push({
                ID: element.ID,
                desc: element.desc,
                edit: element.edit,
                title: element.title,
                rating: this.$props.monthlyRating[ele]
              });
            }
          });
        } else {
          newArray.push({
            ID: element.ID,
            desc: element.desc,
            edit: element.edit,
            title: element.title,
            rating: 0
          });
        }
      });
      return newArray
    }
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
    }
  }
};
</script>

<style src="./overallReview.scss" lang="scss" scoped />
