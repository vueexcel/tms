<template>
  <div>
    <div class="pb-xlg mb-0">
      <div class="h-100 bg-white p-2 border-round">
        <div class="float-right">
          <i class="fa fa-pencil btn" v-if="!edit" @click="editEmployee(employee)" aria-hidden="true"></i>
          <div class="text-center" v-else>
            <a href="#" class="btn btn-rounded-f button-for-employee" @click="saveEdit()">
              <div class="text-gray" style="font-size: 12px;">SAVE</div>
            </a>
          </div>
        </div>
        <div class="text-center pr-3 mt-2">
          <img
            class="rounded-circle ml-5"
            src="@/assets/people/a5.jpg"
            width="75"
            height="75"
            alt="..."
          >
        </div>

        <div class="pt-2 text-center">
          <span class="fs-larger text-capitalize">
            <span class="employee-name" v-if="!edit">{{employee.name}}</span>
            <div class="form-group" v-else>
              <input type="text" class="border border-name text-secondary" id="name" v-model="name">
            </div>
          </span>
          <span>
            <p
              class="fw-small text-primary employee-technology"
              v-if="!edit"
            >{{employee.technology}}</p>
              <b-form-select v-else v-model="selected" :options="options" class="mb-3">
              </b-form-select>
          </span>
        </div>
        <div class="text-center mb-3">
          <a href="#" class="btn btn-rounded-f button-for-employee">
            <div class="text-gray" style="font-size: 12px;">{{employee.post}}</div>
          </a>
        </div>
      </div>
      <div class="border-managers-container">
        <div class="ml-3">
          <p class="managers">MANAGERS</p>
        </div>
        <div class="pr-3 ml-3 mb-2 mt-2">
          <b-row v-if="employee && employee.manager" class="avatars">
            <div v-for="img in employee.manager" :key="img.img_id" class="avatar" xs="12">
              <a>
                <img
                  @click="showCollapse(img)"
                  v-b-toggle="'manager' +img.img_id"
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
                  :id="'manager' +img.img_id"
                  v-if="manager.img_id === img.img_id"
                >
                  <!-- class="mt-2" -->
                  <!-- <b-card> -->
                  <div style="display:flex">
                    <img
                      class="rounded-circle"
                      :title="img.name"
                      :src="manager.image"
                      width="40"
                      height="40"
                    >
                    <i class="fa fa-times-circle text-danger mt-4 close-collapse" aria-hidden="true" @click="closeCollapse"></i>
                    <span class="ml-3">
                      <p class="text-primary fw-semi-bold fs-larger manager-name">{{manager.name}}</p>
                      <p class="text-dark manager-work">{{manager.work}}</p>
                      <!-- <p class="text-primary fs-larger">{{manager}}</p> -->
                    </span>
                  </div>
                  <div>
                    <p class="mt-2 mb-2 text-dark">Manager Weight:</p>
                    <ul class="progress-bar-employee">
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">1</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">2</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">3</div>
                      </li>
                      <li class="active list">
                        <div class="text-primary fw-semi-bold employee-progress">4</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">5</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">6</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">7</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">8</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">9</div>
                      </li>
                      <li class="list">
                        <div class="text-primary fw-semi-bold employee-progress">10</div>
                      </li>
                    </ul>
                    <p>All</p>
                  </div>
                  <!-- <b-card> -->
                  <!-- </b-card> -->
                  <!-- </b-card> -->
                </b-collapse>
              </div>
            </div>
          </b-row>
        </div>
      </div>
    </div>
      <!-- </Widget> -->
  </div>
</template>

<script>
import $ from "jquery";
import "imports-loader?window.jQuery=jquery,this=>window!widgster"; // eslint-disable-line
// import Widget from '@/components/Widget/Widget'
import { get, call, sync } from "vuex-pathify";

export default {
  name: "employeeWidget",
  data() {
    return {
      show: false,
      manager: {},
      edit: false,
      selected: null,
      technologySelect: ''
    };
  },
  props: {
    employee: { type: Object, default: () => ({}) }
  },
  computed: {
    emp_arr: get("manageEmployee/employees"),
    name:sync("manageEmployee/employeeName"),
    technology: sync("manageEmployee/employeeTechnology"),
    options: sync("manageEmployee/options"),
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
    saveEmployeeInfo: call("manageEmployee/saveEmployeeInfo"),
    showCollapse(value) {
      this.show = !this.show;
      if (value) {
        this.manager = value;
      }
    },
    editEmployee(employee) {
      this.edit = true;
      this.name = employee.name
      this.options[0].text = employee.technology
      this.technologySelect = employee.technology
    },
    saveEdit() {
      this.edit = false
      if (!this.selected){
        this.saveEmployeeInfo({
          name: this.name,
          technology: this.technologySelect,
          id: this.employee.id
          })
      } else {
        this.saveEmployeeInfo({
          name: this.name,
          technology: this.selected,
          id: this.employee.id
        })
      }
    },
    closeCollapse () {
      this.manager = {}
      console.log(this.manager, '*******************')
    }
  },
  mounted() {}
};
</script>

<style src="./employeeWidget.scss" lang="scss" />