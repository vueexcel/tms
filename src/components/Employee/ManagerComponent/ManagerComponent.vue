ll<template>
    <div>
        <div class="card-footer-altered">
        <b-row>
        <b-container>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          <div class="managers">MANAGERS</div>
          <b-row v-if="manager && manager.length" class="avatars">
            <div class="col-12">
              <div v-for="img in manager" :key="img.manager_id" class="avatar" xs="12">
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
            <br/>
            <div v-for="img in manager" :key="img.manager_id">
              <b-collapse
                :id="'manager' + managerObj.manager_id"
                v-if="managerObj.manager_id === img.manager_id"
              >
            <div class="border-bottom line"></div>
                <div style="display:flex" class="set_height">
                  <img
                    class="rounded-circle h-auto"
                    :title="img.name"
                    :src="managerObj.image"
                    width="40"
                  >
                  <i
                    class="fa fa-times-circle text-danger mt-4 close-collapse"
                    aria-hidden="true"
                    @click="closeCollapse(managerObj)"
                  ></i>
                  <span class="ml-3">
                    <p class="text-primary fw-semi-bold fs-larger manager-name">{{img.name}}</p>
                    <p class="text-dark manager-work">{{img.work}}</p>
                  </span>
                </div>
                <div>
                  <p class="mt-4 mb-2 text-dark">Manager Weight:</p>
                  <ul class="progress-bar-employee">
                    <li class="list" v-for="index in 10" :key="index" @click="weightRating(index)" v-bind:class="{ 'active' : index <=  ratedWeight}">
                      <!-- <i class="fa fa-circle-o"></i> -->
                      <div class="text-muted fw-semi-bold employee-progress d-flex" v-bind:class="{'text-primary': index <= ratedWeight}">{{index}}</div>
                    </li>
                  </ul>
                  <div class="all-manager-div">
                    <div class="w-100">
                      <p class="block-example mt-2">All</p>
                    </div>
                    <div class="all_managers">
                      <div
                        class="all-manager mr-1 mb-3"
                        v-for="img in allManagers"
                        :key="img.manager_id"
                      >
                        <img
                          class="rounded-circle h-auto"
                          v-b-tooltip.hover
                          :title="img.name"
                          :src="img.image"
                          width="30"
                        >
                        <i class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary" @click="addManager(img)"></i>
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
</template>

<script>
import members from './../../Group/allMembers.json'
export default {
  name: 'ManagerComponent',
  data() {
    return { 
      show: false,
      managerObj: {},
      allManagers: [],
      ratedWeight: null
    }
  },
  props:{
    manager: {type : Array},
  },
  methods:{
    showCollapse(value) {
      this.show = !this.show;
      this.ratedWeight = null
      if (value) {
        this.managerObj = value;
      }
    },
    closeCollapse(manager) {
      this.$emit("deleteManager", manager)
      this.ratedWeight = null
      this.managerObj = {};
    },
    weightRating(index){
      this.ratedWeight = index
    },
    addManager(managerToBeAdded){
      this.manager.push(managerToBeAdded)
      this.allManagers.splice(managerToBeAdded,1)
    }
  },
  created() {
    this.allManagers = members
  }
}
</script>

<style src="./../employeeWidget.scss" lang="scss" />