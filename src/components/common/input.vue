<template>
  <input
    :id="id" 
    required
    :type="type"
    :placeholder="placeholder"
    autofocus
    :checked="checked"
    @input="$emit('setVal', $event)"
  />
</template>

<script>
export default {
  data() {
    return {
        // inputVal:""
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
    },
    inputVal:{
        type: String
    },
    checked:{
        type: Boolean,
         default: null,
    }
  }
};
</script>
