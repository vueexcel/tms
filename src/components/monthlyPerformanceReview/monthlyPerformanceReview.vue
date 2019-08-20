<template>
  <section>
    <div
      class="text-center employee"
      @click="checkEmployee(employee)"
      v-bind:class="{activeClass : employee.id === activeId}"
      :style="{border: '1px solid '+ setBorderColor}"
    >
      <div>
        <img
          class="rounded-circle mt-2 mb-2 h-auto"
          v-b-tooltip.hover
          :title="employee.name"
          :src="employee.profileImage ? employee.profileImage: avatar"
          width="40"
        />
        <div class="name">{{employee.username}}</div>
        <!-- <div class="post">{{employee.post}}</div> -->
        <div class="post">{{employee.team}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import image from "@/assets/avatar.png";
import { get, sync } from "vuex-pathify";

export default {
  name: "monthlyPerformanceReview",
  props: {
    employee: { type: Object, default: () => ({}) },
    activeId: { type: String, default: "" },
    employees: { type: Array, default: [] }
  },
  data() {
    return {
      avatar: image
      // allemployee: this.allemployee_,
      // userprofile: this.userprofile_
    };
  },
  watch: {
    employees(newValue, oldValue) {
      if (newValue.length !== oldValue.length) {
        this.$emit("setActive", newValue[0]);
      }
    }
  },
  computed: {
    allemployee: get("monthlyReportReview/employee"),
    userprofile: get("profile/user"),
    allReport: sync("monthlyReportReview/employee"),
    setBorderColor() {
      if (this.allemployee) {
        let color = "";
        let reportArray = [];
        this.allReport.forEach(report => {
          if (report.user.id === this.employee.id) {
            reportArray.push(report);
          }
        });
        if (reportArray.length) {
          let count = 0;
          reportArray.forEach(report => {
            let reviewed = report.is_reviewed.find(element => {
              return element._id === this.userprofile._id;
            });
            if (reviewed.reviewed === false) {
              count++;
            }
            color = count > 0 ? "red" : "orange";
          });
        }
        return color;
      }
    }
  },
  mounted() {
    // this.setBorderColor();
  },
  methods: {
    checkEmployee(employee) {
      this.$emit("setActive", this.employee);
    }
    // set border color per user
  }
};
</script>

<style src="./monthlyPerformanceReview.scss" lang="scss" />
