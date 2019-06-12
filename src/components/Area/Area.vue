<template>
  <div>
    <widget class="p-0">
      <section v-if="eraKpiArray">
        <div v-for="(kpiera,index) in eraKpiArray" :key="index" class="areaBorder">
          <div
            class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5"
            v-if="kpiera.title !== '' && kpiera.desc !== ''"
          >
            <h4 class="text-primary capitalize">
              {{kpiera.title}}
              <RadialProgressBar
                class="pull-right"
                :diameter="45"
                :completed-steps="completed"
                :total-steps="total"
                :strokeWidth="5"
              >
                <p></p>
                <p class="fs-mini">{{ completed.toFixed(1) }}</p>
              </RadialProgressBar>
            </h4>
            {{kpiera.desc}}
          </div>
        </div>
      </section>
      <section v-else>
        <div class="areaBorder">
          <div>No KPI/Era assigned to you. Contact manager for the same.</div>
        </div>
      </section>
    </widget>
  </div>
</template>

<script>
import Widget from "./../Widget/Widget";
import RadialProgressBar from "vue-radial-progress";
export default {
  name: "AreaComponent",
  components: { Widget, RadialProgressBar },
  props: {
    eraKpiArray: {
      type: Array
    }
  },
  data() {
    return {
      completed: 5.165456,
      total: 10
    };
  }
};
</script>

<style src="./Area.scss" lang="scss" scoped />
