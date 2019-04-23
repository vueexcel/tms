<template>
  <div>
    <widget class="p-0">
      <section v-if="eraKpiArray">
        <div v-for="(kpiera,index) in eraKpiArray" :key="index" class="areaBorder">
          <div
            class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5"
            v-if="kpiera.title !== '' && kpiera.desc !== ''"
          >
            <h4 class="text-primary">{{kpiera.title}}</h4>
            {{kpiera.desc}}
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
