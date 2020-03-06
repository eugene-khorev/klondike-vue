<template>
  <div v-bind:class="classes">
    <span></span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ['type', 'index', 'listIndex'],

  computed: {
    ...mapState({
      card(state) {
        return this.listIndex >= 0
          ? state.cards[this.type][this.listIndex].cards[this.index]
          : state.cards[this.type].cards[this.index];
      },
      isUpturned(state) {
        return this.listIndex >= 0
          ? state.cards[this.type][this.listIndex].upturnedIndex <= this.index
          : state.cards[this.type].upturnedIndex <= this.index;
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
