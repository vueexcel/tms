<template>
  <section>
    <div
      class="text-center employee"
      @click="checkEmployee(employee)"
      v-bind:class="{activeClass : employee.id === activeId}"
      :style="{border: '1px solid '+ borderColor}"
    >
      {{setBorderColor}}
      <div>
        <img
          class="rounded-circle mt-2 mb-2 h-auto"
          v-b-tooltip.hover
          :title="employee.name"
          :src="employee.profileImage ? employee.profileImage: avatar"
          width="40"
        >
        <div class="name">{{employee.name}}</div>
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
    activeId: { type: String, default: "" }
  },
  data() {
    return {
      borderColor: "",
      avatar: image
      // allemployee: this.allemployee_,
      // userprofile: this.userprofile_
    };
  },
  computed: {
    allemployee: get("monthlyReportReview/employee"),
    userprofile: get("profile/user"),
    setBorderColor() {
      if (this.allemployee) {
        this.allemployee.forEach(element => {
          if (element.user.id === this.$props.employee.id) {
            if (element.review) {
              let response = element.review.some(ele => {
                return ele.manager_id.username === this.userprofile.username;
              });
              if (response) {
                return (this.borderColor = "orange");
              }
            }
            return (this.borderColor = "red");
          }
        });
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
