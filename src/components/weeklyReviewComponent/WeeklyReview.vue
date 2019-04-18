<template>
  <section>
    <div class="text-center"  @click="checkEmployee(employee)" v-bind:class="{activeClassWeekly : employee.id === activeId && page === 'Weekly' , activeClass : employee.id === activeId && page != 'Weekly' }"
    :style="{'background-color': backgroungColor, 'border': borderColor, 'border-radius': '8px' }"
    > 
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
    activeId: {type: Number, default: ''},
    activeClass: {type: Object},
    page : {type: String}
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
  computed:{
    backgroungColor() {
      return '#' + this.activeClass.background_color
    },
    borderColor() {
      return '1px solid #' +this.activeClass.border
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />
