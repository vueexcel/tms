<template>
  <div>
    <div class="pb-xlg mb-0">
      <div class="h-100 bg-white p-2 border">
        <div class="float-right">
          <i class="fa fa-pencil text-light" aria-hidden="true"></i>
        </div>
        <div class="text-center pr-3 mt-2">
          <img class="rounded-circle" src="@/assets/people/a5.jpg" width="75" height="75" alt="...">
        </div>

        <div class="pt-2 text-center">
          <span class="fs-larger text-capitalize">
            <span>{{employee.name}}</span>
          </span>
          <p class="fw-small text-primary">{{employee.technology}}</p>
        </div>
        <div class="text-center">
          <a href="#" class="btn btn-outline btn-rounded-f">
            <div class="text-gray" style="font-size: 12px;">{{employee.post}}</div>
          </a>
        </div>
      </div>
      <div class="border">
        <div class="ml-3">
          <h6>MANAGERS</h6>
        </div>
        <div class="pr-3 ml-3 mb-2 mt-2">
          <b-row v-if="employee && employee.manager">
            <b-col v-for="img in employee.manager" :key="img.img_id" lg="1" xs="12">
              <a>
                <img
                  @click="showCollapse(img)"
                  v-b-toggle="'abc' +img.img_id"
                  class="rounded-circle"
                  v-b-tooltip.hover
                  :title="img.name"
                  :src="img.image"
                  width="40"
                  height="40"
                >
              </a>
              <div>
                <b-collapse
                  :id="'abc' +img.img_id"
                  v-if="manager.img_id === img.img_id"
                  class="mt-2"
                >
                  <!-- <b-card> -->
                  <div style="display:flex">
                    <img
                      class="rounded-circle"
                      :title="img.name"
                      :src="manager.image"
                      width="40"
                      height="40"
                    >
                    <span>
                      <p class="text-primary fw-semi-bold fs-larger">{{manager.name}}</p>
                      <p class="text-primary fs-larger">{{manager}}</p>
                    </span>
                  </div>
                  <!-- <b-card> -->
                  <!-- </b-card> -->
                  <!-- </b-card> -->
                </b-collapse>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <!-- </Widget> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "imports-loader?window.jQuery=jquery,this=>window!widgster"; // eslint-disable-line
// import Widget from '@/components/Widget/Widget'
export default {
  name: "employeeWidget",
  data() {
    return {
      show: false,
      manager: {}
    };
  },
  props: {
    employee: { type: Object, default: () => ({}) }
  },
  computed: {
    randomId() {
      return Math.floor(Math.random() * 100);
    },
    mainControls() {
      return !!(
        this.close ||
        this.fullscreen ||
        this.collapse ||
        this.refresh ||
        this.settings ||
        this.settingsInverse
      );
    }
  },
  methods: {
    showCollapse(value) {
      this.show = !this.show;
      if (value) {
        this.manager = value;
      }
    }
  },
  // components: {
  //   Widget
  // },
  mounted() {}
};
</script>

<style src="./employeeWidget.scss" lang="scss" />
