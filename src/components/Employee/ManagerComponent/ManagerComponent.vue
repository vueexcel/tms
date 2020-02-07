<template>
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
                    :src="img.profileImage ? img.profileImage : dummyImg"
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
          <div v-if="success">
            <b-alert
          :show="success"
          variant="success"
          dismissible
          class="alert-transparent mt-3"
        >{{showSuccessMessage}}</b-alert>
          </div>
          <br>
          <div v-for="img in managersArray" :key="img._id">
            <b-collapse
              :id="'manager' + managerObj._id+employee._id"
              v-if="managerObj._id === img._id"
            >
              <div class="border-bottom line"></div>
              <div style="display:flex" class="set_height">
                <img
                  class="rounded-circle h-auto"
                  :title="img.name"
                  :src="managerObj.profileImage ? managerObj.profileImage : dummyImg"
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
          <div class="all-manager-div" v-if="loggedInUserRole === 'admin'">
            <allEmployeeBadge :dummyImg="dummyImg"  :searchField="searchField"   />
            <!-- <div class="w-100">
              <p class="block-example mt-2">All</p> -->
              <!--### search bar #### -->
              <!-- <div class="pl-1 pr-1 pb-3">
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
                  :src="img.profileImage ? img.profileImage : dummyImg"
                  width="30"
                >
                <i
                  class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary"
                  @click="addManager(img)"
                ></i>
              </div>
            </div> -->
          </div>
        </b-container>
      </b-row>
    </div>
  </div>
</template>

<script>
//eslint-disable-next-line
import members from "./../../Group/allMembers.json";
import allEmployeeBadge from "@/components/Employee/allEmployeeBadge";
import { get, call, sync } from "vuex-pathify";
// import defaultImage from "@/assets/people/dummy.jpeg";
import dummyImage from "@/components/Group/person-dummy.jpg";
export default {
  name: "ManagerComponent",
  components:{
    allEmployeeBadge
  },
  data() {
    return {
      managerObj: {},
      dummyImg: dummyImage,
      ratedWeight: null,
      loading: false,
      managerNameWeight: "",
      searchField: "",
      error: '',
      showError: false,
      userArray: [],
      managersArray:[],
      toBeManagerArray:[],
      success: false,
      showSuccessMessage: ''
    };
  },
  props: {
    employee: { type: Object },
    loggedInUserRole:{type: String, default: ''}
  },
  computed: {
    loggedInUser: get("profile/user"),
    allMembers: sync("allMember/allMember"),
    managers: get("allMember/managers"),
    searchFilterNoManager: function() {
      if (this.toBeManagerArray.length) {
        return this.toBeManagerArray.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      } else{
        return this.userArray.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      }
    },
  },
  mounted () {
      this.getAlluserArray()
      this.getAllManagersArray()
      this.getAllToBeManagerArray()
  },
  methods: {
    getAllMembers_: call("allMember/getAllMember"),
    addManagerOfUser: call("allMember/addManager"),
    assignManager: call("allMember/assignManager"),
    deleteManager: call("allMember/deleteManager"),
    getAlluserArray(){
      this.userArray = this.allMembers.filter(manager => (manager._id !== this.employee._id))
    },
    getAllManagersArray(){
      if (this.employee.managers) {
        this.managersArray = this.employee.managers
      }
    },
    getAllToBeManagerArray(){
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
      this.toBeManagerArray = newArr
    },
    showCollapse(value) {
      this.managerObj = value;
      this.ratedWeight = value.weight;
    },
    async closeCollapse(manager) {
      if(this.loggedInUserRole === 'admin'){
        this.loading = true;
        let data = {
          manager: manager,
          user: this.employee
        };
        let response = await this.deleteManager(data);
        if (response === true) {
          if(this.managersArray.length){
            let leftManagers = this.managersArray.filter(user => (user._id !== manager._id))
            this.managersArray = leftManagers
            this.toBeManagerArray.push(manager)
          }
          this.success = true
          this.showSuccessMessage = 'Manager Deleted Successfully'
          this.loading = false;
        } else {
          this.loading = false;
          this.showError = true
          this.error = response
        }
      } 
      this.managerObj = {};
    },
    async weightRating(index, manager) {
      if(this.loggedInUserRole === 'admin'){
        this.loading = true;
        this.ratedWeight = index;
        let response = await this.assignManager({
          weight: index,
          user: this.employee,
          manager: manager
        })
        if(response === true){
          for( var i = 0; i < this.managersArray.length; i++){
            if(this.managersArray[i]._id === manager._id){
              this.managersArray[i].weight = index
              this.managerObj = this.managersArray[i]
            }
          }
          this.success = true
          this.showSuccessMessage = 'Weight Updated Successfully'
          this.ratedWeight = null;
          this.managerObj = {};
          this.loading = false;
        } else {
          this.showError = true
          this.error = response
        }
      }
    },
    async addManager(managerToBeAdded) {
      this.showError = false
      this.error = ''
      this.loading = true;
      let response = null
      if (managerToBeAdded.role === "Admin") {
        response = await this.assignManager({
          weight: 1,
          user: this.employee,
          manager: managerToBeAdded
        })
      } else {
        response = await this.addManagerOfUser({
          manager: managerToBeAdded,
          user: this.employee
        });
      }
      if(response === true){
          managerToBeAdded.weight = 1
          if(this.toBeManagerArray.length){
            for(var i =0; i < this.toBeManagerArray.length; i++){
              if(this.toBeManagerArray[i]._id === managerToBeAdded._id){
                this.toBeManagerArray.splice(i,1)
                this.managersArray.push(managerToBeAdded)
              }
            }
          } else {
            //eslint-disable-next-line
            for(var i =0; i < this.userArray.length; i++){
              if(this.userArray[i]._id === managerToBeAdded._id){
                this.userArray.splice(i,1)
                this.managersArray.push(managerToBeAdded)
              }
            }
          }
          this.success = true
          this.showSuccessMessage = 'Manager Added Successfully'
        } else {
          this.showError = true
          this.error = response
        }
      this.loading = false
    }
  },
  created() {
  }
};
</script>

<style src="./../employeeWidget.scss" lang="scss" />
