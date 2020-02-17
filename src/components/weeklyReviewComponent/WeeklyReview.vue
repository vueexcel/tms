<template>
  <section>
    <div
      class="text-center"
      @click="checkEmployee(employee)"
      :class="{activeClassWeekly : employee._id === activeId && page === 'Weekly' , activeClass : employee._id === activeId && page != 'Weekly' }"
      :style="{'background-color': backgroundColor,'border': borderColor, 'border-radius': '8px'}"
    >
      <div>
        <img
          class="rounded-circle mt-2 mb-2 h-auto"
          v-b-tooltip.hover
          :title="employee.name"
          :src="employee.profileImage ? employee.profileImage : dummyImage_"
          width="40"
          height="40"
        />
        <div class="name">{{employee.username}}</div>
        <div class="post">{{employee.jobtitle}}</div>
      </div>
    </div>
  </section>
</template>

<script>
/*eslint-disable*/
import Vue from "vue";
import dummyImage from "./../../assets/people/dummy.jpeg";
import { get, call } from "vuex-pathify";

export default {
  name: "WeeklyReviewComponent",
  props: {
    employee: { type: Object, default: () => ({}) },
    activeId: { type: String, default: null },
    activeClass: { type: Object },
    page: { type: String },
    allemployee: { type: Array, default: [] },
    highlightEployeeArray: { type: Array, default: [] },
    allreport: { type: Array, default: [] },
    allData: { type: Array }
  },
  data() {
    return {
      dummyImage_: dummyImage
    };
  },
  mounted() {
    this.checkEmployee(this.allemployee[0]);
  },
  watch: {
    allemployee(newValue, oldValue) {
      if (newValue.length !== oldValue.length) {
        this.checkEmployee(newValue[0]);
      }
    }
  },
  methods: {
    checkEmployee(employee) {
      this.$emit("setActive", employee);
    }
  },
  computed: {
    userProfile: get("profile/user"),
    backgroundColor() {
      return "#" + this.activeClass.background_color;
    },
    borderColor() {
      let report = {};
      let color = "";
      if (this.highlightEployeeArray.length) {
        for (let i = 0; i < this.allemployee.length; i++) {
          const element = this.allemployee[i];
          if (element._id == this.employee._id) {
            for (let k = 0; k < this.allreport.length; k++) {
              if (element._id === this.allreport[k].user) {
                report = this.allreport[k];
                report.is_reviewed.find(manager => {
                  if (manager._id === this.userProfile._id) {
                    if (manager.reviewed === false) {
                      color = "red";
                    } else {
                      color = "orange";
                    }
                  }
                });
              }
            }
          }
        }
        return "1px solid " + color;
      } else {
        return "1px solid #" + this.activeClass.border;
      }
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />