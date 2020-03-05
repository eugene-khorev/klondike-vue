<template>
  <div v-bind:class="classes">
    <span></span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ['type', 'index'],

  computed: {
    ...mapState({
      card(state) {
        return state.cards[this.type].cards[this.index];
      },
      isUpturned(state) {
        return state.cards[this.type].upturnedIndex <= this.index;
      },
    }),

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
