<template>
  <div v-bind:class="classes" v-on:dblclick="$emit('dblclick', index)">
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
}
</script>
