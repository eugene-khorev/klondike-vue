<template>
  <div
    v-bind:draggable="isUpturned"
    v-bind:class="classes"
    v-on:click="$emit('click', index)"
    v-on:dblclick="$emit('dblclick', index)"
    v-on:dragstart="onDragStart"
    v-on:dragenter ="onDragEnter"
    v-on:dragover  ="onDragOver"
    v-on:drop="onDrop"
    v-on:dragend="onDragEnd"
    >
    <span></span>
  </div>
</template>

<script>
export default {
  props: ['index', 'card', 'isUpturned'],

  computed: {
    classes() {
      return this.isUpturned
        ? [
          'card',
          'card-' + this.card.rank,
          'card-' + this.card.suit,
        ]
        : [
          'card',
          'card-downturned',
        ];
    },
  },

  methods: {
    onDragStart(event) {
      // event.target.style.opacity = 0.5;
      this.$emit('dragstart', event, this.index)
    },
    onDragEnter(event) {
      this.$emit('dragenter', event, this.index)
    },
    onDragOver(event) {
      this.$emit('dragover', event, this.index)
    },
    onDrop(event) {
      this.$emit('drop', event, this.index)
    },
    onDragEnd(event) {
      this.$emit('dragend', event, this.index)
    },
  },
}
</script>
