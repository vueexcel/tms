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
            <b-col v-for="(img, index) in employee.manager" :key="index" lg="1" xs="12">
              <a>
                <img
                  class="rounded-circle"
                  v-b-tooltip.hover
                  :title="img.name"
                  :src="img.image"
                  width="40"
                  height="40"
                >
              </a>
            </b-col>
          </b-row>
          <!-- <b-collapse :id="img.img_id" class="mt-2">
            <b-card>
              <p class="card-text">Collapse contents Here</p>
              <b-btn v-b-toggle.collapse1_inner size="sm">Toggle Inner Collapse</b-btn>
              <b-collapse id="collapse1_inner" class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-card>
          </b-collapse> -->
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
  // components: {
  //   Widget
  // },
  mounted() {}
};
</script>

<style src="./employeeWidget.scss" lang="scss" />
