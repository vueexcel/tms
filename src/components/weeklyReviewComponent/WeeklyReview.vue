<template>
  <section>
    <div class="text-center employee"  @click="checkEmployee(employee)" v-bind:class="{activeClass : employee.id === activeId}"
    >  
    <!-- :style="{'background-color': style_variant.background_color, 'border': style_variant.border, 'color': style_variant.color  }" -->
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
    style_variant: {type: Object},
    activeClass: {type: Object}
  },
  data() {
    return {
      // activeClass: this.activeClass
    };
  },
  methods: {
  checkEmployee(employee) {
      this.$emit('setActive', this.employee)
    }
  },
  created(){
    console.log(this.activeClass)
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />
