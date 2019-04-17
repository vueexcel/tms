<template>
  <div>
    <widget class="p-0">
      <section v-if="userkpiJson">
        <div v-for="(kpi,index) in userkpiJson" :key="index" class="parentdiv">
          <div class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5" v-if="kpi.title !== '' && kpi.desc !== ''">
            <h4 class="text-primary">{{kpi.title}}</h4>
            {{kpi.desc}}
          </div>
        </div>
      </section>
    </widget>
    <widget class="p-0">
      <section v-if="usereraJson">
        <div v-for="(era,index) in usereraJson" :key="index" class="parentdiv">
          <div class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5" v-if="era.title !== '' && era.desc !== ''">
            <h4 class="text-primary">{{era.title}}</h4>
            {{era.desc}}
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
    userkpiJson: {
      type: Array
    },
    usereraJson: {
      type: Array
    }
  }
};
</script>

<style src="./Area.scss" lang="scss" scoped />
