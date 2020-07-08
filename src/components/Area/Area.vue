<template>
  <div>
    <widget class="p-0">
      <section v-if="eraKpiArray">
        <!-- <div v-for="(kpiera,index) in eraKpiArray" :key="index" class="areaBorder"> -->
        <div v-for="(kpiera,index) in newArray" :key="index" class="areaBorder">
          <div
            class="mb-0 bg-white pl-5 pt-4 pr-4 pb-5"
            v-if="kpiera.title !== '' && kpiera.desc !== ''"
          >
            <h4 class="text-primary capitalize">
              {{kpiera.title}}
              <RadialProgressBar
                v-if="kpiera.rating"
                class="pull-right"
                :diameter="45"
                :completed-steps="kpiera.rating"
                :total-steps="total"
                :strokeWidth="5"
              >
                <p></p>
                <p class="fs-mini">{{ kpiera.rating.toFixed(1) }}</p>
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
    },
    monthlyRating: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // completed: 5.165456,
      total: 10
    };
  },
  computed: {
    newArray() {
      let newArray = [];
      this.$props.eraKpiArray.forEach(element => {
        if (Object.keys(this.$props.monthlyRating).length) {
          Object.keys(this.$props.monthlyRating).forEach(ele => {
            if (element.ID === ele) {
              newArray.push({
                ID: element.ID,
                desc: element.desc,
                edit: element.edit,
                title: element.title,
                rating: this.$props.monthlyRating[ele]
              });
            }
          });
        } else {
          newArray.push({
            ID: element.ID,
            desc: element.desc,
            edit: element.edit,
            title: element.title,
            rating: 0
          });
        }
      });
      return newArray
    }
  }
};
</script>

<style src="./Area.scss" lang="scss" scoped />
