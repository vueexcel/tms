<template>
  <section>
    <div
      class="text-center employee"
      @click="checkEmployee(employee)"
      v-bind:class="{activeClass : employee.id === activeId}"
      :style="{border: '1px solid '+ borderColor}"
    >
      <!-- {{setBorderColor()}} -->
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

export default {
  name: "monthlyPerformanceReviewComponent",
  props: {
    employee: { type: Object, default: () => ({}) },
    activeId: { type: Number, default: "" }
  },
  mounted() {
    console.log(this.$props.employee);
  },
  data() {
    return {
      borderColor: "",
      avatar: image
    };
  },
  methods: {
    checkEmployee(employee) {
      this.$emit("setActive", this.employee);
    },
    setBorderColor() {
      this.borderColor = "blue";
    }
  }
};
</script>

<style src="./monthlyPerformanceReview.scss" lang="scss" />
