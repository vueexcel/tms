<template>
  <section>
    <div
      class="text-center"
      @click="checkEmployee(employee)"
      :class="{activeClassWeekly : employee._id === activeId && page === 'Weekly' , activeClass : employee._id === activeId && page != 'Weekly' }"
      :style="{'background-color': backgroundColor,'border': borderColor, 'border-radius': '8px'}"
    >
      <!--  -->
      <div>
        <img
          class="rounded-circle mt-2 mb-2 h-auto"
          v-b-tooltip.hover
          :title="employee.name"
          :src="employee.profileImage ? employee.profileImage : dummyImage_"
          width="40"
          height="40"
        >
        <div class="name">{{employee.username}}</div>
        <div class="post">{{employee.jobtitle}}</div>
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
    activeId: { type: String, default: null },
    activeClass: { type: Object },
    page: { type: String },
    allemployee: { type: Array, default: [] },
    highlightEployeeArray: {type: Array, default : []}
  },
  data() {
    return {
      dummyImage_: dummyImage
    };
  },
  mounted() {
    this.checkEmployee(this.allemployee[0]);
  },
  methods: {
    checkEmployee(employee) {
      this.$emit("setActive", employee);
    }
  },
  computed: {
    backgroundColor() {
      console.log(this.highlightEployeeArray);
      
      return "#" + this.activeClass.background_color;
    },
    borderColor() {
      if(this.highlightEployeeArray.length){
        for(var i=0;i<this.highlightEployeeArray.length;i++){
          if(this.employee._id === this.highlightEployeeArray[i]._id){

            return '1px solid #006400'
          }
        }
      } else {
        return "1px solid #" + this.activeClass.border;
      }
    }
  }
};
</script>

<style src="./WeeklyReview.scss" lang="scss" />
