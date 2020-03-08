<template>
  <div class="card card-placeholder"
    v-on:dragenter.prevent=""
    v-on:dragover.prevent=""
    v-on:drop="onDrop"
  ></div>
</template>

<script>
export default {
  methods: {
    onDrop(event) {
      this.$emit('drop', event)
    },
  },
}
</script>