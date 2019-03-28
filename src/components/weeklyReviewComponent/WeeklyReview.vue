<template>
  <section>
    <div class="text-center employee"  @click="checkEmployee(employee)" v-bind:class="{activeClass : employee.id === activeId}">  
        <div>
          <img
            class="rounded-circle mt-2 mb-2"
            v-b-tooltip.hover
            :title="employee.name"
            :src="employee.image"
            width="40"
            height="40"
          >
          <div class="name">{{employee.name}}</div>
          <div class="post">{{employee.post}}</div>
        </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'WeeklyReviewComponent',
  props: {
    employee: { type: Object, default: () => ({}) },
    activeId: {type: Number, default: ''}
  },
  data() {
    return {
    };
  },
  methods: {
  checkEmployee(employee) {
      this.$emit('setActive', this.employee)
    }
  },
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />
