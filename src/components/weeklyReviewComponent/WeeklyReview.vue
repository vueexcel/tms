<template>
  <section>
    <div
      class="text-center "
      @click="checkEmployee(employee)"
      v-bind:class="{activeClassWeekly : employee.id === activeId && page === 'Weekly' , activeClass : employee.id === activeId && page != 'Weekly' }"
      :style="{'background-color': backgroungColor, 'border': borderColor, 'border-radius': '8px' }"
    >
      <div>
        <img
          class="rounded-circle mt-2 mb-2"
          v-b-tooltip.hover
          :title="employee.name"
          :src="employee.image ? employee.image : dummyImage_"
          width="40"
          height="40"
        >
        <!-- <div class="name">{{employee.user}}</div> -->
        <div class="post">{{employee.username}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import dummyImage from "./../../assets/people/dummy.jpeg";
export default {
  name: "WeeklyReviewComponent",
  props: {
    employee: { type: Object, default: () => ({}) },
    activeId: { type: Number, default: 0 },
    activeClass: { type: Object },
    page: { type: String }
  },
  data() {
    return {
      dummyImage_: dummyImage
    };
  },
  methods: {
    checkEmployee(employee) {
      this.$emit("setActive", employee);
    }
  },
  computed: {
    backgroungColor() {
      return "#" + this.activeClass.background_color;
    },
    borderColor() {
      return "1px solid #" + this.activeClass.border;
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />
