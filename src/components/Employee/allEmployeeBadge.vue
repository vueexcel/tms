<template>
  <div>
    <div class="pl-4 pr-4 pb-1">
      <b-form-input type="search" v-model="searchFields" name="search" placeholder="Search"></b-form-input>
    </div>
    <p class="text-center m-0">
      <small>ALL MEMBERS</small>
    </p>
    <div class="p-2">
      <span
        class="position-relative ml-1 d-inline-block mb-2"
        v-for="(img, i) in searchFilter"
        :key="i"
      >
        <div v-if="!img.kpi_id && img.role !== 'Admin'">
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
    index: { type: Number }
  },
  data() {
    return {
      searchFields: this.searchField
    };
  },
  methods: {
    addRemoveMembers(index, img, type) {
      this.$emit("addRemoveMember", index, img, type);
    }
  },
  computed: {
    //eslint-disable-next-line
    searchFilter: function() {
      if (this.$props.allMembers) {
        return this.$props.allMembers.filter(item => {
          if (item.username) {
            return item.username
              .toLowerCase()
              .includes(this.searchFields.toLowerCase());
          }
        });
      }
      // if (this.toBeManagerArray.length) {
      //   return this.toBeManagerArray.filter(item => {
      //     if (item.username) {
      //       return item.username
      //         .toLowerCase()
      //         .includes(this.searchField.toLowerCase());
      //     }
      //   });
      // } else {
      //   return this.userArray.filter(item => {
      //     if (item.username) {
      //       return item.username
      //         .toLowerCase()
      //         .includes(this.searchField.toLowerCase());
      //     }
      //   });
      // }
    }
  }
};
</script>