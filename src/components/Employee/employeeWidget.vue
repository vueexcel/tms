<template>
  <div>
    <div class="card mb-5">
      <b-alert
        :show="dismissCountDown"
        dismissible
        v-if="error"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        class="mx-auto text-center mt-3 alert-rounded alert-transparent"
      >{{error}},{{dismissCountDown}}</b-alert>
      <div class="card-body text-center">
        <i class="fas fa-circle-notch text-success fa-spin float-left" v-if="loading"></i>
        <div class="float-right" v-if="loggedInUserRole === 'admin'">
          <i
            class="fas fa-edit edit-button"
            v-if="!edit"
            @click="editEmployee(employee)"
            aria-hidden="true"
          ></i>
          <div class="text-center" v-else>
            <a class="btn btn-rounded-f button-for-employee" @click="saveEdit()">
              <div class="text-gray" style="font-size: 12px;">SAVE</div>
            </a>
          </div>
        </div>
        <div>
          <img
            class="rounded-circle h-auto"
            :src="employee_.profileImage ? employee_.profileImage : defaultImage"
            width="75"
            alt="..."
          >
        </div>

        <div>
          <span class="fs-larger text-capitalize">
            <span class="employee-name">{{employee_.name}}</span>
          </span>
          <span>
            <!-- <p
              class="fw-small text-primary employee-technology"
              v-if="!edit"
            >{{employee_.kpi}}</p>-->
            <p v-if="!edit">
              <a class="btn btn-rounded-f button-for-employee">
                <div class="text-gray size_font" v-if="employee_.kpi_id">{{employee_.kpi}}</div>
                <div class="text-gray size_font" v-if="!employee_.kpi_id">KPI/ERA Not Assigned</div>
              </a>
            </p>
            <b-form-select v-else v-model="selected" :options="options" class="mb-3">
              <template slot="first">
                <option :value="null" disabled>-- Please select an option --</option>
              </template>
            </b-form-select>
          </span>
        </div>
        <div>
          <a class="employee-technology">
            <div class="text-primary" style="font-size: 14px;">{{employee_.jobtitle}}</div>
          </a>
        </div>
      </div>
      <ManagerComponent :employee="employee" :loggedInUserRole="loggedInUserRole"/>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "imports-loader?window.jQuery=jquery,this=>window!widgster"; // eslint-disable-line
import ManagerComponent from "@/components/Employee/ManagerComponent/ManagerComponent";
import { get, call, sync } from "vuex-pathify";
import defaultImage from "@/assets/people/dummy.jpeg";

export default {
  name: "employeeWidget",
  components: {
    ManagerComponent
  },
  data() {
    return {
      show: false,
      manager: {},
      edit: false,
      selected: null,
      technologySelect: "",
      defaultImage: defaultImage,
      kpiIndex: null,
      loading: false,
      error: "",
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  props: {
    employee: { type: Object, default: () => ({}) },
    index: { type: Number },
    loggedInUserRole: {type: String, default: ''}
  },
  computed: {
    name: sync("manageEmployee/employeeName"),
    technology: sync("manageEmployee/employeeTechnology"),
    addNewTeam: sync("adminKPI/addNewTeam"),
    allmembers: sync("allMember/allMember"),
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
    },
    employee_() {
      let employeeToManipulate = this.employee;
      if (employeeToManipulate.kpi_id) {
        if(typeof(employeeToManipulate.kpi_id) === 'string'){
          if (this.addNewTeam.length) {
            this.addNewTeam.forEach(kpiOrEra => {
              if (kpiOrEra._id === employeeToManipulate.kpi_id) {
                employeeToManipulate["kpi"] = kpiOrEra.kpi_name;
              }
            });
          }
        } else {
          employeeToManipulate["kpi"] = employeeToManipulate.kpi_id.kpi_name
        }
      } 
      return this.employee;
    },
    options() {
      let optionArray = [];
      this.addNewTeam.forEach(kpi => {
        kpi["value"] = kpi._id;
        kpi["text"] = kpi.kpi_name;
        optionArray.push(kpi);
      });
      return optionArray;
    }
  },
  methods: {
    saveEmployeeInfo: call("manageEmployee/saveEmployeeInfo"),
    addMembers_: call("adminKPI/addMember"),
    getAllMembers_: call("allMember/getAllMember"),
    editEmployee(employee) {
      this.edit = true;
      this.technologySelect = employee.kpi;
    },
    saveEdit() {
      this.loading = true;
      this.edit = false;
      let data = {};
      if (this.selected) {
        let reverseKpiArray = this.options.slice().reverse();
        reverseKpiArray.forEach((kpi, index) => {
          if (this.selected === kpi._id) {
            this.kpiIndex = index;
          }
        });
        this.addMembers_({
          kpiIndex: this.kpiIndex,
          user: this.employee_,
          type: "addMember"
        })
          .then(response => {
            if (response === true) {
              this.callToGettAllMembers();
            }
            this.searchField = "";
          })
          .catch(err => {
            console.log(err);
          });
        this.saveEmployeeInfo({
          kpi: this.selected,
          employee: this.employee_
        });
        if (!this.selected) {
          this.saveEmployeeInfo({
            kpi: this.selected,
            employee: this.employee_
          });
        } else {
          this.saveEmployeeInfo({
            kpi: this.technologySelect,
            employee: this.employee_
          });
        }
      } else{
         this.loading = false;
      }
    },
    async callToGettAllMembers() {
      let response = await this.getAllMembers_();
      if (response) {
        this.loading = false;
      }
    },
    getAllMember(value){
      if(value === true){
        this.$emit('getMember', value)
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  mounted() {}
};
</script>

<style src="./employeeWidget.scss" lang="scss" />
