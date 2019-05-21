ll<template>
  <div>
    <div class="card-footer-altered">
      <b-row>
        <b-container>
          <div class="managers">
            MANAGERS
            <span class="float-right">
              <i class="fas fa-circle-notch text-success fa-spin size" v-if="loading"></i>
            </span>
          </div>
          <b-row v-if="managersArray.length" class="avatars">
            <div class="col-12">
              <div v-for="img in managersArray" :key="img._id" class="avatar" xs="12">
                <a>
                  <img
                    @click="showCollapse(img)"
                    v-b-toggle="'manager' + img._id + employee._id"
                    class="rounded-circle h-auto"
                    v-b-tooltip.hover
                    :title="img.username.toUpperCase() + ' , ' + img.weight"
                    :src="img.profileImage ? img.profileImage : defaultImage"
                    v-bind:class="{success : img.weight <= 3 ,primary:  img.weight > 3 && img.weight <= 6, warning:  img.weight > 6 && img.weight <= 10}"
                    width="40"
                  >
                </a>
              </div>
            </div>
          </b-row>
          <div v-if="showError">
            <b-alert
          :show="showError"
          dismissible
          class="alert-danger alert-transparent mt-3"
        >{{error}}</b-alert>
          </div>
          <br>
          <div v-for="img in allManagers" :key="img._id">
            <b-collapse
              :id="'manager' + managerObj._id+employee._id"
              v-if="managerObj._id === img._id"
            >
              <div class="border-bottom line"></div>
              <div style="display:flex" class="set_height">
                <img
                  class="rounded-circle h-auto"
                  :title="img.name"
                  :src="managerObj.profileImage ? managerObj.profileImage : defaultImage"
                  width="40"
                >
                <i
                  class="fa fa-times-circle text-danger mt-4 close-collapse"
                  aria-hidden="true"
                  @click="closeCollapse(managerObj)"
                ></i>
                <span class="ml-3">
                  <p class="text-primary fw-semi-bold fs-larger manager-name">{{img.name}}</p>
                  <p class="text-dark manager-work">{{img.job_title}}</p>
                </span>
              </div>
              <div>
                <p class="mt-4 mb-2 text-dark">Manager Weight:</p>
                <ul class="progress-bar-employee">
                  <li
                    class="list"
                    v-for="index in 10"
                    :key="index"
                    @click="weightRating(index, img)"
                    v-bind:class="{ 'active' : index <=  ratedWeight}"
                  >
                    <div
                      class="text-muted fw-semi-bold employee-progress d-flex"
                      v-bind:class="{'text-primary': index <= ratedWeight}"
                    >{{index}}</div>
                  </li>
                </ul>
              </div>
            </b-collapse>
          </div>
          <div class="all-manager-div">
            <div class="w-100">
              <p class="block-example mt-2">All</p>
              <!--### search bar #### -->
              <div class="pl-1 pr-1 pb-3">
                <b-form-input
                  v-model="searchField"
                  type="search"
                  name="search"
                  placeholder="Search"
                ></b-form-input>
              </div>
            </div>
            <div class="all_managers">
              <div class="all-manager mr-1 mb-3" v-for="img in searchFilterNoManager" :key="img._id">
                <img
                  class="rounded-circle h-auto"
                  v-b-tooltip.hover
                  :title="img.name"
                  :src="img.profileImage ? img.profileImage : defaultImage"
                  width="30"
                >
                <i
                  class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary"
                  @click="addManager(img)"
                ></i>
              </div>
            </div>
          </div>
        </b-container>
      </b-row>
    </div>
  </div>
</template>

<script>
import members from "./../../Group/allMembers.json";
import { get, call, sync } from "vuex-pathify";
import defaultImage from "@/assets/people/dummy.jpeg";
export default {
  name: "ManagerComponent",
  data() {
    return {
      managerObj: {},
      defaultImage: defaultImage,
      ratedWeight: null,
      loading: false,
      managerNameWeight: "",
      searchField: "",
      error: '',
      showError: false
    };
  },
  props: {
    // manager: {type : Array},
    employee: { type: Object }
  },
  computed: {
    allMembers: sync("allMember/allMember"),
    managers: get("allMember/managers"),
    searchFilterNoManager: function() {
      if (this.allUsersWithNoManagers.length) {
        return this.allUsersWithNoManagers.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      } else{
        return this.allManagers.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      }
    },
    allManagers() {
      let userArray = [];
      this.allMembers.forEach(user => {
        if (user._id !== this.employee._id) {
          userArray.push(user);
        }
      });
      return userArray;
    },
    managersArray() {
      let managerArray = [];      
      if (this.employee.managers) {
        managerArray = []
        this.employee.managers.forEach(manager => {
          this.allManagers.forEach(member => {
            if (manager._id === member._id) {
              member['weight'] = manager.weight
              managerArray.push(member)
            }
          });
        });
      }
      return managerArray;
    },
    allUsersWithNoManagers() {
      var newArr = [];
      if (this.employee.managers) {
        for (let member of this.allMembers) {
          let count = 0;
          for (let manager of this.employee.managers) {
            if (member._id == manager._id || this.employee._id == member._id) {
              count++;
              break;
            }
          }
          if (count == 0) newArr.push(member);
        }
      }
      return newArr;
    }
  },
  methods: {
    getAllMembers_: call("allMember/getAllMember"),
    addManagerOfUser: call("allMember/addManager"),
    assignManager: call("allMember/assignManager"),
    deleteManager: call("allMember/deleteManager"),
    showCollapse(value) {
      this.managerObj = value;
      this.ratedWeight = value.weight;
    },
    async closeCollapse(manager) {
      this.loading = true;
      let data = {
        manager: manager,
        user: this.employee
      };
      let response = await this.deleteManager(data);
      if (response === true) {
        this.$emit("setMessage", "Manager Deleted Successfully");
        this.$emit('getMember', response)
        this.loading = false;
      } else {
        this.loading = false;
        this.showError = true
        this.error = response
      }
      this.managerObj = {};
    },
    async weightRating(index, manager) {
      this.loading = true;
      this.ratedWeight = index;
      let response = await this.assignManager({
        weight: index,
        user: this.employee,
        manager: manager
      })
      if(response === true){
        this.$emit("setMessage", "Weight Updated Successfully");
        this.ratedWeight = null;
        this.managerObj = {};
        this.loading = false;
        this.$emit('getMember', response)
      } else {
        this.showError = true
        this.error = response
      }
    },
    async addManager(managerToBeAdded) {
      this.showError = false
      this.error = ''
      this.loading = true;
      if (managerToBeAdded.role === "Admin") {
        let response = await this.assignManager({
          weight: 1,
          user: this.employee,
          manager: managerToBeAdded
        })
        if(response === true){
          this.$emit('getMember', response)
          this.$emit("setMessage", "Manager Added Successfully");
          this.ratedWeight = 1;
          this.managerObj = managerToBeAdded;
        } else {
          this.showError = true
          this.error = response
        }
      } else {
        let response = await this.addManagerOfUser({
          manager: managerToBeAdded,
          user: this.employee
        });
        if(response === true){
          this.$emit('getMember', response)
          this.$emit("setMessage", "Manager Added Successfully");
        } else {
          this.showError = true
          this.error = response
        }
      }
      this.loading = false
    }
  },
  created() {}
};
</script>

<style src="./../employeeWidget.scss" lang="scss" />
