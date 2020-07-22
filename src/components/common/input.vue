<template>
  <input
    :id="id" 
    :type="type"
    :placeholder="placeholder"
    @input="$emit('setVal', $event)"
  />
</template>

<script>
export default {
  name:"Input",
  data() {
    return {
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    }
  }
};
</script>
