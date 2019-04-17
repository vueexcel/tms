<template>
  <div>
    <widget class="p-0">
      <section v-if="eraKpiArray.length">
        <div v-for="(kpi,index) in eraKpiArray" :key="index" class="areaborder">
          <div class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5" v-if="kpi.title !== '' && kpi.desc !== ''">
            <h4 class="text-primary">{{kpi.title}}</h4>
            {{kpi.desc}}
          </div>
        </div>
      </section>
    </widget>
  </div>
</template>

<script>
import Widget from "./../Widget/Widget";
export default {
  name: "AreaComponent",
  components: { Widget },
  props: {
    eraKpiArray: {
      type: Array
    }
  }
};
</script>

<style src="./Area.scss" lang="scss" scoped />
