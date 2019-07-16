<template>
  <div class="d-flex flex-row-reverse slide">
    <div>
      <b-alert variant="danger" :show="alert360" dismissible>You need to review your manager &nbsp;</b-alert>
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
  -webkit-animation-duration: 1s;
  -webkit-animation-name: slidein;
  animation-duration: 1s;
  animation-name: slidein;
}
@-webkit-keyframes slidein {
  from {
    margin-left: 0%;
    width: 300%;
  }

  to {
    margin-left: 100%;
    width: 100%;
  }
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
