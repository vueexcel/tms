<template>
  <div>
    <h1 class="page-title">Your Notes</h1>
    <div>
      <b-modal v-model="success" size="sm" centered :headerBgVariant="header">
        {{showSuccess}}
        <div slot="modal-footer" class="w-100">
          <b-button variant="white" size="sm" class="float-right" @click="closeInfoModal">Close</b-button>
        </div>
      </b-modal>
    </div>
    <div class="m-auto" v-if="error">
      <b-alert
        :show="error"
        dismissible
        variant="danger"
        class="alert-transparent mt-3 text-center"
      >{{errorMessage}}</b-alert>
    </div>
    <div v-if="pageLoader" class="text-center size">
      <i class="fas fa-circle-notch text-success fa-spin"></i>
    </div>
    <Widget
      v-if="!pageLoader"
      class="shares-widget"
      ref="sharesWidget"
      showTooltip
      customHeader
      bodyClass="p-0"
    >
      <!-- title="<h6>
            <span class='badge badge-primary'><i class'fa fa-facebook' /></span> &nbsp;
            Ctrl+enter = <strong>Submit / Update</strong> <span class='fw-semi-bold'></span>
      </h6>"-->
      <div class="d-flex">
        <strong class="pt-2 pl-4 search_title">Search :</strong>
        <div class="pb-3 px-1 w-25 search">
          <b-form-input v-model="searchField" type="search" name="search" placeholder="Search"></b-form-input>
        </div>
      </div>
      <div class="list-group list-group-lg">
        <div v-for="(junior,n) in employeeList" :key="n">
          <div class="list-group-item">
            <div class="row">
              <div class="col-sm-4 col-12">
                <div class="d-flex">
                  <div class="thumb-lg mr">
                    <img
                      class="rounded-circle"
                      :src="junior.profileImage ? junior.profileImage :dummyImage "
                      alt="..."
                    />
                  </div>
                  <div class="d-flex flex-column">
                    <div class="m-0">{{junior.name}}</div>
                    <div class="d-flex flex-column">
                      <small class="text-muted">{{junior.job_title}}</small>
                      <div>{{junior.team}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-5 col-12 mt-5 mt-sm-0">
                <div v-if="junior.notes && updateNote[n] !== true">
                  <b-card class="color_background">
                    <h6 class="comment">{{junior.notes.comment}}</h6>
                  </b-card>
                </div>
                <div v-if="enableReview[n] === true && !junior.notes">
                  <span class="pb-2">
                    Notes
                    <span class="submit_msg ml-3">
                      <i class="fa fa-circle text-info" /> &nbsp;
                      Ctrl+enter =
                      <strong>Submit / Update</strong>
                      <span class="fw-semi-bold"></span>
                    </span>
                  </span>
                  <b-form-textarea
                    v-model="textReview[n]"
                    @keyup.ctrl.13="SubmitReview(n,junior)"
                    :rows="3"
                    placeholder="Write your note here..."
                  />
                </div>
                <div v-if="updateNote[n] === true">
                  <span class="pb-2">
                    Update Note
                    <span class="submit_msg ml-3">
                      <i class="fa fa-circle text-info" /> &nbsp;
                      Ctrl+enter =
                      <strong>Submit / Update</strong>
                      <span class="fw-semi-bold"></span>
                    </span>
                  </span>
                  <!-- </span> -->
                  <b-form-textarea
                    v-model="textReview[n]"
                    :rows="3"
                    @keyup.ctrl.13="updateNoteFun(n,junior)"
                    placeholder="Update your note here..."
                  />
                </div>
              </div>
              <div class="col-sm-3 col-12 mt-5 mt-sm-0">
                <!-- When junior do not have note -->

                <div v-if="!junior.notes">
                  <button
                    v-if="enableReview[n] !== true &&  loading[n] !== true"
                    class="btn btn-primary float-right"
                    @click="reviewEnable(n)"
                  >
                    <i class="fa fa-pencil-square-o"></i>
                  </button>
                  <div class="float-right">
                    <button
                      v-if="enableReview[n] == true &&  loading[n] !== true"
                      class="btn btn-success mr-3"
                      @click="SubmitReview(n,junior)"
                    >Ok</button>
                    <button
                      v-if="enableReview[n] == true &&  loading[n] !== true"
                      class="btn btn-danger float-right"
                      @click="reviewDisable(n)"
                    >Cancel</button>
                  </div>
                </div>

                <!-- when junior have notes already -->

                <div v-if="junior.notes && updateNote[n] !== true">
                  <div class="float-right">
                    <i
                      v-if="loading[n] !== true"
                      class="fas mr-3 fa-trash text-danger icon_size"
                      @click="deleteReview(n,junior)"
                    ></i>
                    <i
                      v-if="loading[n] !== true"
                      class="fa fa-pencil ml-3 text-info icon_size"
                      @click="enableUpdate(n,junior)"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>

                <!-- when junior's note update -->

                <div v-if="junior.notes && updateNote[n] == true">
                  <div class="float-right">
                    <i
                      v-if="loading[n] !== true"
                      class="fa fa-floppy-o text-success icon_size"
                      @click="updateNoteFun(n,junior)"
                    ></i>
                    <i
                      v-if="loading[n] !== true"
                      class="fa fa-times text-danger ml-3 icon_size"
                      aria-hidden="true"
                      @click="disableUpdate(n)"
                    ></i>
                  </div>
                </div>
                <div class="float-right">
                  <i class="fas fa-circle-notch text-success fa-spin" v-if="loading[n] == true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  </div>
</template>

<script>
import Vue from "vue";
import { call, get } from "vuex-pathify";
import Widget from "@/components/Widget/Widget";
import defaultImage from "@/components/Group/person-dummy.jpg";

export default {
  data() {
    return {
      error: false,
      errorMessage: "",
      pageLoader: false,
      dummyImage: defaultImage,
      enableReview: [],
      loading: [],
      textReview: [],
      header: "danger",
      showSuccess: "",
      success: false,
      notesArray: [],
      disableDelete: [],
      updateNote: [],
      searchField: ""
    };
  },
  components: {
    Widget
  },
  computed: {
    emp_arr: get("weeklyReportReview/allJuniors"),
    employeeList() {
      return this.emp_arr.filter(item => {
        if (item.username) {
          return item.username
            .toLowerCase()
            .includes(this.searchField.toLowerCase());
        }
      });
    }
  },
  mounted() {
    this.callApi();
  },
  methods: {
    getKpiUser_: call("weeklyReportReview/getAllJuniors"),
    submitNote: call("notes/submitNote"),
    getNotes: call("notes/getNotes"),
    deleteNotes: call("notes/deleteNote"),
    updateNote_: call("notes/updateNote"),
    async callApi() {
      this.pageLoader = true;
      let response = null
      if (!this.emp_arr.length) {
        response = await this.getKpiUser_();
        if (response !== true) {
          this.error = true;
          this.errorMessage = response;
        }
      }
      this.notesArray = await this.getNotes();
      if (this.notesArray.error === false) {
        this.setNotes();
      } else {
        this.success = true;
        this.showSuccess = response.response;
        this.header = "danger";
      }
      this.pageLoader = false;
    },
    reviewEnable(index) {
      Vue.set(this.enableReview, index, true);
    },
    reviewDisable(index) {
      Vue.set(this.textReview, index, "");
      Vue.set(this.enableReview, index, false);
    },
    closeInfoModal() {
      this.success = false;
    },
    async SubmitReview(index, user) {
      Vue.set(this.loading, index, true);
      if (!this.textReview[index]) {
        this.error = true;
        this.errorMessage = "Note can not be blank";
      } else {
        this.notesArray = [];
        let payload = {
          index: index,
          user: user,
          text: this.textReview[index]
        };
        let response = await this.submitNote(payload);
        this.notesArray = await this.getNotes();
        if (this.notesArray.error === false) {
          this.success = true;
          this.showSuccess = response.text;
          this.setNotes();
        } else {
          this.header = "danger";
        }
        if (response.error === false) {
          this.notesArray;
          this.header = "success";
        } else {
          this.header = "danger";
        }
      }
      Vue.set(this.loading, index, false);
      Vue.set(this.enableReview, index, false);
      Vue.set(this.textReview, index, "");
    },
    async deleteReview(index, user) {
      Vue.set(this.loading, index, true);
      let response = await this.deleteNotes(user);
      if (response === true) {
        this.notesArray = [];
        this.notesArray = await this.getNotes();
        if (this.notesArray.error === false) {
          this.setNotes();
        } else {
          this.success = true;
          this.showSuccess = response.response;
          this.header = "danger";
        }
      } else {
        this.success = true;
        this.showSuccess = response;
        this.header = "danger";
      }
      Vue.set(this.loading, index, false);
    },
    enableUpdate(index, user) {
      Vue.set(this.updateNote, index, true);
      Vue.set(this.textReview, index, user.notes.comment);
    },
    disableUpdate(index) {
      Vue.set(this.updateNote, index, false);
      Vue.set(this.textReview, index, "");
    },
    async updateNoteFun(index, junior) {
      if (this.textReview[index]) {
        Vue.set(this.loading, index, true);
        let response = await this.updateNote_({
          comment: this.textReview[index],
          junior: junior
        });
        if (response === true) {
          this.notesArray = [];
          this.notesArray = await this.getNotes();
          if (this.notesArray.error === false) {
            this.setNotes();
            this.success = true;
            Vue.set(this.updateNote, index, false);
            Vue.set(this.textReview, index, "");
            this.showSuccess = "Note Successfully updated";
            this.header = "success";
          } else {
            this.header = "danger";
          }
        } else {
          this.showSuccess = response;
          this.header = "danger";
        }
        Vue.set(this.loading, index, false);
      } else {
        this.error = true;
        this.errorMessage = "Note can not be blank";
      }
    },
    setNotes() {
      this.emp_arr.forEach(junior => {
        let note = this.notesArray.response.find(note => {
          return junior._id === note.junior_id;
        });
        junior["notes"] = note;
      });
    }
  }
};
</script>

<style src="./Notes.scss" lang="scss" scoped />