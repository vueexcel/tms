<template>
  <div>
    <div class="card mb-5">
      <div class="card-body text-center">
        <div class="float-right">
          <i
            class="fas fa-edit edit-button"
            v-if="!edit"
            @click="editEmployee(employee)"
            aria-hidden="true"
          ></i>
          <div class="text-center" v-else>
            <a href="#" class="btn btn-rounded-f button-for-employee" @click="saveEdit()">
              <div class="text-gray" style="font-size: 12px;">SAVE</div>
            </a>
          </div>
        </div>
        <div>
          <img
            class="rounded-circle ml-5 h-auto"
            src="@/assets/people/a5.jpg"
            width="75"
            alt="..."
          >
        </div>

        <div>
          <span class="fs-larger text-capitalize">
            <span class="employee-name">{{employee.name}}</span>
            <!-- <div class="form-group" v-else>
              <input type="text" class="border border-name text-secondary" id="name" v-model="name">
            </div>-->
          </span>
          <span>
            <p
              class="fw-small text-primary employee-technology"
              v-if="!edit"
            >{{employee.technology}}</p>
            <b-form-select v-else v-model="selected" :options="options" class="mb-3"></b-form-select>
          </span>
        </div>
        <div>
          <a href="#" class="btn btn-rounded-f button-for-employee">
            <div class="text-gray" style="font-size: 12px;">{{employee.post}}</div>
          </a>
        </div>
      </div>
      <div class="card-footer-altered">
        <b-row>
        <b-container>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          <div class="managers">MANAGERS</div>
          <b-row v-if="employee && employee.manager" class="avatars">
            <div class="col-12">
              <div v-for="img in employee.manager" :key="img.manager_id" class="avatar" xs="12">
                <a>
                  <img
                    @click="showCollapse(img)"
                    v-b-toggle="'manager' +img.manager_id"
                    class="rounded-circle h-auto"
                    v-b-tooltip.hover
                    :title="img.name"
                    :src="img.image"
                    width="40"
                  >
                </a>
              </div>
            </div>
          </b-row>
          <!-- <b-row> -->
            <br/>
            <div v-for="img in employee.manager" :key="img.manager_id">
              <b-collapse
                :id="'manager' +manager.manager_id"
                v-if="manager.manager_id === img.manager_id"
              >
                <div style="display:flex">
                  <img
                    class="rounded-circle "
                    :title="img.name"
                    :src="manager.image"
                    width="40"
                    height="40"
                  >
                  <i
                    class="fa fa-times-circle text-danger mt-4 close-collapse"
                    aria-hidden="true"
                    @click="closeCollapse(manager)"
                  ></i>
                  <span class="ml-3">
                    <p class="text-primary fw-semi-bold fs-larger manager-name">{{manager.name}}</p>
                    <p class="text-dark manager-work">{{manager.work}}</p>
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
                      <div class="text-primary fw-semi-bold employee-progress d-flex">9</div>
                    </li>
                  </ul>
                  <div class="all-manager-div">
                    <div class="w-100">
                      <p class="block-example mt-2">All</p>
                    </div>
                    <div style="display: flex">
                      <div
                        class="all-manager"
                        v-for="img in employee.manager"
                        :key="img.manager_id"
                      >
                        <img
                          class="rounded-circle h-auto"
                          v-b-tooltip.hover
                          :title="img.name"
                          :src="img.image"
                          width="30"
                        >
                        <i class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          <!-- </b-row> -->
        </b-container>
        </b-row>
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
      technologySelect: ""
    };
  },
  props: {
    employee: { type: Object, default: () => ({}) }
  },
  computed: {
    emp_arr: get("manageEmployee/employees"),
    name: sync("manageEmployee/employeeName"),
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
    deleteManager: call("manageEmployee/deleteManager"),
    showCollapse(value) {
      var removed = [];
      this.show = !this.show;
      if (value) {
        this.manager = value;
      }
    },
    editEmployee(employee) {
      this.edit = true;
      this.options[0].text = employee.technology;
      this.technologySelect = employee.technology;
    },
    saveEdit() {
      this.edit = false;
      if (!this.selected) {
        this.saveEmployeeInfo({
          technology: this.technologySelect,
          id: this.employee.id
        });
      } else {
        this.saveEmployeeInfo({
          technology: this.selected,
          id: this.employee.id
        });
      }
    },
    closeCollapse(manager) {
      this.manager = {};
      this.deleteManager({
        manager: manager,
        employeeId: this.employee.id
      });
    }
  },
  mounted() {}
};
</script>

<style src="./employeeWidget.scss" lang="scss" />