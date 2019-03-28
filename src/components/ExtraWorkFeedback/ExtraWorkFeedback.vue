<template>
  <div xs="12" sm="6">
    <b-btn
      v-b-toggle="'collapse2'"
      class="m-1 mt-2 collapse-button h2"
      @mouseover="activeCollapse"
      :class="{hover_variant : activeCollapse}"
      v-bind:style="{'color': variant }"
    >KPI</b-btn>
    <b-collapse id="collapse2">
      <b-container v-for="(kpi, index) in data.kpi" :key="index">
        <div class="mt-2">
          <span class="bold-text">{{ kpi.heading }}</span>
          <h6>{{ kpi.content }}</h6>
        </div>
        <div class="border-top text-light"></div>
      </b-container>
    </b-collapse>
    <b-btn
      v-b-toggle="'collapse3'"
      class="m-1 collapse-button"
      v-bind:style="{'color': variant }"
    >ERA</b-btn>
    <b-collapse id="collapse3">
      <b-container v-for="(era, index) in data.era" :key="index">
        <div class="mt-2">
          <span class="bold-text">{{ era.heading }}</span>
          <h6>{{ era.content }}</h6>
        </div>
        <div class="border-top text-light"></div>
      </b-container>
    </b-collapse>
    <div class="mt-2">
      <div class="feedback pb-2 mt-4 pl-3">Extra work/ Feedback/ Issues</div>
      <h6 class="ml-3 pt-3">{{ data.extraWork }}</h6>
    </div>
    <div>
      <div class="feedback mt-4 pb-2 pl-3">Highlight Check-in</div>
      <h6 class="ml-3 mt-3">{{ data.highlightCheckin }}</h6>
    </div>
    <div>
      <div class="feedback mt-4 pb-2 pl-3">Project Difficulty Level</div>
      <div class="text-dark ml-3 mb-5 mt-2">
        <h2>
          <i class="fa fa-star mr-xs"/>
          <i class="fa fa-star mr-xs"/>
          <i class="fa fa-star mr-xs"/>
          <i class="fa fa-star mr-xs"/>
          <i class="fa fa-star"/>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtraWorkFeedback",
  props: {
    data: {
      type: Object
    },
    variant: {
      type: String
    }
  },
  data() {
    return {
      activeCollapse: false
    };
  }
};
</script>

<style src="./ExtraWorkFeedback.scss" lang="scss" />
