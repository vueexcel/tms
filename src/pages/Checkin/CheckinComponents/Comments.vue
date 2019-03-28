<template>
  <div>
    <ul class="comments border-top">
      <li class="pl-3 pt-2 pb-2 pr-0">
        <img
          class="rounded-circle mr-2 mt-1 float-left"
          :src="imgSrc"
          width="30"
          height="30"
          alt="..."
        >
        <span>
          <span class="text-primary fs-larger fw-semi-bold">{{ userName }}</span>
          <span>{{ commentTime }}</span>
          <br>
          <span>{{ comment }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: String,
    //   default: true
    },
    commentTime: {
      type: String,
    //   default: true
    },
    userName: {
      type: String,
    //   default: true
    },
    imgSrc: {
      type: String,
    //   default: true
    }
  }
};
</script>

<style src="../Checkin.scss" lang="scss" scoped />
