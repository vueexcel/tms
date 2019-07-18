<template>
  <!-- <div class="d-flex flex-row-reverse slide"> -->
  <div class="d-flex slide">
    <div>
      <b-alert
        variant="danger"
        :show="alert360"
        dismissible
      >You need to review your manager **Review360&#176;&nbsp;</b-alert>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
export default {
  computed: {
    alert360: get("profile/alert360")
  }
};
</script>

<style>
.slide {
  position: relative;
  left: -2000px;
  -webkit-animation: slide 1s forwards;
  -webkit-animation-delay: 0.5s;
  animation: slide 1s forwards;
  animation-delay: 0.5s;
}

@-webkit-keyframes slide {
  100% {
    left: 0;
  }
}

@keyframes slide {
  100% {
    left: 0;
  }
}
</style>
