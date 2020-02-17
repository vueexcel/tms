<template>
  <div>
    <div :class="[searchByAllEmployee ? 'w-100' : '']">
      <p v-if="searchByAllEmployee" class="block-example mt-2">All</p>
      <div :class="[searchByAllEmployee ? 'pl-1 pr-1 pb-3' : 'pl-4 pr-4 pb-1']">
        <b-form-input type="search" v-model="searchFields" name="search" placeholder="Search"></b-form-input>
      </div>
      <p v-if="!searchByAllEmployee" class="text-center m-0">
        <small>ALL MEMBERS</small>
      </p>
    </div>
    <div :class="[searchByAllEmployee ? '' : 'p-2']">
      <span
        class="position-relative d-inline-block"
        v-for="(img, i) in searchFilter"
        :key="i"
      >
        <div v-if="!img.kpi_id && img.role !== 'Admin' && !searchByAllEmployee" class="ml-1 mb-2">
          <img
            v-b-tooltip.hover
            :title="img.name"
            class="rounded-circle"
            :src="img.profileImage ? img.profileImage : dummyImg"
            width="25"
            height="25"
            alt="..."
          />
          <b-badge
            @click="addRemoveMembers(index, img, 'addMember')"
            variant="primary"
            class="circle-2 position-absolute badgePos p-0 top"
          >
            <i class="fa fa-plus" style="color:white; font-size:10px"></i>
          </b-badge>
        </div>
        <div v-if="searchByAllEmployee" class="all-manager mr-1 mb-3">
          <img
            v-b-tooltip.hover
            :title="img.name"
            class="rounded-circle h-auto"
            :src="img.profileImage ? img.profileImage : dummyImg"
            width="30"
            alt="..."
          />
          <i
            class="fas fa-plus-circle fa-plus-circle-altered add-icon text-primary"
            @click="addRemoveMembers( index, img, 'addMember')"
          ></i>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "allEmployeeBadge",
  props: {
    allMembers: { type: Array },
    searchField: { type: String },
    dummyImg: { type: String },
    index: { type: Number },
    toBeManagerArray: { type: Array },
    userArray: { type: Array },
    searchByAllEmployee: { type: Boolean }
  },
  data() {
    return {
      searchFields: this.searchField
    };
  },
  methods: {
    addRemoveMembers(index, img, type) {
      this.$emit("addRemoveMember", index, img, type);
      this.$emit("addManager", img);
    }
  },
  computed: {
    //eslint-disable-next-line
    searchFilter: function() {
      if (this.searchByAllEmployee === true) {
        if (this.toBeManagerArray.length) {
          return this.toBeManagerArray.filter(item => {
            if (item.username) {
              return item.username
                .toLowerCase()
                .includes(this.searchFields.toLowerCase());
            }
          });
        } else {
          return this.userArray.filter(item => {
            if (item.username) {
              return item.username
                .toLowerCase()
                .includes(this.searchFields.toLowerCase());
            }
          });
        }
      } else {
        if (this.$props.allMembers) {
          return this.$props.allMembers.filter(item => {
            if (item.username) {
              return item.username
                .toLowerCase()
                .includes(this.searchFields.toLowerCase());
            }
          });
        }
      }
    }
  }
};
</script>
<style src="./employeeWidget.scss" lang="scss" />
