ll<template>
    <div>
        <div class="card-footer-altered">
        <b-row>
        <b-container>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          <div class="managers">MANAGERS 
            <span class="float-right">
              <i class="fas fa-circle-notch text-success fa-spin size" v-if="loading"></i>
            </span>
          </div>
          <b-row v-if="managersArray.length" class="avatars">
            <div class="col-12">
              <div v-for="img in managersArray" :key="img.user._id" class="avatar" xs="12">
                <a>
                  <img
                    @click="showCollapse(img)"
                    v-b-toggle="'manager' +img.user._id"
                    class="rounded-circle h-auto"
                    v-b-tooltip.hover
                    :title="img.user.name"
                    :src="img.user.profileImage ? img.user.profileImage : defaultImage"
                    width="40"
                  >
                </a>
              </div>
            </div>
          </b-row>
          <div class="all-manager-div" v-else>
            <div class="w-100">
                <p class="block-example mt-2">All</p>
              </div>
              <div class="all_managers">
                <div
                  class="all-manager mr-1 mb-3"
                  v-for="img in allManagers"
                  :key="img._id"
                >
                  <img
                    class="rounded-circle h-auto"
                    v-b-tooltip.hover
                    :title="img.name"
                    :src="img.profileImage ? img.profileImage : defaultImage"
                    width="30"
                  >
                  <!-- <i class="fa fa-check-circle fa-check-circle-altered text-success" v-if="img.role === 'manager'" ></i> -->
                  <i class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary" @click="addManager(img)"></i>
                </div>
              </div>
            </div>
            <br/>
            <div v-for="img in allManagers" :key="img._id">
              <b-collapse
                :id="'manager' + managerObj._id"
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
                      <p class="text-dark manager-work">{{img.jobtitle}}</p>
                    </span>
                  </div>
                  <div>
                    <p class="mt-4 mb-2 text-dark">Manager Weight:</p>
                    <ul class="progress-bar-employee">
                      <li class="list" v-for="index in 10" :key="index" @click="weightRating(index, img)" v-bind:class="{ 'active' : index <=  ratedWeight}">
                        <div class="text-muted fw-semi-bold employee-progress d-flex" v-bind:class="{'text-primary': index <= ratedWeight}">{{index}}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="all-manager-div">
                    <div class="w-100">
                      <p class="block-example mt-2">All</p>
                    </div>
                    <div class="all_managers">
                    <div
                      class="all-manager mr-1 mb-3"
                      v-for="img in allManagers"
                      :key="img._id"
                    >
                    <img
                      class="rounded-circle h-auto"
                      v-b-tooltip.hover
                      :title="img.name"
                      :src="img.profileImage ? img.profileImage : defaultImage"
                      width="30"
                    >
                    <i class="fa fa-check-circle fa-check-circle-altered text-success" v-if="img.managerOFUser === employee._id" ></i>
                    <i class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary" v-if="img.managerOFUser !== employee._id" @click="addManager(img)"></i>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </b-container>
        </b-row>
      </div>
    </div>
</template>

<script>
import members from './../../Group/allMembers.json'
import { get, call,sync } from "vuex-pathify";
import defaultImage from '@/assets/people/dummy.jpeg'
export default {
  name: 'ManagerComponent',
  data() {
    return { 
      show: false,
      managerObj: {},
      defaultImage:defaultImage,
      ratedWeight: null,
      loading:false,

    }
  },
  props:{
    // manager: {type : Array},
    employee:{type: Object}
  },
  computed: {
    allMembers: sync("allMember/allMember"),
    managers: get('allMember/managers'),
    allManagers(){
      let userArray = []
      this.allMembers.forEach(user => {
        if(user.role !== 'Admin' && user._id !== this.employee._id){
          userArray.push(user)
        }
      });
      return userArray;      
    },
    managersArray(){
      let managerArray = []
      if(this.employee.managers){
        this.employee.managers.forEach(manager =>{
          this.allManagers.forEach(member => {
            if(manager._id === member._id){
              managerArray.push({
                weight: manager.weight,
                user: member 
              })
              member['managerOFUser'] = this.employee._id
            }
          });
        })
      }
      return managerArray
    },
  },
  methods:{
    getAllMembers_: call("allMember/getAllMember"),
    addManagerOfUser : call("allMember/addManager"),
    assignManager: call("allMember/assignManager"),
    deleteManager: call("allMember/deleteManager"),
    showCollapse(value) {
      this.show = !this.show;
      this.ratedWeight = value.weight
      if (value) {
        this.managerObj = value.user;
      }
    },
    async closeCollapse(manager) {
      this.loading = true
      let data = {
        manager: manager,
        user: this.employee,
      }
      let response = await this.deleteManager(data)
      if(response === true){
        this.loading = false
      }
      this.ratedWeight = null
      this.managerObj = {};
    },
    weightRating(index, manager){
      this.ratedWeight = index
      this.assignManager({
        weight: index,
        user:this.employee,
        manager: manager
      })
      
    },
    async addManager(managerToBeAdded){
      this.loading = true
      let response = await this.addManagerOfUser({
        manager: managerToBeAdded,
        user:this.employee
      })
      if(response){
        this.showCollapse(managerToBeAdded)
        this.loading = false
      }
    }
  },
  created() {
    // this.allManagers = members
  }
}
</script>

<style src="./../employeeWidget.scss" lang="scss" />
